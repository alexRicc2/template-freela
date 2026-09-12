import type { Payload } from 'payload'

import type { MenuItem } from './payload-types'

type SpicyLevel = NonNullable<MenuItem['spicyLevel']>

const burgerAddons: { name: string; price: number; kind: 'add' | 'extra' | 'swap' }[] = [
  { name: 'Bacon extra', price: 6, kind: 'add' },
  { name: 'Dobrar a carne', price: 10, kind: 'extra' },
  { name: 'Catupiry extra', price: 5, kind: 'add' },
  { name: 'Trocar batata comum por rústica', price: 4, kind: 'swap' },
]

const sideAddons: { name: string; price: number; kind: 'add' | 'extra' | 'swap' }[] = [
  { name: 'Cheddar extra', price: 5, kind: 'add' as const },
  { name: 'Bacon extra', price: 6, kind: 'add' as const },
]

const burgers = [
  {
    name: 'Rei',
    slug: 'rei',
    tag: 'Realeza',
    featured: true,
    order: 1,
    price: 42,
    description:
      'Pão brioche tostado na manteiga, 160g de blend suculento grelhado na brasa, envolvido em catupiry empanado crocante e rúcula fresca. Presunto parma, geleia de tomate com manjericão e maionese real no contraste de cremoso, ácido e crocante.',
    ingredients:
      'Pão de brioche, hambúrguer suculento de 160g, catupiry empanado na farinha panko, presunto parma fatiado, rúcula fresquinha, geleia artesanal de tomate com manjericão e maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    chefChoice: true,
    servings: 1,
    portionWeight: '160g',
    prepTimeMinutes: 20,
    comments: 'O mais pedido da casa. Combina bem com Fritas dos Orcs.',
    allergens: 'glúten, leite, ovos',
    addons: burgerAddons,
  },
  {
    name: 'Rainha',
    slug: 'rainha',
    tag: 'Realeza',
    featured: true,
    order: 2,
    price: 39,
    description:
      'Pão de sal com casca dourada, blend 160g grelhado, queijo coalho com casquinha tostada e rúcula viva. Tomate suculento, geleia de maçã artesanal e maionese real equilibram o salgado com um toque adocicado.',
    ingredients:
      'Pão de sal, hambúrguer suculento de 160g, queijo coalho grelhado, rúcula fresquinha, tomates selecionados, geleia de maçã artesanal e maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
    addons: burgerAddons,
  },
  {
    name: 'Príncipe',
    slug: 'principe',
    tag: 'Realeza',
    featured: true,
    order: 3,
    price: 44,
    description:
      'Brioche macio, blend 160g na brasa e pernil suíno desfiado ao barbecue, com bacon crocante e mussarela que estica no primeiro contato. Creme de parmesão artesanal e maionese real para um final untuoso.',
    ingredients:
      'Pão de brioche, hambúrguer suculento de 160g, pernil suíno desfiado com toque de barbecue, bacon assado crocante, mussarela derretida, creme de parmesão artesanal e maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80',
    addons: burgerAddons,
  },
  {
    name: 'Nobre',
    slug: 'nobre',
    tag: 'Realeza',
    featured: true,
    order: 4,
    price: 38,
    description:
      'Pão de sal, blend suculento de 160g, mussarela derretida e catupiry cremoso abraçados no bacon crocante. Creme de parmesão artesanal para um hambúrguer denso e reconfortante.',
    ingredients:
      'Pão de sal, hambúrguer suculento de 160g, mussarela derretida, catupiry cremoso, bacon assado crocante e creme de parmesão artesanal.',
    imageUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=900&q=80',
    addons: burgerAddons,
  },
  {
    name: 'Espadachim',
    slug: 'espadachim',
    tag: 'Guerreiro',
    featured: true,
    order: 5,
    price: 36,
    description:
      'Brioche tostado, blend 160g, cheddar fundido, bacon crocante e cebola caramelizada lenta — doce, salgado e defumado no mesmo bocado.',
    ingredients:
      'Pão de brioche, hambúrguer suculento de 160g, cheddar fatiado, bacon assado crocante e cebola caramelizada.',
    imageUrl:
      'https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&w=900&q=80',
    spicyLevel: 'medium' as SpicyLevel,
    servings: 1,
    portionWeight: '160g',
    allergens: 'glúten, leite',
    addons: burgerAddons,
  },
  {
    name: 'Cavaleiro',
    slug: 'cavaleiro',
    tag: 'Guerreiro',
    featured: true,
    order: 6,
    price: 40,
    description:
      'Brioche, blend 160g na brasa, bacon crocante e ovo frito com gema mole. Mussarela derretida, alface crocante, tomate maduro e cebola roxa, com maionese de ervas para um clássico suculento.',
    ingredients:
      'Pão de brioche, hambúrguer suculento de 160g, bacon assado crocante, ovo frito, mussarela derretida, alface, tomate, cebola roxa e maionese de ervas.',
    imageUrl:
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80',
    addons: burgerAddons,
  },
]

const sides = [
  {
    name: 'Fritas dos Orcs',
    slug: 'fritas-dos-orcs',
    order: 1,
    price: 32,
    description:
      'Batatas douradas e crocantes cobertas com creme de parmesão artesanal e pernil suíno desfiado ao barbecue. A maionese real entra para molhar cada pedaço quente.',
    ingredients:
      'Batatas fritas, creme de parmesão artesanal, pernil suíno desfiado com toque de barbecue e maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80',
    servings: 2,
    portionWeight: '400g',
    comments: 'Porção para compartilhar. Ideal para 2 pessoas.',
    allergens: 'leite, glúten',
    addons: sideAddons,
  },
  {
    name: 'Croquete dos Anões',
    slug: 'croquete-dos-anoes',
    order: 2,
    price: 28,
    description:
      'Seis croquetes de carne bovina ao vinho, empanados na panko até a casca estalar. Por dentro, recheio suculento; por fora, crocância. Acompanham maionese real e creme de parmesão.',
    ingredients:
      'Croquetes de carne bovina com vinho, farinha panko, maionese real e creme de parmesão.',
    imageUrl:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
    addons: sideAddons,
  },
  {
    name: 'Fritas dos Goblins',
    slug: 'fritas-dos-goblins',
    order: 3,
    price: 29,
    description:
      'Batatas crocantes afogadas em cheddar cremoso e cubos de bacon tostado. A maionese real corta o excesso e deixa cada garfada mais gulosa.',
    ingredients: 'Batatas fritas, cheddar cremoso, bacon em cubos e maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=80',
    addons: sideAddons,
  },
]

const drinks = [
  {
    name: 'Poção da Casa',
    slug: 'pocao-da-casa',
    order: 1,
    price: 18,
    description:
      'Refresco cítrico gelado com hortelã esmagada, gengibre picante e um fio de mel — abre o apetite e limpa o paladar entre um hambúrguer e outro.',
    ingredients: 'Cítricos da casa, hortelã, gengibre e mel.',
    imageUrl:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    vegan: true,
    glutenFree: true,
    lactoseFree: true,
    servings: 1,
    comments: 'Opção refrescante e sem álcool.',
  },
  {
    name: 'Milkshake Real',
    slug: 'milkshake-real',
    order: 2,
    price: 24,
    description:
      'Milkshake gelado de baunilha, denso o bastante para o canudo resistir, com calda de caramelo salgado e chantilly fofo por cima.',
    ingredients: 'Sorvete de baunilha, calda de caramelo salgado e chantilly.',
    imageUrl:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80',
  },
]

const defaultWeeklyHours: {
  weekday: '0' | '1' | '2' | '3' | '4' | '5' | '6'
  closed: boolean
  opensAt: string
  closesAt: string
}[] = [
  { weekday: '0', closed: false, opensAt: '18:30', closesAt: '23:00' },
  { weekday: '1', closed: true, opensAt: '', closesAt: '' },
  { weekday: '2', closed: false, opensAt: '18:30', closesAt: '23:00' },
  { weekday: '3', closed: false, opensAt: '18:30', closesAt: '23:00' },
  { weekday: '4', closed: false, opensAt: '18:30', closesAt: '23:00' },
  { weekday: '5', closed: false, opensAt: '18:30', closesAt: '23:00' },
  { weekday: '6', closed: false, opensAt: '18:30', closesAt: '23:00' },
]

function commerceSiteDefaults() {
  return {
    statusMode: 'schedule' as const,
    timezone: 'America/Sao_Paulo',
    openLabel: 'Aberto · aceitando pedidos',
    closedLabel: 'Fechado · pedidos no próximo horário',
    closedMessage:
      'A cozinha está fechada agora. Você ainda pode olhar o cardápio — os pedidos voltam a ser aceitos no próximo horário de funcionamento.',
    acceptOrdersWhenClosed: false,
    weeklyHours: defaultWeeklyHours,
    leadCaptureEnabled: true,
    leadCaptureCampaign: 'primeiro-pedido',
    leadCaptureTitle: 'Ganhe 10% no primeiro pedido',
    leadCaptureBody:
      'Deixe seu WhatsApp e receba 10% de desconto no primeiro pedido pelo WhatsApp. Sem cadastro chato — a gente já manda a mensagem pronta.',
    leadCaptureDiscount: '10% OFF',
    leadCaptureCoupon: 'PRIMEIRO10',
    leadCaptureCta: 'Quero meu desconto no WhatsApp',
    leadCaptureWhatsappMessage:
      'Olá, {restaurant}! Quero o cupom {coupon} ({discount}) no primeiro pedido. Meu WhatsApp é {phone}.',
    googleReviewEnabled: true,
    googleReviewUrl:
      'https://www.google.com/maps/search/?api=1&query=Forja+Burger+S%C3%A3o+Jos%C3%A9+do+Rio+Preto',
    googleReviewTitle: 'Curtiu a experiência?',
    googleReviewBody:
      'Nos ajude avaliando no Google. Leva menos de um minuto e fortalece a casa.',
    googleReviewCta: 'Avaliar no Google',
  }
}

export async function seedIfEmpty(payload: Payload) {
  const existing = await payload.count({ collection: 'menu-items' })
  if (existing.totalDocs > 0) return

  payload.logger.info('Seeding restaurant template content…')

  const burgersCat = await payload.create({
    collection: 'menu-categories',
    data: {
      name: 'Hambúrgueres',
      slug: 'hamburgueres',
      description: 'Os campeões da casa — toque no prato para o copy, os ingredientes e os adicionais.',
      order: 1,
      showOnHome: true,
    },
  })

  const sidesCat = await payload.create({
    collection: 'menu-categories',
    data: {
      name: 'Entradas',
      slug: 'entradas',
      description:
        'Porções caprichadas para compartilhar antes do grande banquete.',
      order: 2,
      showOnHome: true,
    },
  })

  const drinksCat = await payload.create({
    collection: 'menu-categories',
    data: {
      name: 'Bebidas',
      slug: 'bebidas',
      description: 'Poções, milkshakes e refrescos da casa.',
      order: 3,
      showOnHome: false,
    },
  })

  for (const item of burgers) {
    await payload.create({
      collection: 'menu-items',
      data: {
        ...item,
        category: burgersCat.id,
        published: true,
      },
    })
  }

  for (const item of sides) {
    await payload.create({
      collection: 'menu-items',
      data: {
        ...item,
        category: sidesCat.id,
        featured: false,
        published: true,
      },
    })
  }

  for (const item of drinks) {
    await payload.create({
      collection: 'menu-items',
      data: {
        ...item,
        category: drinksCat.id,
        featured: false,
        published: true,
      },
    })
  }

  await payload.updateGlobal({
    slug: 'site',
    data: {
      restaurantName: 'Forja Burger',
      tagline:
        'Hambúrgueres artesanais forjados com os melhores ingredientes, servidos em um salão temático medieval com jogos de tabuleiro.',
      locationLabel: 'São José do Rio Preto • SP',
      aboutEyebrow: 'Forjado com Paixão',
      aboutTitle: 'Um salão para comer e viver uma aventura',
      aboutBody:
        'A Forja Burger nasceu da paixão por hambúrgueres artesanais e pela rica atmosfera medieval. Nosso salão é um portal para outra era — onde cada mordida é uma conquista, cada prato uma obra-prima e cada visita uma aventura. Ambiente temático imersivo, jogos de tabuleiro para todas as idades, ingredientes nobres selecionados e receitas forjadas com dedicação.',
      stats: [
        { value: '20+', label: 'Receitas' },
        { value: '25+', label: 'Board Games' },
        { value: '5★', label: 'Avaliação' },
      ],
      menuEyebrow: '02 · Mais Pedidos',
      menuTitle: 'Nossos Hambúrgueres',
      menuIntro:
        'Conheça alguns dos nossos campeões. Passe o mouse (ou toque) para revelar os ingredientes de cada criação.',
      sidesTitle: 'Entradas',
      sidesIntro:
        'Antes do prato principal, comece a aventura com as nossas entradas. Porções caprichadas com a temática do reino — perfeitas para compartilhar.',
      showExperiences: true,
      experiencesEyebrow: '03 · Board Games',
      experiencesTitle: 'Aventura Além do Prato',
      experiencesIntro:
        'Enquanto espera seu pedido ou após a refeição, mergulhe no nosso acervo de jogos de tabuleiro. De clássicos a modernos, temos opções para todos os gostos e idades.',
      experiences: [
        {
          title: '+25 Jogos',
          description: 'Acervo diversificado com jogos para iniciantes e veteranos.',
        },
        {
          title: 'Ambiente Temático',
          description: 'Jogue em um cenário medieval que eleva a imersão de qualquer jogo.',
        },
        {
          title: 'Torneios',
          description: 'Competições mensais com prêmios para os melhores jogadores.',
        },
      ],
      reservationTitle: 'Reserve Sua Mesa',
      reservationIntro:
        'Garanta seu lugar no salão medieval. Preencha o formulário abaixo e entraremos em contato para confirmar sua reserva.',
      reservationNote: 'Mesmo dia: pedidos até 14h. Reservas disponíveis até 19:30.',
      reservationTimes: [{ value: '18:30' }, { value: '19:00' }, { value: '19:30' }],
      deliveryUrl: '/delivery',
      deliveryLabel: 'Delivery',
      address: 'Rua Penita, 3353 — Vila Redentora\nSão José do Rio Preto — SP\nCEP 15015-820',
      phone: '(17) 99236-6409',
      whatsapp: '5517992366409',
      hours: [
        { days: 'Terça a Domingo', time: '18:30 – 23:00' },
        { days: 'Segunda-feira', time: 'Fechado' },
      ],
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/',
      footerNote: 'Forja Burger © 2026 — Todos os direitos reservados.',
      ...commerceSiteDefaults(),
    },
  })

  payload.logger.info('Restaurant template seeded.')
}

const extrasBySlug: Record<string, Record<string, unknown>> = {
  rei: {
    chefChoice: true,
    servings: 1,
    portionWeight: '160g',
    prepTimeMinutes: 20,
    comments: 'O mais pedido da casa. Combina bem com Fritas dos Orcs.',
    allergens: 'glúten, leite, ovos',
  },
  espadachim: {
    spicyLevel: 'medium',
    servings: 1,
    portionWeight: '160g',
    allergens: 'glúten, leite',
  },
  'fritas-dos-orcs': {
    servings: 2,
    portionWeight: '400g',
    comments: 'Porção para compartilhar. Ideal para 2 pessoas.',
    allergens: 'leite, glúten',
  },
  'pocao-da-casa': {
    vegan: true,
    glutenFree: true,
    lactoseFree: true,
    servings: 1,
    comments: 'Opção refrescante e sem álcool.',
  },
}

function extrasUnset(item: {
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
  spicyLevel?: SpicyLevel | null
  allergens?: string | null
}) {
  return (
    !item.comments &&
    !item.chefChoice &&
    !item.glutenFree &&
    !item.vegan &&
    !item.vegetarian &&
    !item.lactoseFree &&
    !item.containsAlcohol &&
    item.servings == null &&
    !item.portionWeight &&
    item.prepTimeMinutes == null &&
    !item.spicyLevel &&
    !item.allergens
  )
}

export async function seedItemExtrasIfEmpty(payload: Payload) {
  for (const [slug, extras] of Object.entries(extrasBySlug)) {
    const found = await payload.find({
      collection: 'menu-items',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const item = found.docs[0]
    if (!item || !extrasUnset(item)) continue
    await payload.update({
      collection: 'menu-items',
      id: item.id,
      data: extras,
    })
    payload.logger.info(`Updated extra info for menu item "${slug}"`)
  }
}

const copyBySlug: Record<string, { description: string; ingredients?: string }> = {
  rei: {
    description:
      'Pão brioche tostado na manteiga, 160g de blend suculento grelhado na brasa, envolvido em catupiry empanado crocante e rúcula fresca. Presunto parma, geleia de tomate com manjericão e maionese real no contraste de cremoso, ácido e crocante.',
  },
  rainha: {
    description:
      'Pão de sal com casca dourada, blend 160g grelhado, queijo coalho com casquinha tostada e rúcula viva. Tomate suculento, geleia de maçã artesanal e maionese real equilibram o salgado com um toque adocicado.',
  },
  principe: {
    description:
      'Brioche macio, blend 160g na brasa e pernil suíno desfiado ao barbecue, com bacon crocante e mussarela que estica no primeiro contato. Creme de parmesão artesanal e maionese real para um final untuoso.',
  },
  nobre: {
    description:
      'Pão de sal, blend suculento de 160g, mussarela derretida e catupiry cremoso abraçados no bacon crocante. Creme de parmesão artesanal para um hambúrguer denso e reconfortante.',
  },
  espadachim: {
    description:
      'Brioche tostado, blend 160g, cheddar fundido, bacon crocante e cebola caramelizada lenta — doce, salgado e defumado no mesmo bocado.',
  },
  cavaleiro: {
    description:
      'Brioche, blend 160g na brasa, bacon crocante e ovo frito com gema mole. Mussarela derretida, alface crocante, tomate maduro e cebola roxa, com maionese de ervas para um clássico suculento.',
  },
  'fritas-dos-orcs': {
    description:
      'Batatas douradas e crocantes cobertas com creme de parmesão artesanal e pernil suíno desfiado ao barbecue. A maionese real entra para molhar cada pedaço quente.',
    ingredients:
      'Batatas fritas, creme de parmesão artesanal, pernil suíno desfiado com toque de barbecue e maionese real.',
  },
  'croquete-dos-anoes': {
    description:
      'Seis croquetes de carne bovina ao vinho, empanados na panko até a casca estalar. Por dentro, recheio suculento; por fora, crocância. Acompanham maionese real e creme de parmesão.',
    ingredients:
      'Croquetes de carne bovina com vinho, farinha panko, maionese real e creme de parmesão.',
  },
  'fritas-dos-goblins': {
    description:
      'Batatas crocantes afogadas em cheddar cremoso e cubos de bacon tostado. A maionese real corta o excesso e deixa cada garfada mais gulosa.',
    ingredients: 'Batatas fritas, cheddar cremoso, bacon em cubos e maionese real.',
  },
  'pocao-da-casa': {
    description:
      'Refresco cítrico gelado com hortelã esmagada, gengibre picante e um fio de mel — abre o apetite e limpa o paladar entre um hambúrguer e outro.',
    ingredients: 'Cítricos da casa, hortelã, gengibre e mel.',
  },
  'milkshake-real': {
    description:
      'Milkshake gelado de baunilha, denso o bastante para o canudo resistir, com calda de caramelo salgado e chantilly fofo por cima.',
    ingredients: 'Sorvete de baunilha, calda de caramelo salgado e chantilly.',
  },
}

const addonsBySlug: Record<string, { name: string; price: number; kind: 'add' | 'extra' | 'swap' }[]> = {
  rei: burgerAddons,
  rainha: burgerAddons,
  principe: burgerAddons,
  nobre: burgerAddons,
  espadachim: burgerAddons,
  cavaleiro: burgerAddons,
  'fritas-dos-orcs': sideAddons,
  'croquete-dos-anoes': sideAddons,
  'fritas-dos-goblins': sideAddons,
}

export async function seedCommerceIfEmpty(payload: Payload) {
  const site = await payload.findGlobal({ slug: 'site' })
  if (!site.statusMode || !site.weeklyHours?.length) {
    await payload.updateGlobal({
      slug: 'site',
      data: {
        ...commerceSiteDefaults(),
        statusMode: site.statusMode || 'schedule',
        leadCaptureEnabled: site.leadCaptureEnabled ?? true,
        googleReviewEnabled: site.googleReviewEnabled ?? true,
        googleReviewUrl:
          site.googleReviewUrl || commerceSiteDefaults().googleReviewUrl,
      },
    })
    payload.logger.info('Seeded site commerce settings (hours, leads, review).')
  }

  const items = await payload.find({
    collection: 'menu-items',
    limit: 200,
    depth: 0,
  })

  for (const item of items.docs) {
    const copy = copyBySlug[item.slug]
    const addons = addonsBySlug[item.slug]
    const data: Record<string, unknown> = {}

    if (copy) {
      const descriptionIsList = !item.description || item.description === item.ingredients
      if (descriptionIsList) data.description = copy.description
      if (copy.ingredients && !item.ingredients) data.ingredients = copy.ingredients
    }

    if (addons && (!item.addons || item.addons.length === 0)) {
      data.addons = addons
    }

    if (Object.keys(data).length === 0) continue
    await payload.update({
      collection: 'menu-items',
      id: item.id,
      data,
    })
    payload.logger.info(`Updated commerce content for menu item "${item.slug}"`)
  }
}
