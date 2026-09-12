import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { config as loadEnv } from 'dotenv'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { MenuCategories } from './collections/MenuCategories'
import { MenuItems } from './collections/MenuItems'
import { Reservations } from './collections/Reservations'
import { Leads } from './collections/Leads'
import { Site } from './globals/Site'
import { seedIfEmpty, seedItemExtrasIfEmpty, seedCommerceIfEmpty } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

loadEnv({ path: path.resolve(dirname, '../../.env') })
loadEnv({ path: path.resolve(dirname, '../.env') })

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:4321'
const payloadURL = process.env.PAYLOAD_URL || 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Forja CMS',
    },
  },
  collections: [Users, Media, MenuCategories, MenuItems, Reservations, Leads],
  globals: [Site],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: payloadURL,
  cors: [frontendURL, payloadURL],
  csrf: [frontendURL, payloadURL],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: (process.env.DATABASE_URL || '').replace(
        /[?&]sslmode=[^&]*/g,
        '',
      ),
      ssl: { rejectUnauthorized: false },
    },
    schemaName: 'payload',
    push: true,
  }),
  sharp,
  plugins: [],
  onInit: async (payload) => {
    try {
      await seedIfEmpty(payload)
      await seedItemExtrasIfEmpty(payload)
      await seedCommerceIfEmpty(payload)
    } catch (error) {
      payload.logger.error({ err: error }, 'Failed to seed restaurant content')
    }
  },
})
