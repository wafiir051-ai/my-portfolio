-- Kartu profil di hero (foto, nama, judul, handle, status), dikelola lewat /admin.
-- Jalankan sekali di Supabase: SQL Editor > New query > paste > Run.
-- Aman dijalankan ulang. Foto yang diunggah memakai bucket "achievements"
-- (dari achievements.sql), jadi jalankan file itu lebih dulu.

create table if not exists public.profile_card (
  id integer primary key default 1 check (id = 1),
  name text not null,
  title text not null,
  handle text,
  status text,
  photo_url text,
  updated_at timestamptz not null default now()
);

alter table public.profile_card enable row level security;

drop policy if exists "profile_card read" on public.profile_card;
create policy "profile_card read" on public.profile_card
  for select to anon, authenticated using (true);

drop policy if exists "profile_card insert" on public.profile_card;
create policy "profile_card insert" on public.profile_card
  for insert to authenticated with check (true);

drop policy if exists "profile_card update" on public.profile_card;
create policy "profile_card update" on public.profile_card
  for update to authenticated using (true) with check (true);

-- Isi awal: sama dengan kartu yang tampil sekarang.
insert into public.profile_card (id, name, title, handle, status, photo_url)
values (1, 'Waffir Hasan Alkamiil', 'Full-Stack & IoT Developer', 'wafiir051-ai', 'Terbuka untuk proyek', '/malioboro.jpg')
on conflict (id) do nothing;
