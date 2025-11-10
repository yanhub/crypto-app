import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'content', type: 'textarea' },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: { description: 'Связанные посты' },
    },
  ],
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
  },
}