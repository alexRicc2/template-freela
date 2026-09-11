import { fallbackCategories, fallbackItems, fallbackSite } from './fallback'
import type { Media, MenuCategory, MenuItem, RestaurantContent, Site } from './types'

const payloadURL =
  import.meta.env.PAYLOAD_API_URL ||
  import.meta.env.PUBLIC_PAYLOAD_URL ||
  'http://localhost:3000'

async function payloadFetch<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${payloadURL}${path}`, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    return null
  }
}

export function mediaSrc(image?: Media | string | number | null, imageUrl?: string | null) {
  if (image && typeof image === 'object') {
    const url = image.sizes?.card?.url || image.url
    if (url) return url.startsWith('http') ? url : `${payloadURL}${url}`
  }
  return imageUrl || ''
}

export const DELIVERY_WHATSAPP = '5517992659334'

export function formatPrice(value?: number | null) {
  if (value == null) return ''
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

const spicyLabels: Record<string, string> = {
  none: 'Não picante',
  mild: 'Picante leve',
  medium: 'Picante médio',
  hot: 'Picante forte',
}

export type ItemExtraInfo = {
  badges: string[]
  facts: { label: string; value: string }[]
  comments: string
}

export function extraInfo(item: MenuItem): ItemExtraInfo {
  const badges: string[] = []
  if (item.chefChoice) badges.push('Escolha do chef')
  if (item.glutenFree) badges.push('Sem glúten')
  if (item.vegan) badges.push('Vegano')
  else if (item.vegetarian) badges.push('Vegetariano')
  if (item.lactoseFree) badges.push('Sem lactose')
  if (item.containsAlcohol) badges.push('Contém álcool')

  const facts: { label: string; value: string }[] = []
  if (item.servings && item.servings > 0) {
    facts.push({
      label: 'Serve',
      value: item.servings === 1 ? '1 pessoa' : `${item.servings} pessoas`,
    })
  }
  if (item.portionWeight) facts.push({ label: 'Porção', value: item.portionWeight })
  if (item.prepTimeMinutes && item.prepTimeMinutes > 0) {
    facts.push({ label: 'Preparo', value: `${item.prepTimeMinutes} min` })
  }
  if (item.spicyLevel && spicyLabels[item.spicyLevel]) {
    facts.push({ label: 'Picância', value: spicyLabels[item.spicyLevel] })
  }
  if (item.allergens) facts.push({ label: 'Alérgenos', value: item.allergens })

  return {
    badges,
    facts,
    comments: item.comments?.trim() || '',
  }
}

export function categorySlug(item: MenuItem) {
  if (item.category && typeof item.category === 'object') return item.category.slug
  return ''
}

export function waLink(site: Site, text?: string) {
  if (!site.whatsapp) return site.phone ? `tel:${site.phone}` : '#'
  const msg = encodeURIComponent(text || `Olá, ${site.restaurantName}!`)
  return `https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${msg}`
}

export async function getRestaurantContent(): Promise<RestaurantContent> {
  const [siteRes, itemsRes, catsRes] = await Promise.all([
    payloadFetch<Site>('/api/globals/site?depth=2'),
    payloadFetch<{ docs: MenuItem[] }>('/api/menu-items?depth=2&limit=200&sort=order'),
    payloadFetch<{ docs: MenuCategory[] }>('/api/menu-categories?limit=50&sort=order'),
  ])

  return {
    site: siteRes?.restaurantName ? siteRes : fallbackSite,
    items: itemsRes?.docs?.length ? itemsRes.docs : fallbackItems,
    categories: catsRes?.docs?.length ? catsRes.docs : fallbackCategories,
  }
}

export async function createReservation(payload: Record<string, unknown>) {
  const response = await fetch(`${payloadURL}/api/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const body = await response.text()
    throw new Error(body || 'Não foi possível enviar a reserva.')
  }
  return response.json()
}
