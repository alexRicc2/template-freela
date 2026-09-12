import type { Site } from './types'

const WEEKDAY_SHORT: Record<string, '0' | '1' | '2' | '3' | '4' | '5' | '6'> = {
  Sun: '0',
  Mon: '1',
  Tue: '2',
  Wed: '3',
  Thu: '4',
  Fri: '5',
  Sat: '6',
}

const WEEKDAY_LABEL = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']

export type RestaurantStatus = {
  open: boolean
  acceptOrders: boolean
  label: string
  detail: string
}

function parseMinutes(value?: string | null) {
  const match = String(value || '').trim().match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return null
  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (hours > 23 || minutes > 59) return null
  return hours * 60 + minutes
}

function formatMinutes(total: number) {
  const hours = Math.floor(total / 60) % 24
  const minutes = total % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function zonedClock(date: Date, timeZone: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  )

  return {
    weekday: WEEKDAY_SHORT[parts.weekday] || '0',
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  }
}

function hoursForDay(site: Site, weekday: string) {
  return site.weeklyHours?.find((row) => row.weekday === weekday)
}

function isWithinWindow(minutes: number, opensAt: number, closesAt: number) {
  if (closesAt > opensAt) return minutes >= opensAt && minutes < closesAt
  return minutes >= opensAt || minutes < closesAt
}

function nextOpening(site: Site, now: Date, timeZone: string) {
  const clock = zonedClock(now, timeZone)
  for (let offset = 0; offset < 7; offset += 1) {
    const weekday = String((Number(clock.weekday) + offset) % 7)
    const row = hoursForDay(site, weekday)
    if (!row || row.closed) continue
    const opensAt = parseMinutes(row.opensAt)
    if (opensAt == null) continue
    if (offset === 0 && clock.minutes >= opensAt) continue
    const when = offset === 0 ? 'hoje' : offset === 1 ? 'amanhã' : WEEKDAY_LABEL[Number(weekday)]
    return `${when} às ${formatMinutes(opensAt)}`
  }
  return ''
}

export function restaurantStatus(site: Site, now = new Date()): RestaurantStatus {
  const openLabel = site.openLabel || 'Aberto · aceitando pedidos'
  const closedLabel = site.closedLabel || 'Fechado · pedidos no próximo horário'
  const timeZone = site.timezone || 'America/Sao_Paulo'
  const acceptIfClosed = Boolean(site.acceptOrdersWhenClosed)

  if (site.statusMode === 'open') {
    return { open: true, acceptOrders: true, label: openLabel, detail: '' }
  }

  if (site.statusMode === 'closed') {
    const next = nextOpening(site, now, timeZone)
    return {
      open: false,
      acceptOrders: acceptIfClosed,
      label: closedLabel,
      detail: next ? `Abre ${next}` : site.closedMessage || '',
    }
  }

  const clock = zonedClock(now, timeZone)
  const today = hoursForDay(site, clock.weekday)
  const opensAt = parseMinutes(today?.opensAt)
  const closesAt = parseMinutes(today?.closesAt)
  const open =
    Boolean(today) &&
    !today?.closed &&
    opensAt != null &&
    closesAt != null &&
    isWithinWindow(clock.minutes, opensAt, closesAt)

  if (open) {
    const until = closesAt != null ? `Hoje até ${formatMinutes(closesAt)}` : ''
    return { open: true, acceptOrders: true, label: openLabel, detail: until }
  }

  const next = nextOpening(site, now, timeZone)
  return {
    open: false,
    acceptOrders: acceptIfClosed,
    label: closedLabel,
    detail: next ? `Abre ${next}` : site.closedMessage || '',
  }
}
