import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: "dqeg5n1l",
  dataset: "production",
  perspective: 'published',
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_KEY,
  useCdn: false,
});