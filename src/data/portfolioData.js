export const portfolioData = {
  developer: {
    name: 'Waffir Hasan Alkamiil',
    age: 16,
    location: 'Subang, Jawa Barat',
    school: 'SMKIT Assyifa Boarding School — Kelas 11',
    role: 'Ketua Tim Robotika Sekolah',
    focus: 'Web · Mobile · IoT',
    email: 'waffir.hasan25@smk.belajar.id',
    whatsapp: 'https://wa.me/6281219135378',
    github: 'https://github.com/wafiir051-ai',
    goding: 'https://www.godingofficial.com/',
    roles: [
      'Full-Stack Developer',
      'Mobile App Developer (Flutter)',
      'IoT & Hardware Engineer'
    ]
  },
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Vite', 'Flutter', 'Tailwind CSS']
    },
    {
      category: 'Backend & Data',
      items: ['Supabase', 'PostgreSQL', 'Node.js', 'Python / FastAPI']
    },
    {
      category: 'Hardware & IoT',
      items: ['ESP32', 'Arduino', 'Sensor Integration', 'Firmware']
    },
    {
      category: 'Tools',
      items: ['Git & GitHub', 'Vercel', 'Figma']
    }
  ],
  projects: [
    {
      id: 1,
      category: 'Website Bisnis',
      title: 'Puspita Indah',
      description: 'Company profile untuk lembaga pelatihan kerja di Gresik — program tata rias, dekorasi, catering, sampai tata busana. Lengkap dengan galeri kegiatan, peta lokasi, dan routing WhatsApp ke beberapa CS sekaligus.',
      tags: ['Client Project', 'Responsive', 'Multi-CS WhatsApp'],
      link_url: 'https://www.puspitaindah.com/',
      link_label: 'Lihat Live'
    },
    {
      id: 2,
      category: 'Learning Platform',
      title: 'EduSpace',
      description: 'LMS untuk SMKIT Assyifa Boarding School — kuis interaktif dengan mode fullscreen anti-cheat, tiga peran pengguna (siswa/guru/admin), dan verifikasi akun via OTP email. Sempat dilombakan di TechnoFest.',
      tags: ['React', 'Supabase', 'Three.js'],
      link_url: 'https://eduspace-5pyozvspd-waffir-hasan-alkamiils-projects.vercel.app/login',
      link_label: 'Lihat Live'
    },
    {
      id: 3,
      category: 'Affiliate Platform',
      title: 'Siroh Partner',
      description: 'Sistem afiliasi resmi Museum Siroh Nabawiyah — tracking referral, kalkulasi komisi otomatis, tier partner berjenjang, dan dashboard terpisah untuk admin & mitra.',
      tags: ['React', 'Supabase', 'Vercel'],
      link_url: 'https://siroh-partner.vercel.app/',
      link_label: 'Lihat Live'
    },
    {
      id: 4,
      category: 'Edukasi Interaktif',
      title: 'Batik Nusantara',
      description: 'Platform edukasi budaya seputar batik Nusantara — animasi & studio membatik 3D, peta persebaran sentra pengrajin, galeri motif per daerah, dan versi dwibahasa (ID/EN).',
      tags: ['3D Web', 'Bilingual', 'Interactive'],
      link_url: 'https://batik-nusantara-01-72sh.vercel.app/Batik%20Nusantara.dc.html',
      link_label: 'Lihat Live'
    },
    {
      id: 5,
      category: 'Mobile App',
      title: 'Wali Santri',
      description: 'Aplikasi Flutter untuk wali santri pondok pesantren — pantau kehadiran, keuangan, pelanggaran, dan izin anak secara real-time, dengan login khusus memakai NIS.',
      tags: ['Flutter', 'Supabase'],
      status_text: 'Dalam pengembangan — segera di Play Store'
    },
    {
      id: 6,
      category: 'IoT + AI',
      title: 'ECG Monitor',
      description: 'Alat pemantau detak jantung berbasis ESP32-S3 dan sensor AD8232 — deteksi denyut otomatis, klasifikasi ritme jantung memakai model AI (9 kondisi), dan pencatatan data real-time.',
      tags: ['ESP32', 'Python / FastAPI', 'Machine Learning'],
      status_text: 'Proyek hardware — firmware standalone'
    },
    {
      id: 7,
      category: 'Web App',
      title: 'SIMAQ',
      description: 'Sistem Informasi Markas Qur\'an — platform untuk mencatat setoran hafalan santri dan menghasilkan rapor tahfidz secara otomatis, memudahkan musyrif/ustadz memantau perkembangan hafalan tiap santri.',
      tags: ['Web App', 'Tahfidz', 'Rapor Otomatis'],
      link_url: 'https://simaq.vercel.app/',
      link_label: 'Lihat Live'
    }
  ],
  services: [
    {
      id: 'web',
      icon: 'globe',
      title: 'Website & Landing Page',
      description: 'Company profile, landing page promosi, sampai toko online sederhana. Desain custom, cepat diakses, enak dilihat dari HP maupun laptop.'
    },
    {
      id: 'app',
      icon: 'layers',
      title: 'Web Application',
      description: 'Sistem custom dengan database — dashboard admin, sistem manajemen internal, atau platform dengan login & role pengguna berbeda-beda.'
    },
    {
      id: 'mobile',
      icon: 'smartphone',
      title: 'Aplikasi Mobile (Flutter)',
      description: 'Aplikasi Android dari desain sampai siap rilis ke Play Store, lengkap dengan integrasi backend dan notifikasi.'
    },
    {
      id: 'iot',
      icon: 'cpu',
      title: 'IoT & Prototipe Hardware',
      description: 'Alat berbasis ESP32/Arduino yang terhubung ke sensor dan dashboard — cocok untuk riset, tugas akhir, lomba, atau produk baru.'
    }
  ],
  botSectionDialogs: {
    top: {
      badge: '⚡ ASTRA BOT • ONLINE',
      text: 'Halo! Selamat datang di portofolio Waffir. Scroll ke bawah yuk! 🚀',
      expr: 'happy'
    },
    tentang: {
      badge: '🤖 INFO DEVELOPER',
      text: 'Waffir adalah developer 16 tahun & Ketua Tim Robotika asal Subang! 🏆',
      expr: 'normal'
    },
    tools: {
      badge: '⚙️ TECH STACK',
      text: 'Kombinasi Web, Mobile (Flutter) & IoT (ESP32) siap pakai! ⚡',
      expr: 'scan'
    },
    proyek: {
      badge: '💻 PROJECT RADAR',
      text: 'Ini dia proyek-proyek live dari client, sekolah & riset IoT! 🌟',
      expr: 'happy'
    },
    layanan: {
      badge: '🛠️ DEV SERVICES',
      text: 'Punya ide website, aplikasi atau alat IoT? Siap bantu garap! 💡',
      expr: 'normal'
    },
    kontak: {
      badge: '📬 CONNECT NOW',
      text: 'Tertarik kerja sama? Kirim pesan via WhatsApp atau Email ya! ✨',
      expr: 'happy'
    }
  },
  botEasterEggs: [
    {
      badge: '⚡ ESP32 + FLUTTER',
      text: 'Kombo maut buat bikin aplikasi terhubung hardware pintar! 🤖',
      expr: 'happy'
    },
    {
      badge: '☕ NGODING NIGHT',
      text: 'Fun fact: Waffir sering eksplor teknologi baru sampai tengah malam! 🌙',
      expr: 'wink'
    },
    {
      badge: '🏆 ROBOTIKA SUBANG',
      text: 'Ketua Tim Robotika di SMKIT Assyifa Boarding School! 🦾',
      expr: 'happy'
    },
    {
      badge: '🚀 READY TO DEPLOY',
      text: 'Website responsif, cepat, & terintegrasi database real-time! ⚡',
      expr: 'scan'
    },
    {
      badge: '✨ TERIMA KASIH',
      text: 'Terima kasih sudah mampir! Yuk klik tombol kontak untuk kolaborasi! 💬',
      expr: 'happy'
    }
  ]
};
