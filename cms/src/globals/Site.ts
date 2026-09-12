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
          label: 'Funcionamento',
          fields: [
            {
              name: 'statusMode',
              label: 'Status da casa',
              type: 'select',
              defaultValue: 'schedule',
              options: [
                { label: 'Automático (seguir horários)', value: 'schedule' },
                { label: 'Forçar aberto', value: 'open' },
                { label: 'Forçar fechado', value: 'closed' },
              ],
              admin: {
                description:
                  'Use “Forçar” em feriados ou imprevistos. No automático, o site calcula Aberto/Fechado pelo horário da semana.',
              },
            },
            {
              name: 'timezone',
              label: 'Fuso horário',
              type: 'text',
              defaultValue: 'America/Sao_Paulo',
              admin: {
                description: 'IANA, ex.: America/Sao_Paulo',
              },
            },
            {
              name: 'openLabel',
              label: 'Texto quando aberto',
              type: 'text',
              defaultValue: 'Aberto · aceitando pedidos',
            },
            {
              name: 'closedLabel',
              label: 'Texto quando fechado',
              type: 'text',
              defaultValue: 'Fechado · pedidos pelo WhatsApp no próximo horário',
            },
            {
              name: 'closedMessage',
              label: 'Aviso extra (fechado)',
              type: 'textarea',
              admin: {
                description: 'Exibido no delivery quando a casa não está aceitando pedidos.',
              },
            },
            {
              name: 'acceptOrdersWhenClosed',
              label: 'Permitir montar pedido mesmo fechado',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'weeklyHours',
              label: 'Horários da semana',
              type: 'array',
              admin: {
                description: 'Usado pelo indicador Aberto/Fechado. 0 = domingo … 6 = sábado.',
              },
              fields: [
                {
                  name: 'weekday',
                  label: 'Dia',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Domingo', value: '0' },
                    { label: 'Segunda', value: '1' },
                    { label: 'Terça', value: '2' },
                    { label: 'Quarta', value: '3' },
                    { label: 'Quinta', value: '4' },
                    { label: 'Sexta', value: '5' },
                    { label: 'Sábado', value: '6' },
                  ],
                },
                {
                  name: 'closed',
                  label: 'Fechado neste dia',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'opensAt',
                      label: 'Abre',
                      type: 'text',
                      admin: {
                        width: '50%',
                        placeholder: '18:30',
                        condition: (_, siblingData) => !siblingData?.closed,
                      },
                    },
                    {
                      name: 'closesAt',
                      label: 'Fecha',
                      type: 'text',
                      admin: {
                        width: '50%',
                        placeholder: '23:00',
                        condition: (_, siblingData) => !siblingData?.closed,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Captação de leads',
          fields: [
            {
              name: 'leadCaptureEnabled',
              label: 'Ativar popup de primeira visita',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'leadCaptureCampaign',
              label: 'ID da campanha',
              type: 'text',
              defaultValue: 'primeiro-pedido',
              admin: {
                description:
                  'Quem já viu ou resgatou não vê de novo. Troque o ID para relançar a oferta.',
                condition: (_, siblingData) => siblingData?.leadCaptureEnabled !== false,
              },
            },
            {
              name: 'leadCaptureTitle',
              label: 'Título',
              type: 'text',
              defaultValue: 'Ganhe 10% no primeiro pedido',
              admin: {
                condition: (_, siblingData) => siblingData?.leadCaptureEnabled !== false,
              },
            },
            {
              name: 'leadCaptureBody',
              label: 'Texto',
              type: 'textarea',
              defaultValue:
                'Deixe seu WhatsApp e receba 10% de desconto no primeiro pedido. Sem cadastro chato — a gente já manda a mensagem pronta.',
              admin: {
                condition: (_, siblingData) => siblingData?.leadCaptureEnabled !== false,
              },
            },
            {
              name: 'leadCaptureDiscount',
              label: 'Selo do desconto',
              type: 'text',
              defaultValue: '10% OFF',
              admin: {
                condition: (_, siblingData) => siblingData?.leadCaptureEnabled !== false,
              },
            },
            {
              name: 'leadCaptureCoupon',
              label: 'Cupom',
              type: 'text',
              defaultValue: 'PRIMEIRO10',
              admin: {
                condition: (_, siblingData) => siblingData?.leadCaptureEnabled !== false,
              },
            },
            {
              name: 'leadCaptureCta',
              label: 'Botão',
              type: 'text',
              defaultValue: 'Quero meu desconto no WhatsApp',
              admin: {
                condition: (_, siblingData) => siblingData?.leadCaptureEnabled !== false,
              },
            },
            {
              name: 'leadCaptureWhatsappMessage',
              label: 'Mensagem do WhatsApp',
              type: 'textarea',
              defaultValue:
                'Olá, {restaurant}! Quero o cupom {coupon} ({discount}) no primeiro pedido. Meu WhatsApp é {phone}.',
              admin: {
                description: 'Placeholders: {restaurant} {coupon} {discount} {phone} {name}',
                condition: (_, siblingData) => siblingData?.leadCaptureEnabled !== false,
              },
            },
          ],
        },
        {
          label: 'Avaliação Google',
          fields: [
            {
              name: 'googleReviewEnabled',
              label: 'Exibir convite de avaliação',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'googleReviewUrl',
              label: 'Link de avaliação (Google Maps)',
              type: 'text',
              admin: {
                description:
                  'Link “Escrever avaliação” do Google. Também usado na página /avaliar (placa NFC).',
                condition: (_, siblingData) => siblingData?.googleReviewEnabled !== false,
              },
            },
            {
              name: 'googleReviewTitle',
              label: 'Título',
              type: 'text',
              defaultValue: 'Curtiu a experiência?',
              admin: {
                condition: (_, siblingData) => siblingData?.googleReviewEnabled !== false,
              },
            },
            {
              name: 'googleReviewBody',
              label: 'Texto',
              type: 'textarea',
              defaultValue: 'Nos ajude avaliando no Google. Leva menos de um minuto e fortalece a casa.',
              admin: {
                condition: (_, siblingData) => siblingData?.googleReviewEnabled !== false,
              },
            },
            {
              name: 'googleReviewCta',
              label: 'Botão',
              type: 'text',
              defaultValue: 'Avaliar no Google',
              admin: {
                condition: (_, siblingData) => siblingData?.googleReviewEnabled !== false,
              },
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
