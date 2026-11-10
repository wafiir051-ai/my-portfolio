-- Tabel prestasi untuk portofolio + bucket gambar, dikelola lewat /admin.
-- Jalankan sekali di Supabase: SQL Editor > New query > paste > Run.
--
-- PENTING (keamanan): policy tulis di bawah memakai peran "authenticated", yaitu
-- siapa pun yang punya akun di project ini. Matikan pendaftaran publik di
-- Authentication > Sign In / Providers > "Allow new users to sign up", supaya
-- hanya akunmu yang bisa login ke /admin.

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  note text,
  year integer,
  image_url text,
  sort_order integer not null default 999,
  created_at timestamptz not null default now()
);

alter table public.achievements enable row level security;

drop policy if exists "achievements read" on public.achievements;
create policy "achievements read" on public.achievements
  for select to anon, authenticated using (true);

drop policy if exists "achievements insert" on public.achievements;
create policy "achievements insert" on public.achievements
  for insert to authenticated with check (true);

drop policy if exists "achievements update" on public.achievements;
create policy "achievements update" on public.achievements
  for update to authenticated using (true) with check (true);

drop policy if exists "achievements delete" on public.achievements;
create policy "achievements delete" on public.achievements
  for delete to authenticated using (true);

-- Bucket gambar prestasi (publik dibaca, hanya admin yang menulis).
insert into storage.buckets (id, name, public)
values ('achievements', 'achievements', true)
on conflict (id) do update set public = true;

drop policy if exists "achievements files read" on storage.objects;
create policy "achievements files read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'achievements');

drop policy if exists "achievements files insert" on storage.objects;
create policy "achievements files insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'achievements');

drop policy if exists "achievements files update" on storage.objects;
create policy "achievements files update" on storage.objects
  for update to authenticated using (bucket_id = 'achievements') with check (bucket_id = 'achievements');

drop policy if exists "achievements files delete" on storage.objects;
create policy "achievements files delete" on storage.objects
  for delete to authenticated using (bucket_id = 'achievements');

-- Isi awal: prestasi hadroh dan LKS (gambarnya sudah ada di situs).
insert into public.achievements (title, note, year, image_url, sort_order)
select v.title, v.note, v.year, v.image_url, v.sort_order
from (values
  ('Terbaik 1 Festival Hadroh BAF (Buahati Annual Fest) tingkat Jabodetabek',
   'Saat kelas 9, bersama Tim Hadroh SMPIT Insan Mandiri Greenville',
   2025, '/prestasi/hadroh-baf-2025.webp', 1),
  ('Lolos LKS sampai tingkat kabupaten, bidang Robot Bergerak Otonom',
   'Mewakili Kab. Subang, LKS 2026',
   2026, '/prestasi/lks-jabar-2026.jpg', 2)
) as v(title, note, year, image_url, sort_order)
where not exists (select 1 from public.achievements);
