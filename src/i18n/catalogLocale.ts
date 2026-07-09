import type { FieldId } from '../data/sinaptikCatalog'

/** Indonesian translations for catalog content (fields, programs, modules, mentors). */
export const catalogId = {
  programComplete: 'Program selesai',

  fields: {
    'data-analytics': {
      name: 'Analitik Data',
      description:
        'Python, SQL, visualisasi, dan studi kasus industri untuk calon analis data.',
    },
    leadership: {
      name: 'Kepemimpinan & Manajemen',
      description: 'Bangun keterampilan kepemimpinan untuk tim teknologi dan pertumbuhan organisasi.',
    },
    'software-engineering': {
      name: 'Rekayasa Perangkat Lunak',
      description: 'Pengembangan full-stack, desain sistem, dan praktik terbaik rekayasa.',
    },
    'product-management': {
      name: 'Manajemen Produk',
      description: 'Penemuan produk, perencanaan roadmap, dan memberikan nilai kepada pengguna.',
    },
    'artificial-intelligence': {
      name: 'Kecerdasan Buatan',
      description: 'Machine learning, aplikasi LLM, dan alur kerja berbantuan AI.',
    },
    'digital-marketing': {
      name: 'Pemasaran Digital',
      description: 'SEO, iklan berbayar, strategi konten, dan growth marketing untuk produk digital.',
    },
    'finance-business': {
      name: 'Keuangan & Analitik Bisnis',
      description: 'Pemodelan keuangan, business intelligence, dan pengambilan keputusan berbasis data.',
    },
    'ui-ux-design': {
      name: 'Desain UI/UX',
      description: 'Riset pengguna, desain antarmuka, dan prototyping untuk aplikasi web dan mobile.',
    },
  } satisfies Record<FieldId, { name: string; description: string }>,

  programs: {
    'bootcamp-da': {
      name: 'Bootcamp Analitik Data',
      description:
        'Program intensif 12 minggu untuk siap kerja. Python, SQL, visualisasi, dan kasus industri nyata.',
      activeCohortName: 'Bootcamp Analitik Data — Batch 7 (2026)',
    },
    'bootcamp-ds-5': {
      name: 'Ilmu Data — Batch 5 (2026)',
      description:
        'Program ilmu data terapan mencakup pengumpulan, pembersihan, pemodelan, dan deployment.',
      activeCohortName: 'Ilmu Data — Batch 5 (2026)',
    },
    'kelas-sql': {
      name: 'SQL untuk Analis Data',
      description: 'Tulis kueri SQL untuk mengekstrak, menggabungkan, dan menganalisis data bisnis.',
    },
    'kelas-viz': {
      name: 'Visualisasi Data & Storytelling',
      description: 'Buat grafik dan dashboard yang jelas untuk mengomunikasikan insight.',
    },
    'leadership-essentials': {
      name: 'Dasar-dasar Kepemimpinan',
      description: 'Keterampilan kepemimpinan inti untuk pemimpin teknologi dan team lead.',
      activeCohortName: 'Dasar-dasar Kepemimpinan — Batch 3 (2026)',
    },
    'leadership-advanced': {
      name: 'Kepemimpinan Strategis',
      description: 'Perencanaan strategis, desain organisasi, dan penskalaan tim.',
    },
    'se-bootcamp': {
      name: 'Bootcamp Rekayasa Perangkat Lunak',
      description: 'Dasar-dasar full-stack dari standar coding hingga deployment.',
    },
    'se-system-design': {
      name: 'Masterclass Desain Sistem',
      description: 'Merancang sistem yang skalabel untuk aplikasi bertrafik tinggi.',
    },
    'pm-fundamentals': {
      name: 'Dasar-dasar Manajemen Produk',
      description: 'Pelajari siklus hidup produk dari penemuan hingga peluncuran.',
    },
    'pm-advanced': {
      name: 'Strategi Produk Lanjutan',
      description: 'Metrik pertumbuhan, eksperimen, dan product-led growth.',
    },
    'ai-bootcamp': {
      name: 'Bootcamp AI & Machine Learning',
      description: 'Bangun model ML dan deploy solusi AI untuk masalah bisnis nyata.',
    },
    'ai-llm': {
      name: 'Workshop Aplikasi LLM',
      description: 'Bangun aplikasi dengan large language model dan pipeline RAG.',
    },
    'kelas-ai': {
      name: 'Analisis Data Berbantuan AI (PandasAI)',
      description: 'Analisis data secara konversasional menggunakan PandasAI — spesialisasi Sinaptik.',
    },
    'dm-fundamentals': {
      name: 'Dasar-dasar Pemasaran Digital',
      description: 'Dasar SEO, strategi media sosial, dan content marketing untuk startup.',
    },
    'dm-growth': {
      name: 'Masterclass Growth Marketing',
      description: 'Akuisisi berbayar, optimasi konversi, dan eksperimen pertumbuhan.',
    },
    'finance-modeling': {
      name: 'Pemodelan Keuangan untuk Analis',
      description: 'Bangun model Excel/Sheets untuk peramalan, valuasi, dan analisis skenario.',
    },
    'business-intelligence': {
      name: 'Business Intelligence & Pelaporan',
      description: 'Rancang dashboard KPI dan laporan eksekutif untuk pemangku kepentingan bisnis.',
    },
    'ux-fundamentals': {
      name: 'Dasar-dasar Desain UX',
      description: 'Riset pengguna, wireframing, dan usability testing untuk produk digital.',
    },
    'ux-advanced': {
      name: 'Sistem Desain UI Lanjutan',
      description: 'Buat design system, komponen, dan handoff yang skalabel untuk tim engineering.',
    },
  } as Record<string, { name: string; description: string; activeCohortName?: string }>,

  modules: {
    mod1: 'Modul 1: Python untuk Data',
    mod2: 'Modul 2: SQL & Basis Data',
    mod3: 'Modul 3: Pandas & EDA',
    mod4: 'Modul 4: Pembersihan & Pengolahan Data',
    mod5: 'Modul 5: Visualisasi Data',
    mod6: 'Modul 6: Dasar-dasar Machine Learning',
    ds1: 'Modul 1: Dasar-dasar Python',
    ds2: 'Modul 2: Statistik untuk Ilmu Data',
    ds3: 'Modul 3: Pandas & EDA',
    ds4: 'Modul 4: Pengumpulan & Pembersihan Data',
    ds5: 'Modul 5: Feature Engineering',
    ds6: 'Modul 6: Pembangunan Model',
    s1: 'Dasar-dasar SQL & filtering',
    s2: 'JOIN & agregasi',
    s3: 'Window functions & CTE',
    v1: 'Matplotlib & Seaborn',
    v2: 'Dasar-dasar dashboard',
    v3: 'Menyajikan insight',
    le1: 'Mindset kepemimpinan',
    le2: 'Komunikasi efektif',
    le3: 'Motivasi tim',
    le4: 'Resolusi konflik',
    la1: 'Visi & strategi',
    la2: 'OKR & penetapan tujuan',
    la3: 'Manajemen perubahan',
    se1: 'Dasar-dasar pemrograman',
    se2: 'Pengembangan web',
    se3: 'API & basis data',
    se4: 'Testing & CI/CD',
    se5: 'Praktik code review',
    sd1: 'Pola arsitektur',
    sd2: 'Skalabilitas & keandalan',
    sd3: 'Studi kasus',
    pm1: 'Penemuan produk',
    pm2: 'Riset pengguna',
    pm3: 'Perencanaan roadmap',
    pm4: 'Manajemen pemangku kepentingan',
    pa1: 'Metrik & KPI',
    pa2: 'A/B testing',
    pa3: 'Strategi go-to-market',
    ai1: 'Dasar-dasar ML',
    ai2: 'Supervised learning',
    ai3: 'Pengenalan deep learning',
    ai4: 'Deployment model',
    llm1: 'Konsep LLM',
    llm2: 'Prompt engineering',
    llm3: 'RAG & agents',
    pai1: 'LLM untuk data',
    pai2: 'Alur kerja PandasAI',
    dm1: 'Marketing funnel & persona',
    dm2: 'SEO & strategi konten',
    dm3: 'Media sosial & komunitas',
    dm4: 'Analitik & atribusi',
    dg1: 'Iklan berbayar (Meta & Google)',
    dg2: 'Optimasi landing page',
    dg3: 'A/B testing kampanye',
    fm1: 'Laporan keuangan',
    fm2: 'Peramalan pendapatan',
    fm3: 'Dasar-dasar DCF & valuasi',
    fm4: 'Analisis skenario & sensitivitas',
    bi1: 'Desain KPI',
    bi2: 'Storytelling dashboard',
    bi3: 'Presentasi untuk pemangku kepentingan',
    ux1: 'Design thinking',
    ux2: 'Metode riset pengguna',
    ux3: 'Wireframing & prototyping',
    ux4: 'Usability testing',
    ua1: 'Design tokens & komponen',
    ua2: 'Aksesibilitas (WCAG)',
    ua3: 'Handoff Figma & spesifikasi',
  } as Record<string, string>,

  mentorTitles: {
    m1: 'Kepemimpinan & Manajemen',
    m2: 'Rekayasa Perangkat Lunak',
    m3: 'Manajemen Produk',
    m4: 'Kecerdasan Buatan',
    m5: 'Visualisasi Data',
    m6: 'SQL & Basis Data',
    m7: 'Pemasaran Digital',
    m8: 'Keuangan & Analitik Bisnis',
    m9: 'Desain UI/UX',
  } as Record<string, string>,
}
