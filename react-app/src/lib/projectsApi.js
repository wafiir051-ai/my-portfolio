// Daftar proyek dari tabel `projects` di Supabase (diisi lewat admin.html).
// URL dan anon key ini publik dan sudah dipakai halaman statis; keamanannya
// bergantung pada aturan RLS di Supabase, bukan pada kerahasiaan kunci.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://erfuemuloqptttrbccmw.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZnVlbXVsb3FwdHR0cmJjY213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDk4OTgsImV4cCI6MjEwMTM4NTg5OH0.NRk5Ve1I6s71Zw1RAd10IFrXlI7ivySC3LDeQRb68ko'

export async function fetchProjects(signal) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*&order=sort_order.asc`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    signal,
  })
  if (!res.ok) throw new Error(`Status ${res.status}`)
  const rows = await res.json()
  if (!Array.isArray(rows) || rows.length === 0) return null
  return rows.map((p) => {
    const link = typeof p.link_url === 'string' && /^https?:\/\//i.test(p.link_url.trim()) ? p.link_url.trim() : undefined
    return {
      title: String(p.title || ''),
      jenis: String(p.category || ''),
      desc: String(p.description || ''),
      stack: Array.isArray(p.tags) ? p.tags.join(', ') : '',
      status: link ? 'Live' : String(p.status_text || ''),
      link,
    }
  })
}
