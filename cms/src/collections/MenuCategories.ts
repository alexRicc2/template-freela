import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const MenuCategories: CollectionConfig = {
  slug: 'menu-categories',
  labels: {
    singular: 'Categoria',
    plural: 'Categorias do cardápio',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', 'showOnHome'],
    group: 'Cardápio',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
    },
    {
      name: 'order',
      label: 'Ordem',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', step: 1 },
    },
    {
      name: 'showOnHome',
      label: 'Destacar na home',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
