import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Configurações do site',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Marca',
          fields: [
            {
              name: 'restaurantName',
              label: 'Nome do restaurante',
              type: 'text',
              required: true,
              defaultValue: 'Forja Burger',
            },
            {
              name: 'tagline',
              label: 'Frase de efeito',
              type: 'textarea',
            },
            {
              name: 'locationLabel',
              label: 'Cidade / região (hero)',
              type: 'text',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Sobre',
          fields: [
            {
              name: 'aboutEyebrow',
              label: 'Selo da seção',
              type: 'text',
              defaultValue: 'Forjado com Paixão',
            },
            {
              name: 'aboutTitle',
              label: 'Título',
              type: 'text',
            },
            {
              name: 'aboutBody',
              label: 'Texto',
              type: 'textarea',
            },
            {
              name: 'stats',
              label: 'Números',
              type: 'array',
              maxRows: 6,
              fields: [
                { name: 'value', label: 'Valor', type: 'text', required: true },
                { name: 'label', label: 'Rótulo', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Cardápio (home)',
          fields: [
            {
              name: 'menuEyebrow',
              type: 'text',
              defaultValue: '02 · Mais Pedidos',
            },
            {
              name: 'menuTitle',
              label: 'Título dos destaques',
              type: 'text',
              defaultValue: 'Nossos Hambúrgueres',
            },
            {
              name: 'menuIntro',
              label: 'Introdução',
              type: 'textarea',
            },
            {
              name: 'sidesTitle',
              label: 'Título das entradas',
              type: 'text',
              defaultValue: 'Entradas',
            },
            {
              name: 'sidesIntro',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Experiência',
          fields: [
            {
              name: 'showExperiences',
              label: 'Exibir seção extra',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'experiencesEyebrow',
              type: 'text',
              defaultValue: '03 · Além do Prato',
            },
            {
              name: 'experiencesTitle',
              type: 'text',
            },
            {
              name: 'experiencesIntro',
              type: 'textarea',
            },
            {
              name: 'experiences',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Reservas',
          fields: [
            {
              name: 'reservationTitle',
              type: 'text',
              defaultValue: 'Reserve Sua Mesa',
            },
            {
              name: 'reservationIntro',
              type: 'textarea',
            },
            {
              name: 'reservationNote',
              label: 'Aviso (horários / regras)',
              type: 'textarea',
            },
            {
              name: 'reservationTimes',
              label: 'Horários disponíveis',
              type: 'array',
              fields: [{ name: 'value', label: 'Horário', type: 'text', required: true }],
            },
            {
              name: 'deliveryUrl',
              label: 'Link de delivery',
              type: 'text',
            },
            {
              name: 'deliveryLabel',
              type: 'text',
              defaultValue: 'Delivery',
            },
          ],
        },
        {
          label: 'Contato',
          fields: [
            {
              name: 'address',
              label: 'Endereço',
              type: 'textarea',
            },
            {
              name: 'phone',
              label: 'Telefone',
              type: 'text',
            },
            {
              name: 'whatsapp',
              label: 'WhatsApp (somente números, com DDI)',
              type: 'text',
            },
            {
              name: 'email',
              type: 'email',
            },
            {
              name: 'hours',
              label: 'Horário de funcionamento',
              type: 'array',
              fields: [
                { name: 'days', label: 'Dias', type: 'text', required: true },
                { name: 'time', label: 'Horário', type: 'text', required: true },
              ],
            },
            {
              name: 'instagram',
              type: 'text',
            },
            {
              name: 'facebook',
              type: 'text',
            },
            {
              name: 'mapEmbedUrl',
              label: 'URL do mapa (Google Maps embed)',
              type: 'text',
            },
            {
              name: 'footerNote',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
