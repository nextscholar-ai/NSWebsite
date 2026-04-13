import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'nn1ggr3o',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true // Re-enabling CDN as the ID is now correct
})
