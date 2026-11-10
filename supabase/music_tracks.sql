-- Daftar lagu latar (pemutar di bilah atas), dikelola lewat /admin.
-- Jalankan sekali di Supabase: SQL Editor > New query > paste > Run.
-- Aman dijalankan ulang: tabel dan isi awal tidak digandakan.

create table if not exists public.music_tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text,
  youtube_id text not null,
  start_seconds integer not null default 0 check (start_seconds >= 0),
  sort_order integer not null default 999,
  created_at timestamptz not null default now()
);

alter table public.music_tracks enable row level security;

drop policy if exists "music_tracks read" on public.music_tracks;
create policy "music_tracks read" on public.music_tracks
  for select to anon, authenticated using (true);

drop policy if exists "music_tracks insert" on public.music_tracks;
create policy "music_tracks insert" on public.music_tracks
  for insert to authenticated with check (true);

drop policy if exists "music_tracks update" on public.music_tracks;
create policy "music_tracks update" on public.music_tracks
  for update to authenticated using (true) with check (true);

drop policy if exists "music_tracks delete" on public.music_tracks;
create policy "music_tracks delete" on public.music_tracks
  for delete to authenticated using (true);

-- Isi awal: tiga lagu yang diputar sekarang. Hanya diisi kalau tabel masih kosong.
insert into public.music_tracks (title, artist, youtube_id, start_seconds, sort_order)
select v.title, v.artist, v.youtube_id, v.start_seconds, v.sort_order
from (values
  ('Sepanjang Hidup', 'Maher Zain, cover Maros Al Aswa', 'zA4dYHcLGDk', 117, 1),
  ('Gandrung Nabi (Tombo Ati)', 'MbahPur Media', 'rgCDQeOr_9Y', 0, 2),
  ('Ya Rasulallah Qolby Yuhibbak', 'Cover Ashabul Fatroh, Al Mustahibbin', 'a1fiDmzlV7c', 0, 3)
) as v(title, artist, youtube_id, start_seconds, sort_order)
where not exists (select 1 from public.music_tracks);
