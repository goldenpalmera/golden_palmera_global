import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { blogPost } from './blogPost'
import { service } from './service'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    blogPost,
    service,
  ],
}
