// Menjaga project Supabase gratis tidak di-pause karena tidak ada aktivitas.
// Dipanggil Vercel Cron tiap hari (lihat "crons" di vercel.json) dan melakukan
// satu permintaan baca ringan ke tabel proyek. URL dan anon key ini publik
// (sudah dipakai halaman web); bisa ditimpa lewat SUPABASE_URL dan SUPABASE_ANON_KEY.
const FALLBACK_URL = 'https://erfuemuloqptttrbccmw.supabase.co'
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZnVlbXVsb3FwdHR0cmJjY213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDk4OTgsImV4cCI6MjEwMTM4NTg5OH0.NRk5Ve1I6s71Zw1RAd10IFrXlI7ivySC3LDeQRb68ko'

module.exports = async function handler(req, res) {
  // Kalau CRON_SECRET diisi di Vercel, hanya panggilan cron resmi yang diterima.
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ ok: false, error: 'unauthorized' })
  }

  const url = process.env.SUPABASE_URL || FALLBACK_URL
  const key = process.env.SUPABASE_ANON_KEY || FALLBACK_KEY
  try {
    const r = await fetch(`${url}/rest/v1/projects?select=id&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    })
    return res.status(200).json({ ok: r.ok, supabaseStatus: r.status, at: new Date().toISOString() })
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'supabase tidak terjangkau', at: new Date().toISOString() })
  }
}
