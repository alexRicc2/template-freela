type CartAddon = {
  id: string
  name: string
  price: number
}

type CartItem = {
  id: string
  productId: string
  name: string
  price: number
  qty: number
  addons: CartAddon[]
}

type AddEventDetail = {
  productId: string
  name: string
  price: number
  qty: number
  addons: CartAddon[]
}

const CART_KEY = 'forja-delivery-cart'

function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function addonKey(addons: CartAddon[]) {
  return addons
    .map((addon) => addon.id || addon.name)
    .sort()
    .join('|')
}

function lineId(productId: string, addons: CartAddon[]) {
  const extra = addonKey(addons)
  return extra ? `${productId}::${extra}` : productId
}

function unitPrice(base: number, addons: CartAddon[]) {
  return base + addons.reduce((sum, addon) => sum + (addon.price || 0), 0)
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

function addLine(detail: AddEventDetail) {
  const addons = (detail.addons || []).map((addon) => ({
    id: addon.id || addon.name,
    name: addon.name,
    price: Number(addon.price || 0),
  }))
  const id = lineId(detail.productId, addons)
  const cart = loadCart().filter((item) => item.qty > 0)
  const index = cart.findIndex((item) => item.id === id)
  const qty = Math.max(1, detail.qty || 1)
  const price = unitPrice(Number(detail.price || 0), addons)

  if (index === -1) {
    cart.push({
      id,
      productId: detail.productId,
      name: detail.name,
      price,
      qty,
      addons,
    })
  } else {
    cart[index].qty += qty
    cart[index].price = price
  }

  saveCart(cart)
  render(cart)
}

function render(cart = loadCart()) {
  const count = cartCount(cart)
  const total = cartTotal(cart)
  const summary = document.querySelector('[data-cart-summary]')
  const finish = document.querySelector<HTMLButtonElement>('[data-cart-finish]')
  const lines = document.querySelector('[data-checkout-lines]')
  const checkoutTotal = document.querySelector('[data-checkout-total]')
  const root = document.querySelector<HTMLElement>('[data-delivery-app]')
  const acceptOrders = root?.dataset.acceptOrders !== 'false'

  if (summary) {
    summary.textContent =
      count === 0 ? 'Carrinho vazio' : `${count} ${count === 1 ? 'item' : 'itens'} · ${formatPrice(total)}`
  }

  if (finish) finish.disabled = count === 0 || !acceptOrders

  if (lines) {
    if (count === 0) {
      lines.innerHTML = '<li>Nenhum item no carrinho.</li>'
    } else {
      lines.innerHTML = cart
        .map((item) => {
          const extras = item.addons?.length
            ? `<small>${item.addons.map((addon) => addon.name).join(', ')}</small>`
            : ''
          return `<li><span>${item.qty}x ${item.name}${extras}</span><strong>${formatPrice(item.price * item.qty)}</strong></li>`
        })
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
    const extras = item.addons?.length
      ? item.addons.map((addon) => `   + ${addon.name} (+${formatPrice(addon.price)})`).join('\n')
      : ''
    const lineTotal = formatPrice(item.price * item.qty)
    const head = `• ${item.qty}x ${item.name} — ${formatPrice(item.price)} (subtotal ${lineTotal})`
    return extras ? `${head}\n${extras}` : head
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
  const thanks = document.querySelector<HTMLDialogElement>('[data-thanks-dialog]')
  const form = document.querySelector<HTMLFormElement>('[data-checkout-form]')
  const closedNote = document.querySelector<HTMLElement>('[data-closed-note]')
  const acceptOrders = root.dataset.acceptOrders !== 'false'

  if (closedNote) closedNote.hidden = acceptOrders

  document.addEventListener('delivery:add', (event) => {
    addLine((event as CustomEvent<AddEventDetail>).detail)
  })

  document.querySelector('[data-cart-finish]')?.addEventListener('click', () => {
    if (!acceptOrders || loadCart().length === 0) return
    render()
    checkout?.showModal()
  })

  document.querySelector('[data-checkout-close]')?.addEventListener('click', () => checkout?.close())
  checkout?.addEventListener('click', (event) => {
    if (event.target === checkout) checkout.close()
  })

  document.querySelector('[data-thanks-close]')?.addEventListener('click', () => thanks?.close())
  thanks?.addEventListener('click', (event) => {
    if (event.target === thanks) thanks.close()
  })

  form?.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!acceptOrders) return
    const cart = loadCart()
    if (!cart.length) return

    const message = buildWhatsAppMessage(cart, form, restaurantName)
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    saveCart([])
    render([])
    checkout?.close()
    thanks?.showModal()
  })

  render()
}

init()
