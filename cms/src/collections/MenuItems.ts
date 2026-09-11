import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  labels: {
    singular: 'Item',
    plural: 'Itens do cardápio',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'chefChoice', 'featured', 'published'],
    group: 'Cardápio',
    listSearchableFields: ['name', 'description', 'ingredients', 'comments', 'allergens'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { published: { equals: true } }
    },
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
      name: 'category',
      label: 'Categoria',
      type: 'relationship',
      relationTo: 'menu-categories',
      required: true,
    },
    {
      name: 'tag',
      label: 'Selo',
      type: 'text',
      admin: {
        description: 'Ex.: Realeza, Guerreiro, Chef — aparece sobre a foto.',
      },
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
    },
    {
      name: 'ingredients',
      label: 'Ingredientes',
      type: 'textarea',
      admin: {
        description: 'Revelados no hover/toque da home.',
      },
    },
    {
      name: 'price',
      label: 'Preço (R$)',
      type: 'number',
      min: 0,
      admin: { step: 0.01 },
    },
    {
      type: 'collapsible',
      label: 'Informações adicionais',
      admin: {
        initCollapsed: false,
        description: 'Aparecem no popup do cardápio e do delivery somente se preenchidas.',
      },
      fields: [
        {
          name: 'comments',
          label: 'Comentários',
          type: 'textarea',
          admin: {
            description: 'Notas extras para o cliente: dica do prato, acompanhamento, etc.',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'chefChoice',
              label: 'Escolha do chef',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'glutenFree',
              label: 'Sem glúten',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'vegan',
              label: 'Vegano',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'vegetarian',
              label: 'Vegetariano',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'lactoseFree',
              label: 'Sem lactose',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'containsAlcohol',
              label: 'Contém álcool',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'servings',
              label: 'Serve quantas pessoas',
              type: 'number',
              min: 1,
              admin: { step: 1, width: '33%' },
            },
            {
              name: 'portionWeight',
              label: 'Peso da porção',
              type: 'text',
              admin: {
                width: '33%',
                description: 'Ex.: 160g, 400g, 6 unidades',
              },
            },
            {
              name: 'prepTimeMinutes',
              label: 'Tempo de preparo (min)',
              type: 'number',
              min: 0,
              admin: { step: 1, width: '33%' },
            },
          ],
        },
        {
          name: 'spicyLevel',
          label: 'Nível de picância',
          type: 'select',
          options: [
            { label: 'Não picante', value: 'none' },
            { label: 'Leve', value: 'mild' },
            { label: 'Médio', value: 'medium' },
            { label: 'Forte', value: 'hot' },
          ],
        },
        {
          name: 'allergens',
          label: 'Alérgenos',
          type: 'text',
          admin: {
            description: 'Ex.: leite, glúten, ovos, soja, amendoim',
          },
        },
      ],
    },
    {
      name: 'image',
      label: 'Foto (upload)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      label: 'Foto (URL externa)',
      type: 'text',
      admin: {
        description: 'Usada se não houver upload. Ideal para placeholders.',
      },
    },
    {
      name: 'featured',
      label: 'Destaque na home',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'published',
      label: 'Publicado',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      label: 'Ordem',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', step: 1 },
    },
  ],
  timestamps: true,
}
