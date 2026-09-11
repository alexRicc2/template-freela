import type { Payload } from 'payload'

const burgers = [
  {
    name: 'Rei',
    slug: 'rei',
    tag: 'Realeza',
    featured: true,
    order: 1,
    price: 42,
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
  },
  {
    name: 'Rainha',
    slug: 'rainha',
    tag: 'Realeza',
    featured: true,
    order: 2,
    price: 39,
    ingredients:
      'Pão de sal, hambúrguer suculento de 160g, queijo coalho grelhado, rúcula fresquinha, tomates selecionados, geleia de maçã artesanal e maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Príncipe',
    slug: 'principe',
    tag: 'Realeza',
    featured: true,
    order: 3,
    price: 44,
    ingredients:
      'Pão de brioche, hambúrguer suculento de 160g, pernil suíno desfiado com toque de barbecue, bacon assado crocante, mussarela derretida, creme de parmesão artesanal e maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Nobre',
    slug: 'nobre',
    tag: 'Realeza',
    featured: true,
    order: 4,
    price: 38,
    ingredients:
      'Pão de sal, hambúrguer suculento de 160g, mussarela derretida, catupiry cremoso, bacon assado crocante e creme de parmesão artesanal.',
    imageUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Espadachim',
    slug: 'espadachim',
    tag: 'Guerreiro',
    featured: true,
    order: 5,
    price: 36,
    ingredients:
      'Pão de brioche, hambúrguer suculento de 160g, cheddar fatiado, bacon assado crocante e cebola caramelizada.',
    imageUrl:
      'https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&w=900&q=80',
    spicyLevel: 'medium',
    servings: 1,
    portionWeight: '160g',
    allergens: 'glúten, leite',
  },
  {
    name: 'Cavaleiro',
    slug: 'cavaleiro',
    tag: 'Guerreiro',
    featured: true,
    order: 6,
    price: 40,
    ingredients:
      'Pão de brioche, hambúrguer suculento de 160g, bacon assado crocante, ovo frito, mussarela derretida, alface, tomate, cebola roxa e maionese de ervas.',
    imageUrl:
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80',
  },
]

const sides = [
  {
    name: 'Fritas dos Orcs',
    slug: 'fritas-dos-orcs',
    order: 1,
    price: 32,
    description:
      'Batatas fritas cobertas com creme de parmesão artesanal e pernil suíno desfiado com toque de barbecue. Acompanha maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80',
    servings: 2,
    portionWeight: '400g',
    comments: 'Porção para compartilhar. Ideal para 2 pessoas.',
    allergens: 'leite, glúten',
  },
  {
    name: 'Croquete dos Anões',
    slug: 'croquete-dos-anoes',
    order: 2,
    price: 28,
    description:
      'Porção com 6 croquetes de carne bovina com vinho, empanados na farinha panko. Acompanha maionese real e creme de parmesão.',
    imageUrl:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Fritas dos Goblins',
    slug: 'fritas-dos-goblins',
    order: 3,
    price: 29,
    description:
      'Batatas fritas cobertas com cheddar cremoso e bacon em cubos crocante. Acompanha maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=80',
  },
]

const drinks = [
  {
    name: 'Poção da Casa',
    slug: 'pocao-da-casa',
    order: 1,
    price: 18,
    description: 'Refresco cítrico da casa com hortelã, gengibre e um toque de mel.',
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
    description: 'Milkshake de baunilha com calda de caramelo salgado e chantilly.',
    imageUrl:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80',
  },
]

export async function seedIfEmpty(payload: Payload) {
  const existing = await payload.count({ collection: 'menu-items' })
  if (existing.totalDocs > 0) return

  payload.logger.info('Seeding restaurant template content…')

  const burgersCat = await payload.create({
    collection: 'menu-categories',
    data: {
      name: 'Hambúrgueres',
      slug: 'hamburgueres',
      description: 'Os campeões da casa — passe o mouse (ou toque) para revelar os ingredientes.',
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
        description: item.ingredients,
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
        ingredients: item.description,
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
        ingredients: item.description,
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
  spicyLevel?: string | null
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
