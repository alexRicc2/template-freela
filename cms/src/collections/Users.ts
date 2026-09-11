import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  auth: true,
  access: {
    admin: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
