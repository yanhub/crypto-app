import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  versions: { drafts: false },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
  ],
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
  },
}
