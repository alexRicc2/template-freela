import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const frontendURL = process.env.FRONTEND_URL || 'http://localhost:4321'

  return (
    <div className="home">
      <div className="content">
        <h1>Forja CMS</h1>
        <p>
          {user
            ? `Olá, ${user.email}. O site do restaurante vive no Astro.`
            : 'Payload + Supabase para o cardápio. Astro para o site público.'}
        </p>
        <div className="links">
          <a className="admin" href={payloadConfig.routes.admin}>
            Painel admin
          </a>
          <a className="docs" href={frontendURL} rel="noopener noreferrer" target="_blank">
            Ver o site
          </a>
        </div>
      </div>
    </div>
  )
}
