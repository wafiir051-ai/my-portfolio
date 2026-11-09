import { createRequire } from 'node:module'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const require = createRequire(import.meta.url)

// Menjalankan ../api/chat.js (fungsi Vercel) di server lokal, supaya obrolan
// Astra bisa dites tanpa deploy. Kunci dibaca dari react-app/.env.local.
function astraApi(env) {
  const handle = (req, res, next) => {
    if (!req.url || !req.url.startsWith('/api/chat')) return next()
    const send = (code, body) => {
      res.statusCode = code
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(body))
    }
    if (!env.GEMINI_API_KEY) {
      return send(503, {
        reply: 'Obrolan lokal belum diatur. Isi GEMINI_API_KEY di react-app/.env.local lalu jalankan ulang server.',
      })
    }
    let raw = ''
    req.on('data', (c) => (raw += c))
    req.on('end', () => {
      try {
        req.body = raw ? JSON.parse(raw) : {}
      } catch {
        return send(400, { error: 'JSON tidak valid' })
      }
      Object.assign(process.env, env)
      const fakeRes = {
        status(code) {
          res.statusCode = code
          return fakeRes
        },
        json(body) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        },
      }
      const file = path.resolve(process.cwd(), '../api/chat.js')
      delete require.cache[file]
      Promise.resolve(require(file)(req, fakeRes)).catch(() =>
        send(500, { reply: 'Astra lagi error di server lokal.' }),
      )
    })
  }
  return {
    name: 'astra-api',
    configureServer(s) {
      s.middlewares.use(handle)
    },
    configurePreviewServer(s) {
      s.middlewares.use(handle)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.VITE_API_TARGET
  const proxy = target ? { '/api': { target, changeOrigin: true, secure: true } } : undefined
  return {
    plugins: [react(), ...(target ? [] : [astraApi(env)])],
    server: { proxy },
    preview: { proxy },
  }
})
