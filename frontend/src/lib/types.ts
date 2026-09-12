export type Media = {
  url?: string | null
  alt?: string | null
  sizes?: {
    card?: { url?: string | null }
    hero?: { url?: string | null }
  }
}

export type MenuCategory = {
  id: number | string
  name: string
  slug: string
  description?: string | null
  order?: number | null
  showOnHome?: boolean | null
}

export type MenuAddon = {
  id?: string
  name: string
  price?: number | null
  kind?: 'add' | 'extra' | 'swap' | null
}

export type MenuItem = {
  id: number | string
  name: string
  slug: string
  tag?: string | null
  description?: string | null
  ingredients?: string | null
  price?: number | null
  image?: Media | number | string | null
  imageUrl?: string | null
  featured?: boolean | null
  published?: boolean | null
  order?: number | null
  category?: MenuCategory | number | string | null
  comments?: string | null
  chefChoice?: boolean | null
  glutenFree?: boolean | null
  vegan?: boolean | null
  vegetarian?: boolean | null
  lactoseFree?: boolean | null
  containsAlcohol?: boolean | null
  servings?: number | null
  portionWeight?: string | null
  prepTimeMinutes?: number | null
  spicyLevel?: 'none' | 'mild' | 'medium' | 'hot' | null
  allergens?: string | null
  addons?: MenuAddon[] | null
}

export type Site = {
  restaurantName: string
  tagline?: string | null
  locationLabel?: string | null
  logo?: Media | number | string | null
  aboutEyebrow?: string | null
  aboutTitle?: string | null
  aboutBody?: string | null
  stats?: { id?: string; value: string; label: string }[] | null
  menuEyebrow?: string | null
  menuTitle?: string | null
  menuIntro?: string | null
  sidesTitle?: string | null
  sidesIntro?: string | null
  showExperiences?: boolean | null
  experiencesEyebrow?: string | null
  experiencesTitle?: string | null
  experiencesIntro?: string | null
  experiences?: { id?: string; title: string; description?: string | null }[] | null
  reservationTitle?: string | null
  reservationIntro?: string | null
  reservationNote?: string | null
  reservationTimes?: { id?: string; value: string }[] | null
  deliveryUrl?: string | null
  deliveryLabel?: string | null
  address?: string | null
  phone?: string | null
  whatsapp?: string | null
  email?: string | null
  hours?: { id?: string; days: string; time: string }[] | null
  instagram?: string | null
  facebook?: string | null
  mapEmbedUrl?: string | null
  footerNote?: string | null
  statusMode?: 'schedule' | 'open' | 'closed' | null
  timezone?: string | null
  openLabel?: string | null
  closedLabel?: string | null
  closedMessage?: string | null
  acceptOrdersWhenClosed?: boolean | null
  weeklyHours?:
    | {
        id?: string
        weekday: '0' | '1' | '2' | '3' | '4' | '5' | '6'
        closed?: boolean | null
        opensAt?: string | null
        closesAt?: string | null
      }[]
    | null
  leadCaptureEnabled?: boolean | null
  leadCaptureCampaign?: string | null
  leadCaptureTitle?: string | null
  leadCaptureBody?: string | null
  leadCaptureDiscount?: string | null
  leadCaptureCoupon?: string | null
  leadCaptureCta?: string | null
  leadCaptureWhatsappMessage?: string | null
  googleReviewEnabled?: boolean | null
  googleReviewUrl?: string | null
  googleReviewTitle?: string | null
  googleReviewBody?: string | null
  googleReviewCta?: string | null
}

export type RestaurantContent = {
  site: Site
  items: MenuItem[]
  categories: MenuCategory[]
}
