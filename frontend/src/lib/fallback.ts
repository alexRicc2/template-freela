import type { MenuCategory, MenuItem, Site } from './types'

export const fallbackSite: Site = {
  restaurantName: 'Forja Burger',
  tagline:
    'Hambúrgueres artesanais forjados com os melhores ingredientes, servidos em um salão temático medieval com jogos de tabuleiro.',
  locationLabel: 'São José do Rio Preto • SP',
  aboutEyebrow: 'Forjado com Paixão',
  aboutTitle: 'Um salão para comer e viver uma aventura',
  aboutBody:
    'A Forja Burger nasceu da paixão por hambúrgueres artesanais e pela rica atmosfera medieval. Nosso salão é um portal para outra era — onde cada mordida é uma conquista, cada prato uma obra-prima e cada visita uma aventura.',
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
    'Antes do prato principal, comece a aventura com as nossas entradas. Porções caprichadas para compartilhar.',
  showExperiences: true,
  experiencesEyebrow: '03 · Board Games',
  experiencesTitle: 'Aventura Além do Prato',
  experiencesIntro:
    'Enquanto espera seu pedido ou após a refeição, mergulhe no nosso acervo de jogos de tabuleiro.',
  experiences: [
    { title: '+25 Jogos', description: 'Acervo diversificado com jogos para iniciantes e veteranos.' },
    { title: 'Ambiente Temático', description: 'Jogue em um cenário medieval que eleva a imersão de qualquer jogo.' },
    { title: 'Torneios', description: 'Competições mensais com prêmios para os melhores jogadores.' },
  ],
  reservationTitle: 'Reserve Sua Mesa',
  reservationIntro:
    'Garanta seu lugar no salão medieval. Preencha o formulário abaixo e entraremos em contato para confirmar.',
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
  statusMode: 'schedule',
  timezone: 'America/Sao_Paulo',
  openLabel: 'Aberto · aceitando pedidos',
  closedLabel: 'Fechado · pedidos no próximo horário',
  closedMessage:
    'A cozinha está fechada agora. Você ainda pode olhar o cardápio — os pedidos voltam a ser aceitos no próximo horário de funcionamento.',
  acceptOrdersWhenClosed: false,
  weeklyHours: [
    { weekday: '0', closed: false, opensAt: '18:30', closesAt: '23:00' },
    { weekday: '1', closed: true, opensAt: '', closesAt: '' },
    { weekday: '2', closed: false, opensAt: '18:30', closesAt: '23:00' },
    { weekday: '3', closed: false, opensAt: '18:30', closesAt: '23:00' },
    { weekday: '4', closed: false, opensAt: '18:30', closesAt: '23:00' },
    { weekday: '5', closed: false, opensAt: '18:30', closesAt: '23:00' },
    { weekday: '6', closed: false, opensAt: '18:30', closesAt: '23:00' },
  ],
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
  googleReviewBody: 'Nos ajude avaliando no Google. Leva menos de um minuto e fortalece a casa.',
  googleReviewCta: 'Avaliar no Google',
}

export const fallbackCategories: MenuCategory[] = [
  {
    id: 'hamburgueres',
    name: 'Hambúrgueres',
    slug: 'hamburgueres',
    showOnHome: true,
    order: 1,
  },
  {
    id: 'entradas',
    name: 'Entradas',
    slug: 'entradas',
    description: 'Porções caprichadas para compartilhar.',
    showOnHome: true,
    order: 2,
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    slug: 'bebidas',
    showOnHome: false,
    order: 3,
  },
]

const burgerAddons = [
  { name: 'Bacon extra', price: 6, kind: 'add' as const },
  { name: 'Dobrar a carne', price: 10, kind: 'extra' as const },
  { name: 'Catupiry extra', price: 5, kind: 'add' as const },
  { name: 'Trocar batata comum por rústica', price: 4, kind: 'swap' as const },
]

const sideAddons = [
  { name: 'Cheddar extra', price: 5, kind: 'add' as const },
  { name: 'Bacon extra', price: 6, kind: 'add' as const },
]

export const fallbackItems: MenuItem[] = [
  {
    id: 1,
    name: 'Rei',
    slug: 'rei',
    tag: 'Realeza',
    featured: true,
    price: 42,
    description:
      'Pão brioche tostado na manteiga, 160g de blend suculento grelhado na brasa, envolvido em catupiry empanado crocante e rúcula fresca. Presunto parma, geleia de tomate com manjericão e maionese real no contraste de cremoso, ácido e crocante.',
    ingredients:
      'Pão de brioche, hambúrguer suculento de 160g, catupiry empanado na farinha panko, presunto parma, rúcula, geleia de tomate com manjericão e maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    category: fallbackCategories[0],
    chefChoice: true,
    servings: 1,
    portionWeight: '160g',
    prepTimeMinutes: 20,
    comments: 'O mais pedido da casa. Combina bem com Fritas dos Orcs.',
    allergens: 'glúten, leite, ovos',
    addons: burgerAddons,
  },
  {
    id: 2,
    name: 'Rainha',
    slug: 'rainha',
    tag: 'Realeza',
    featured: true,
    price: 39,
    description:
      'Pão de sal com casca dourada, blend 160g grelhado, queijo coalho com casquinha tostada e rúcula viva. Tomate suculento, geleia de maçã artesanal e maionese real equilibram o salgado com um toque adocicado.',
    ingredients:
      'Pão de sal, hambúrguer suculento de 160g, queijo coalho grelhado, rúcula, tomates selecionados, geleia de maçã artesanal e maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
    category: fallbackCategories[0],
    addons: burgerAddons,
  },
  {
    id: 3,
    name: 'Príncipe',
    slug: 'principe',
    tag: 'Realeza',
    featured: true,
    price: 44,
    description:
      'Brioche macio, blend 160g na brasa e pernil suíno desfiado ao barbecue, com bacon crocante e mussarela que estica no primeiro contato. Creme de parmesão artesanal e maionese real para um final untuoso.',
    ingredients:
      'Pão de brioche, hambúrguer de 160g, pernil suíno desfiado, bacon crocante, mussarela, creme de parmesão e maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80',
    category: fallbackCategories[0],
    addons: burgerAddons,
  },
  {
    id: 4,
    name: 'Nobre',
    slug: 'nobre',
    tag: 'Realeza',
    featured: true,
    price: 38,
    description:
      'Pão de sal, blend suculento de 160g, mussarela derretida e catupiry cremoso abraçados no bacon crocante. Creme de parmesão artesanal para um hambúrguer denso e reconfortante.',
    ingredients:
      'Pão de sal, hambúrguer de 160g, mussarela, catupiry, bacon crocante e creme de parmesão artesanal.',
    imageUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=900&q=80',
    category: fallbackCategories[0],
    addons: burgerAddons,
  },
  {
    id: 5,
    name: 'Espadachim',
    slug: 'espadachim',
    tag: 'Guerreiro',
    featured: true,
    price: 36,
    description:
      'Brioche tostado, blend 160g, cheddar fundido, bacon crocante e cebola caramelizada lenta — doce, salgado e defumado no mesmo bocado.',
    ingredients:
      'Pão de brioche, hambúrguer de 160g, cheddar, bacon crocante e cebola caramelizada.',
    imageUrl:
      'https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&w=900&q=80',
    category: fallbackCategories[0],
    spicyLevel: 'medium',
    servings: 1,
    portionWeight: '160g',
    allergens: 'glúten, leite',
    addons: burgerAddons,
  },
  {
    id: 6,
    name: 'Cavaleiro',
    slug: 'cavaleiro',
    tag: 'Guerreiro',
    featured: true,
    price: 40,
    description:
      'Brioche, blend 160g na brasa, bacon crocante e ovo frito com gema mole. Mussarela derretida, alface crocante, tomate maduro e cebola roxa, com maionese de ervas para um clássico suculento.',
    ingredients:
      'Pão de brioche, hambúrguer de 160g, bacon, ovo frito, mussarela, alface, tomate, cebola roxa e maionese de ervas.',
    imageUrl:
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80',
    category: fallbackCategories[0],
    addons: burgerAddons,
  },
  {
    id: 7,
    name: 'Fritas dos Orcs',
    slug: 'fritas-dos-orcs',
    featured: false,
    price: 32,
    description:
      'Batatas douradas e crocantes cobertas com creme de parmesão artesanal e pernil suíno desfiado ao barbecue. A maionese real entra para molhar cada pedaço quente.',
    ingredients:
      'Batatas fritas, creme de parmesão artesanal, pernil suíno desfiado com toque de barbecue e maionese real.',
    imageUrl:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80',
    category: fallbackCategories[1],
    servings: 2,
    portionWeight: '400g',
    comments: 'Porção para compartilhar. Ideal para 2 pessoas.',
    allergens: 'leite, glúten',
    addons: sideAddons,
  },
  {
    id: 8,
    name: 'Croquete dos Anões',
    slug: 'croquete-dos-anoes',
    featured: false,
    price: 28,
    description:
      'Seis croquetes de carne bovina ao vinho, empanados na panko até a casca estalar. Por dentro, recheio suculento; por fora, crocância. Acompanham maionese real e creme de parmesão.',
    imageUrl:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
    category: fallbackCategories[1],
    addons: sideAddons,
  },
  {
    id: 9,
    name: 'Fritas dos Goblins',
    slug: 'fritas-dos-goblins',
    featured: false,
    price: 29,
    description:
      'Batatas crocantes afogadas em cheddar cremoso e cubos de bacon tostado. A maionese real corta o excesso e deixa cada garfada mais gulosa.',
    imageUrl:
      'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=80',
    category: fallbackCategories[1],
    addons: sideAddons,
  },
]
