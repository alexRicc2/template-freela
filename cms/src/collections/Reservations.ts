import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const Reservations: CollectionConfig = {
  slug: 'reservations',
  labels: {
    singular: 'Reserva',
    plural: 'Reservas',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'date', 'time', 'guests', 'status', 'createdAt'],
    group: 'Operação',
  },
  access: {
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'Telefone / WhatsApp',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      label: 'Data',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'time',
      label: 'Horário',
      type: 'text',
      required: true,
    },
    {
      name: 'guests',
      label: 'Nº de pessoas',
      type: 'text',
      required: true,
    },
    {
      name: 'area',
      label: 'Preferência de área',
      type: 'select',
      defaultValue: 'any',
      options: [
        { label: 'Qualquer uma', value: 'any' },
        { label: 'Área interna', value: 'indoor' },
        { label: 'Área externa', value: 'outdoor' },
      ],
    },
    {
      name: 'notes',
      label: 'Observações',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nova', value: 'new' },
        { label: 'Confirmada', value: 'confirmed' },
        { label: 'Cancelada', value: 'cancelled' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
