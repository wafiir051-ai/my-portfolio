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

// Prestasi dari tabel `achievements` (diisi lewat admin.html). Mengembalikan null
// kalau tabel kosong atau belum dibuat, supaya situs memakai prestasi bawaan.
export async function fetchAchievements(signal) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/achievements?select=*&order=sort_order.asc,created_at.asc`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    signal,
  })
  if (!res.ok) throw new Error(`Status ${res.status}`)
  const rows = await res.json()
  if (!Array.isArray(rows) || rows.length === 0) return null
  return rows.map((a) => ({
    id: String(a.id),
    title: String(a.title || ''),
    note: String(a.note || ''),
    year: a.year ? Number(a.year) : null,
    image: typeof a.image_url === 'string' && a.image_url.trim() ? a.image_url.trim() : '',
  }))
}

// Kotak fakta di bagian Tentang dari tabel `profile_facts` (diisi lewat admin.html).
// Mengembalikan null kalau tabel kosong atau belum dibuat, supaya situs memakai isi bawaan.
export async function fetchProfileFacts(signal) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/profile_facts?select=*&order=sort_order.asc,created_at.asc`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    signal,
  })
  if (!res.ok) throw new Error(`Status ${res.status}`)
  const rows = await res.json()
  if (!Array.isArray(rows) || rows.length === 0) return null
  return rows.map((f) => ({
    id: String(f.id),
    label: String(f.label || ''),
    value: String(f.value || ''),
    icon: String(f.icon || 'grup'),
  }))
}
