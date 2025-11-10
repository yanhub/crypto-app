import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'content', type: 'textarea' },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
  },
}