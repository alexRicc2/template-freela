import type { CollectionConfig } from 'payload'

import { authenticatedAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  auth: true,
  access: {
    admin: authenticatedAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
