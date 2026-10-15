import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas/schema'

const isDevelopment = process.env.NODE_ENV === 'development'
const dataset = process.env.SANITY_STUDIO_DATASET || (isDevelopment ? 'development' : 'production')

export default defineConfig({
  name: 'default',
  title: 'CTTA Almanac',
  projectId: 'nxypgfqb',
  dataset,
  plugins: isDevelopment ? [visionTool()] : [],
  schema: {
    types: schemaTypes
  }
})
