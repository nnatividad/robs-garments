import {createImageUrlBuilder} from '@sanity/image-url'
import {client} from '@/sanity/client'

// Create an image URL builder using the client
const builder = createImageUrlBuilder(client)

// Export a function that can be used to get image URLs
export function urlFor(source) {
  return builder.image(source)
}