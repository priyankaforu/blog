import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Priyanka Portfolio',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '19z1wtx8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
})
