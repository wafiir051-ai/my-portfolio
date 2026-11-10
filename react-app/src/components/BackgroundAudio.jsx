import { useCallback, useEffect, useRef, useState } from 'react'
import ElasticSlider from './reactbits/ElasticSlider/ElasticSlider'
import { fetchMusicTracks } from '../lib/projectsApi'

// Pemutar musik latar: pemutar resmi YouTube (IFrame Player API) dengan kontrol
// di bilah atas. Pemutar disiapkan sejak halaman dibuka, tapi musik baru diputar
// setelah layar pembuka selesai memuat (peristiwa "wha:play"). Klik "Masuk" di
// layar pembuka (peristiwa "wha:enter") adalah interaksi yang membuka izin suara
// dari browser. Kalau suara tetap ditolak, musik berjalan tanpa suara lalu
// dinyalakan pada interaksi berikutnya.
// Daftar bawaan; dipakai kalau tabel music_tracks kosong atau belum dibuat.
const DEFAULT_TRACKS = [
  { id: 'zA4dYHcLGDk', title: 'Sepanjang Hidup', artist: 'Maher Zain, cover Maros Al Aswa', start: 117 },
  { id: 'rgCDQeOr_9Y', title: 'Gandrung Nabi (Tombo Ati)', artist: 'MbahPur Media' },
  { id: 'a1fiDmzlV7c', title: 'Ya Rasulallah Qolby Yuhibbak', artist: 'Cover Ashabul Fatroh, Al Mustahibbin' },
]
const VOLUME = 60

let apiPromise
function loadApi() {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve(window.YT)
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve(window.YT)
    }
    const s = document.createElement('script')
    s.src = 'https://www.youtube.com/iframe_api'
    s.async = true
    document.head.appendChild(s)
  })
  return apiPromise
}

const fmt = (s) => {
  const t = Math.max(0, Math.floor(s || 0))
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`
}

const Svg = ({ children, size = 18, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)
const I = {
  play: <path d="M7 4.5v15l12-7.5z" />,
  pause: (
    <>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </>
  ),
  prev: (
    <>
      <path d="M19 5L9 12l10 7z" />
      <path d="M5 5v14" />
    </>
  ),
  next: (
    <>
      <path d="M5 5l10 7-10 7z" />
      <path d="M19 5v14" />
    </>
  ),
  volLow: <path d="M4 9v6h4l5 4V5L8 9z" />,
  volHigh: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9z" />
      <path d="M16.5 8.5a5 5 0 010 7M19 6a9 9 0 010 12" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9.5v5l4.5-2.5z" />
    </>
  ),
  down: <path d="M6 9l6 6 6-6" />,
  up: <path d="M6 15l6-6 6 6" />,
  note: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),
}

export default function BackgroundAudio() {
  const frameRef = useRef(null)
  const tracksRef = useRef(DEFAULT_TRACKS)
  const autoMutedRef = useRef(false)
  const playerRef = useRef(null)
  const startedRef = useRef(false)
  const volumeRef = useRef(VOLUME)
  const seekingRef = useRef(false)
  const playerReadyRef = useRef(false)
  const lastIndexRef = useRef(-1)
  const wantPlayRef = useRef(false)
  const enteredRef = useRef(false)
  const userPausedRef = useRef(false)
  const [started, setStarted] = useState(false)
  const [autoMuted, setAutoMuted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(VOLUME)
  const [index, setIndex] = useState(0)
  const [tracks, setTracks] = useState(DEFAULT_TRACKS)
  const [pos, setPos] = useState(0)
  const [dur, setDur] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const unmuteNow = () => {
    const p = playerRef.current
    if (!p || !p.unMute) return
    autoMutedRef.current = false
    setAutoMuted(false)
    if (volumeRef.current > 0) {
      p.unMute()
      p.setVolume(volumeRef.current)
    }
  }

  // Kalau browser tetap menolak suara: putar tanpa suara dulu (diizinkan browser),
  // lalu nyalakan suaranya pada interaksi berikutnya.
  const fallbackMuted = () => {
    const p = playerRef.current
    if (!p || !p.mute || userPausedRef.current) return
    p.mute()
    p.playVideo()
    autoMutedRef.current = true
    setAutoMuted(true)
  }

  // Mulai memutar daftar lagu dari awal. Dipanggil setelah pemuatan selesai.
  const doPlay = () => {
    const p = playerRef.current
    if (!p || !p.loadPlaylist) return
    userPausedRef.current = false
    const list = tracksRef.current
    p.loadPlaylist({ playlist: list.map((t) => t.id), index: 0, startSeconds: list[0].start })
    p.setLoop(true)
    unmuteNow()
    // Belum jalan setelah 1,8 detik berarti browser menolak suara.
    setTimeout(() => {
      if (playerRef.current && p.getPlayerState && p.getPlayerState() !== 1 && !document.hidden) fallbackMuted()
    }, 1800)
  }

  const start = useCallback(async () => {
    if (startedRef.current) return
    startedRef.current = true
    setStarted(true)
    // Daftar lagu dari admin; kalau lambat atau gagal dalam 3 detik, pakai daftar bawaan.
    const rows = await Promise.race([
      fetchMusicTracks().catch(() => null),
      new Promise((resolve) => setTimeout(() => resolve(null), 3000)),
    ])
    if (rows) {
      tracksRef.current = rows
      setTracks(rows)
    }
    const YT = await loadApi()
    if (!frameRef.current) return
    playerRef.current = new YT.Player(frameRef.current, {
      events: {
        onReady: (e) => {
          e.target.setVolume(volumeRef.current)
          // Disiapkan saja; baru diputar setelah pemuatan selesai (peristiwa "wha:play").
          const list = tracksRef.current
          e.target.cuePlaylist({ playlist: list.map((t) => t.id), index: 0, startSeconds: list[0].start })
          e.target.setLoop(true)
          playerReadyRef.current = true
          if (wantPlayRef.current) doPlay()
        },
        onAutoplayBlocked: () => fallbackMuted(),
        onStateChange: (e) => {
          setPlaying(e.data === 1)
          const i = e.target.getPlaylistIndex?.()
          if (typeof i === 'number' && i >= 0) {
            setIndex(i)
            // Tiap lagu mulai dari detik yang diatur di admin, juga saat berpindah lewat tombol
            // atau saat daftar berulang.
            const startAt = tracksRef.current[i]?.start || 0
            if (e.data === 1 && lastIndexRef.current !== i && startAt) {
              if ((e.target.getCurrentTime?.() || 0) < startAt - 3) e.target.seekTo(startAt, true)
            }
            if (e.data === 1) lastIndexRef.current = i
          }
        },
        // Video yang gagal diputar dilewati ke berikutnya.
        onError: (e) => e.target.nextVideo(),
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Pemutar disiapkan sejak halaman dibuka, tapi belum memutar apa pun.
    start()
    // Interaksi berikutnya menyalakan suara kalau musik berjalan tanpa suara.
    const events = ['pointerdown', 'mousedown', 'click', 'touchstart', 'touchend', 'keydown']
    const handler = (e) => {
      const t = e.target
      if (t && t.closest && t.closest('.mp__btn--main')) return
      if (autoMutedRef.current) unmuteNow()
    }
    events.forEach((ev) => window.addEventListener(ev, handler, { passive: true }))
    // Klik "Masuk": cukup membuka izin suara dari browser (belum memutar).
    const onEnter = () => {
      enteredRef.current = true
    }
    // Pemuatan selesai: mulai memutar dengan suara.
    const onPlay = () => {
      wantPlayRef.current = true
      if (playerReadyRef.current) doPlay()
    }
    window.addEventListener('wha:enter', onEnter)
    window.addEventListener('wha:play', onPlay)
    // Lagu tetap jalan saat tab ditinggalkan. Kalau browser (biasanya di HP) menjeda
    // sendiri di latar belakang, lanjutkan lagi begitu tab dibuka, kecuali pengguna
    // memang menjedanya.
    const onVisibility = () => {
      const p = playerRef.current
      if (!p || !p.getPlayerState || document.hidden) return
      if (!userPausedRef.current && wantPlayRef.current && p.getPlayerState() === 2) p.playVideo()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handler))
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('wha:enter', onEnter)
      window.removeEventListener('wha:play', onPlay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])

  // Popover ditutup dengan klik di luar atau Esc.
  useEffect(() => {
    if (!expanded) return
    const onDown = (e) => {
      if (!e.target.closest?.('.mp')) setExpanded(false)
    }
    const onKey = (e) => e.key === 'Escape' && setExpanded(false)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [expanded])

  // Posisi dan durasi diperbarui tiap setengah detik selagi dikendalikan musik.
  useEffect(() => {
    if (!started) return
    const t = setInterval(() => {
      const p = playerRef.current
      if (!p || !p.getCurrentTime || seekingRef.current) return
      setPos(p.getCurrentTime() || 0)
      setDur(p.getDuration() || 0)
    }, 500)
    return () => clearInterval(t)
  }, [started])

  const toggle = () => {
    const p = playerRef.current
    if (!startedRef.current || !p || !p.getPlayerState) return start()
    if (autoMutedRef.current && playing) return unmuteNow()
    if (playing) {
      userPausedRef.current = true
      p.pauseVideo()
    } else {
      userPausedRef.current = false
      if (!wantPlayRef.current) wantPlayRef.current = true
      p.playVideo()
    }
    if (autoMutedRef.current) unmuteNow()
  }
  const prev = () => playerRef.current?.previousVideo?.()
  const next = () => playerRef.current?.nextVideo?.()
  const changeVolume = (v) => {
    const value = Math.round(v)
    volumeRef.current = value
    setVolume(value)
    const p = playerRef.current
    if (!p || !p.setVolume) return
    if (value === 0) p.mute()
    else {
      if (p.isMuted?.()) p.unMute()
      p.setVolume(value)
    }
    autoMutedRef.current = false
    setAutoMuted(false)
  }
  const dragSeek = (v) => {
    seekingRef.current = true
    setPos(v)
  }
  const endSeek = (v) => {
    playerRef.current?.seekTo?.(v, true)
    setPos(v)
    setTimeout(() => (seekingRef.current = false), 400)
  }

  const track = tracks[index] || tracks[0]
  const art = started ? (
    <img className="mp__art" src={`https://i.ytimg.com/vi/${track.id}/hqdefault.jpg`} alt="" width="120" height="120" draggable="false" />
  ) : (
    <span className="mp__art mp__art--empty"><Svg size={22}>{I.note}</Svg></span>
  )
  const status = autoMuted && playing ? 'Ketuk untuk suara' : playing ? 'Sedang diputar' : started ? 'Dijeda' : 'Musik latar'

  return (
    <div className={`mp ${expanded ? 'is-open' : ''}`} role="group" aria-label="Pemutar musik latar">
      <div className="mp__pill">
        <button type="button" className="mp__btn mp__btn--main mp__btn--sm" onClick={toggle} aria-label={playing ? 'Jeda musik' : 'Putar musik'}>
          <Svg size={16} fill>{playing ? I.pause : I.play}</Svg>
        </button>
        <button type="button" className="mp__open" onClick={() => setExpanded((o) => !o)} aria-expanded={expanded} aria-label={expanded ? 'Tutup pemutar' : 'Buka pemutar'}>
          <span className={`mp__eq ${playing ? 'is-on' : ''}`} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="mp__pilltext">
            <small>{status}</small>
            <span>{started ? track.title : 'Musik latar'}</span>
          </span>
          <Svg size={16}>{expanded ? I.up : I.down}</Svg>
        </button>
      </div>

      {autoMuted && playing && !expanded && (
        <button type="button" className="mp__hint" onClick={unmuteNow}>
          Klik di sini untuk menyalakan suara
        </button>
      )}

      <div className="mp__pop" aria-hidden={!expanded}>
        <section className="mp__card">
          <div className="mp__top">
            {art}
            <div className="mp__meta">
              <div className="mp__head">
                <div className="mp__titles">
                  <h2 className="mp__title">{track.title}</h2>
                  <p className="mp__artist">{track.artist}</p>
                </div>
                <div className="mp__tools">
                  <button type="button" className="mp__icon" onClick={() => setShowVideo((v) => !v)} aria-label={showVideo ? 'Sembunyikan video' : 'Tampilkan video'} aria-pressed={showVideo} disabled={!started} tabIndex={expanded ? 0 : -1}>
                    <Svg size={16}>{I.video}</Svg>
                  </button>
                </div>
              </div>
              <div className="mp__progress">
                <ElasticSlider
                  value={Math.min(pos, dur || pos)}
                  maxValue={dur || 1}
                  onChange={dragSeek}
                  onChangeEnd={endSeek}
                  valuePosition="none"
                  leftIcon={null}
                  rightIcon={null}
                  ariaLabel="Posisi lagu"
                  disabled={!started || !dur}
                  thickness={4}
                  activeThickness={9}
                  maxStretch={18}
                  restOpacity={0.9}
                  rangeColor="#eef3ef"
                  trackColor="rgba(238, 243, 239, 0.16)"
                />
                <div className="mp__times">
                  <span>{fmt(pos)}</span>
                  <span>-{fmt((dur || 0) - pos)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mp__controls">
            <button type="button" className="mp__btn" onClick={prev} aria-label="Lagu sebelumnya" disabled={!started} tabIndex={expanded ? 0 : -1}>
              <Svg size={22} fill>{I.prev}</Svg>
            </button>
            <button type="button" className="mp__btn mp__btn--main" onClick={toggle} aria-label={playing ? 'Jeda musik' : 'Putar musik'} tabIndex={expanded ? 0 : -1}>
              <Svg size={24} fill>{playing ? I.pause : I.play}</Svg>
            </button>
            <button type="button" className="mp__btn" onClick={next} aria-label="Lagu berikutnya" disabled={!started} tabIndex={expanded ? 0 : -1}>
              <Svg size={22} fill>{I.next}</Svg>
            </button>
            <div className="mp__vol">
              <ElasticSlider
                value={volume}
                maxValue={100}
                onChange={changeVolume}
                valuePosition="none"
                ariaLabel="Volume musik"
                disabled={!started}
                thickness={4}
                activeThickness={9}
                maxStretch={20}
                restOpacity={0.9}
                rangeColor="#eef3ef"
                trackColor="rgba(238, 243, 239, 0.16)"
                iconColor="#9fb5ab"
                leftIcon={<Svg size={18}>{I.volLow}</Svg>}
                rightIcon={<Svg size={18}>{I.volHigh}</Svg>}
              />
            </div>
          </div>
        </section>

        <div className={`mp__video ${showVideo ? 'is-open' : ''}`}>
          <iframe
            ref={frameRef}
            title="Pemutar musik latar"
            width="200"
            height="200"
            src={`https://www.youtube.com/embed/${DEFAULT_TRACKS[0].id}?enablejsapi=1&controls=0&disablekb=1&fs=0&playsinline=1&rel=0&iv_load_policy=3&origin=${encodeURIComponent(window.location.origin)}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  )
}
