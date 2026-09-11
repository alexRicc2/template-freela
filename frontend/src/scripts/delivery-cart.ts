type CartItem = {
  id: string
  name: string
  price: number
  qty: number
}

const CART_KEY = 'forja-delivery-cart'

function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function loadCart(): CartItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

function cartTotal(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0)
}

function cartCount(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.qty, 0)
}

function setQty(id: string, name: string, price: number, nextQty: number) {
  const cart = loadCart().filter((item) => item.qty > 0)
  const index = cart.findIndex((item) => item.id === id)
  const qty = Math.max(0, nextQty)

  if (index === -1 && qty > 0) {
    cart.push({ id, name, price, qty })
  } else if (index !== -1) {
    if (qty === 0) cart.splice(index, 1)
    else cart[index].qty = qty
  }

  saveCart(cart)
  render(cart)
}

function render(cart = loadCart()) {
  document.querySelectorAll<HTMLElement>('[data-qty-display]').forEach((el) => {
    const id = el.getAttribute('data-qty-display')
    const item = cart.find((entry) => entry.id === id)
    el.textContent = String(item?.qty || 0)
  })

  const count = cartCount(cart)
  const total = cartTotal(cart)
  const summary = document.querySelector('[data-cart-summary]')
  const finish = document.querySelector<HTMLButtonElement>('[data-cart-finish]')
  const lines = document.querySelector('[data-checkout-lines]')
  const checkoutTotal = document.querySelector('[data-checkout-total]')

  if (summary) {
    summary.textContent =
      count === 0 ? 'Carrinho vazio' : `${count} ${count === 1 ? 'item' : 'itens'} · ${formatPrice(total)}`
  }

  if (finish) finish.disabled = count === 0

  if (lines) {
    if (count === 0) {
      lines.innerHTML = '<li>Nenhum item no carrinho.</li>'
    } else {
      lines.innerHTML = cart
        .map(
          (item) =>
            `<li><span>${item.qty}x ${item.name}</span><strong>${formatPrice(item.price * item.qty)}</strong></li>`,
        )
        .join('')
    }
  }

  if (checkoutTotal) {
    checkoutTotal.textContent = count === 0 ? '0,00' : formatPrice(total)
  }
}

function buildWhatsAppMessage(cart: CartItem[], form: HTMLFormElement, restaurantName: string) {
  const data = new FormData(form)
  const lines = cart.map((item) => {
    const lineTotal = formatPrice(item.price * item.qty)
    return `• ${item.qty}x ${item.name} — ${formatPrice(item.price)} (subtotal ${lineTotal})`
  })

  const complemento = String(data.get('complemento') || '').trim()
  const notes = String(data.get('observacoes') || '').trim()
  const street = String(data.get('rua') || '').trim()
  const number = String(data.get('numero') || '').trim()
  const neighborhood = String(data.get('bairro') || '').trim()
  const city = String(data.get('cidade') || '').trim()
  const cep = String(data.get('cep') || '').trim()

  return [
    `Olá, ${restaurantName}! Gostaria de fazer um pedido para delivery.`,
    '',
    '*Itens:*',
    ...lines,
    '',
    `*Total:* ${formatPrice(cartTotal(cart))}`,
    '',
    '*Entrega:*',
    `Nome: ${String(data.get('nome') || '').trim()}`,
    `Telefone: ${String(data.get('telefone') || '').trim()}`,
    `Endereço: ${street}, ${number}${complemento ? `, ${complemento}` : ''}`,
    `Bairro: ${neighborhood}`,
    `Cidade: ${city}`,
    `CEP: ${cep}`,
    notes ? `\nObservações: ${notes}` : '',
  ]
    .filter((line, index, all) => line !== '' || all[index - 1] !== '')
    .join('\n')
    .trim()
}

function init() {
  const root = document.querySelector<HTMLElement>('[data-delivery-app]')
  if (!root) return

  const restaurantName = root.dataset.restaurant || 'Forja Burger'
  const waNumber = (root.dataset.wa || '5517992659334').replace(/\D/g, '')
  const checkout = document.querySelector<HTMLDialogElement>('[data-checkout-dialog]')
  const form = document.querySelector<HTMLFormElement>('[data-checkout-form]')

  document.addEventListener('click', (event) => {
    const inc = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-inc]')
    const dec = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-dec]')
    const trigger = inc || dec
    if (!trigger) return

    const id = trigger.dataset.id || ''
    const name = trigger.dataset.name || ''
    const price = Number(trigger.dataset.price || 0)
    const current = loadCart().find((item) => item.id === id)?.qty || 0
    setQty(id, name, price, current + (inc ? 1 : -1))
  })

  document.querySelector('[data-cart-finish]')?.addEventListener('click', () => {
    if (loadCart().length === 0) return
    render()
    checkout?.showModal()
  })

  document.querySelector('[data-checkout-close]')?.addEventListener('click', () => checkout?.close())
  checkout?.addEventListener('click', (event) => {
    if (event.target === checkout) checkout.close()
  })

  form?.addEventListener('submit', (event) => {
    event.preventDefault()
    const cart = loadCart()
    if (!cart.length) return

    const message = buildWhatsAppMessage(cart, form, restaurantName)
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  })

  render()
}

init()
