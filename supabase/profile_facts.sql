-- Kotak fakta di bagian Tentang (lokasi, sekolah, peran, dan seterusnya), dikelola lewat /admin.
-- Jalankan sekali di Supabase: SQL Editor > New query > paste > Run.
-- Aman dijalankan ulang: tabel dan isi awal tidak digandakan.

create table if not exists public.profile_facts (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  icon text not null default 'grup',
  sort_order integer not null default 999,
  created_at timestamptz not null default now()
);

alter table public.profile_facts enable row level security;

drop policy if exists "profile_facts read" on public.profile_facts;
create policy "profile_facts read" on public.profile_facts
  for select to anon, authenticated using (true);

drop policy if exists "profile_facts insert" on public.profile_facts;
create policy "profile_facts insert" on public.profile_facts
  for insert to authenticated with check (true);

drop policy if exists "profile_facts update" on public.profile_facts;
create policy "profile_facts update" on public.profile_facts
  for update to authenticated using (true) with check (true);

drop policy if exists "profile_facts delete" on public.profile_facts;
create policy "profile_facts delete" on public.profile_facts
  for delete to authenticated using (true);

-- Isi awal: sama dengan yang tampil sekarang. Hanya diisi kalau tabel masih kosong.
insert into public.profile_facts (label, value, icon, sort_order)
select v.label, v.value, v.icon, v.sort_order
from (values
  ('Lokasi', 'Subang, Jawa Barat', 'lokasi', 1),
  ('Sekolah', 'SMKIT Assyifa Boarding School, kelas 11', 'sekolah', 2),
  ('Peran', 'Ketua IT Club dan Ketua Hadroh sekolah', 'grup', 3),
  ('Organisasi', 'Pernah jadi OSIS divisi kebersihan, SMPIT Insan Mandiri Greenville', 'grup', 4),
  ('Kepanitiaan', 'Pernah jadi anggota Danus (Dana Usaha) di acara Asfera, Assyiffa Festival Raya', 'grup', 5),
  ('Fokus', 'Web, mobile, IoT', 'kode', 6)
) as v(label, value, icon, sort_order)
where not exists (select 1 from public.profile_facts);
