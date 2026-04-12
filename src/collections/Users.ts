import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email is added by default by auth: true
    {
      name: 'name',
      type: 'text',
    },
  ],
}
