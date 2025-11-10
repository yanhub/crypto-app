import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    useAPIKey: false,
    verify: false,
    tokenExpiration: 3600 * 24 * 7,
    loginWithUsername: true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
