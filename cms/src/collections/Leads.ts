import { APIError, type CollectionConfig } from 'payload'

import { authenticated } from '../access'

function digitsOnly(value: unknown) {
  return String(value || '').replace(/\D/g, '')
}

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Lead',
    plural: 'Leads',
  },
  admin: {
    useAsTitle: 'phone',
    defaultColumns: ['name', 'phone', 'campaign', 'coupon', 'status', 'createdAt'],
    group: 'Operação',
    description: 'Captados no popup de desconto da primeira visita. Um telefone por campanha.',
  },
  access: {
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-createdAt',
  hooks: {
    beforeValidate: [
      async ({ data, req, operation, originalDoc }) => {
        if (!data) return data
        if (data.phone) data.phone = digitsOnly(data.phone)
        if (!data.campaign) data.campaign = 'primeiro-pedido'

        if (operation === 'create' || (operation === 'update' && data.phone)) {
          const phone = data.phone || originalDoc?.phone
          const campaign = data.campaign || originalDoc?.campaign || 'primeiro-pedido'
          if (!phone) return data

          const existing = await req.payload.find({
            collection: 'leads',
            where: {
              and: [{ phone: { equals: phone } }, { campaign: { equals: campaign } }],
            },
            limit: 1,
            req,
          })
          const other = existing.docs.find((doc) => doc.id !== originalDoc?.id)
          if (other) {
            throw new APIError('Este WhatsApp já resgatou esta campanha.', 409)
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'WhatsApp',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Somente números, com DDI. Ex.: 5517999999999',
      },
    },
    {
      name: 'campaign',
      label: 'Campanha',
      type: 'text',
      required: true,
      defaultValue: 'primeiro-pedido',
      index: true,
      admin: {
        description: 'Muda no popup do site para reabrir a oferta a quem já viu a campanha anterior.',
      },
    },
    {
      name: 'coupon',
      label: 'Cupom',
      type: 'text',
    },
    {
      name: 'source',
      label: 'Origem',
      type: 'text',
      defaultValue: 'popup',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Novo', value: 'new' },
        { label: 'Contatado', value: 'contacted' },
        { label: 'Resgatado', value: 'redeemed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      label: 'Observações',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
