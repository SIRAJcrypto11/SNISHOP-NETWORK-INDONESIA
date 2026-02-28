const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const BLOG_DIR = path.join(__dirname, 'blog');
const MAIN_CSS = '../css/styles.css';

// --- DATA SOURCE (24 Articles: 19 Services + 5 ERP Modules) ---
const services = [
    // 1. ERP SNISHOP (The Hub) - PARENT
    {
        name: "SNISHOP ERP: Platform Bisnis All-in-One",
        slug: "erp-snishop",
        category: "Business",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png",
        shortDesc: "Sistem manajemen bisnis terintegrasi untuk efisiensi maksimal.",
        intro: "SNISHOP ERP adalah solusi Enterprise Resource Planning (ERP) berbasis cloud yang dirancang khusus untuk UMKM dan perusahaan berkembang di Indonesia. Mengintegrasikan keuangan, stok, SDM, dan penjualan dalam satu dashboard.",
        problem: "Bisnis seringkali terhambat oleh data yang terpisah-pisah (silo), laporan keuangan manual yang rawan error, dan stok barang yang tidak akurat.",
        solution: "SNISHOP ERP menyatukan seluruh operasional bisnis Anda. Dari kasir di toko hingga laporan laba rugi di meja direksi, semua terhubung secara real-time.",
        features: [
            "Financial Dashboard Real-time",
            "Multi-Warehouse Inventory Management",
            "Integrated POS (Point of Sales)",
            "HRM & Payroll Otomatis",
            "CRM & Sales Analysis"
        ],
        ctaLink: "https://snishop.base44.app/",
        ctaText: "Coba SNISHOP ERP Gratis",
        keywords: "aplikasi erp indonesia, software erp umkm, sistem manajemen bisnis, erp murah, aplikasi stok barang dan keuangan",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 2. ERP Modul Keuangan (New Spoke)
    {
        name: "SNISHOP ERP: Modul Keuangan & Akuntansi",
        slug: "erp-keuangan",
        category: "Business",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8a46ff438_logo.png", // Reusing relevant image or general ERP image
        shortDesc: "Laporan keuangan otomatis tanpa ribet.",
        intro: "Lupakan spreadsheet manual yang memusingkan. Modul Keuangan SNISHOP ERP mencatat setiap transaksi secara otomatis dan menghasilkan laporan akuntansi standar (Neraca, Laba Rugi, Arus Kas) dalam hitungan detik.",
        problem: "Kesalahan pencatatan manual sering menyebabkan kebocoran keuangan dan kesulitan dalam audit pajak.",
        solution: "Otomatisasi pembukuan dengan SNISHOP ERP. Integrasi langsung dengan modul Kasir dan Pembelian memastikan setiap sen tercatat akurat.",
        features: [
            "Neraca & Laba Rugi Otomatis",
            "Manajemen Hutang Piutang",
            "Rekonsiliasi Bank",
            "Multi-Currency Support",
            "Audit Trail Lengkap"
        ],
        ctaLink: "https://snishop.base44.app/",
        ctaText: "Pelajari Modul Keuangan",
        keywords: "aplikasi pembukuan usaha, software akuntansi umkm, laporan keuangan otomatis, aplikasi neraca lajur",
        schemaType: "SoftwareApplication",
        price: "0",
        parentService: "erp-snishop"
    },
    // 3. ERP Modul Inventory (New Spoke)
    {
        name: "SNISHOP ERP: Manajemen Stok & Inventaris",
        slug: "erp-inventory",
        category: "Business",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png",
        shortDesc: "Kontrol stok multi-gudang secara real-time.",
        intro: "Kehabisan stok saat permintaan tinggi adalah mimpi buruk ritel. Modul Inventory SNISHOP ERP memberikan visibilitas total atas stok Anda di semua cabang dan gudang.",
        problem: "Stok opname yang memakan waktu lama, selisih stok (shrinkage), dan over-stocking barang yang tidak laku.",
        solution: "Sistem manajemen inventaris pintar dengan notifikasi low-stock otomatis, transfer antar gudang, dan analisis perputaran stok (turnover).",
        features: [
            "Multi-Warehouse & Multi-Branch",
            "Barcode & QR Code Scanning",
            "Stock Opname Digital",
            "Automated Low Stock Alerts",
            "Batch & Expiry Date Tracking"
        ],
        ctaLink: "https://snishop.base44.app/",
        ctaText: "Kelola Stok Sekarang",
        keywords: "aplikasi stok gudang, manajemen inventory, software gudang, aplikasi stok barang android",
        schemaType: "SoftwareApplication",
        price: "0",
        parentService: "erp-snishop"
    },
    // 4. ERP Modul POS (New Spoke) - Also relates to KasirinAI
    {
        name: "SNISHOP ERP: Point of Sale (POS) Terintegrasi",
        slug: "erp-pos",
        category: "Retail",
        image: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png",
        shortDesc: "Kasir toko terhubung langsung ke pembukuan.",
        intro: "Ubah tablet atau HP Anda menjadi mesin kasir canggih. SNISHOP POS bukan sekadar alat terima uang, tapi gerbang data penjualan yang langsung terhubung ke sistem ERP pusat.",
        problem: "Rekap penjualan harian yang lambat dan sering tidak cocok dengan uang di laci.",
        solution: "Transaksi cepat, support offline-mode, dan sinkronisasi otomatis ke modul keuangan saat online. Cetak struk atau kirim via WhatsApp.",
        features: [
            "Support Scanner Barcode & Printer Bluetooth",
            "Manajemen Shift Kasir",
            "Diskon & Promosi Fleksibel",
            "Pembayaran QRIS & E-Wallet",
            "Laporan Penjualan per Outlet"
        ],
        ctaLink: "https://snishop.base44.app/",
        ctaText: "Download POS Gratis",
        keywords: "aplikasi kasir toko, sistem pos cloud, kasir android gratis, software toko baju",
        schemaType: "SoftwareApplication",
        price: "0",
        parentService: "erp-snishop"
    },
    // 5. ERP Modul HR & Payroll (New Spoke)
    {
        name: "SNISHOP ERP: HRM & Payroll System",
        slug: "erp-hr",
        category: "Business",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png",
        shortDesc: "Kelola karyawan dan gaji secara otomatis.",
        intro: "Karyawan adalah aset terbesar bisnis. Kelola data, absensi, cuti, dan penggajian mereka dengan sistem HRM yang modern dan transparan.",
        problem: "Hitung gaji manual yang rawan salah, rekap absen kertas, dan pengajuan cuti yang ribet.",
        solution: "Portal karyawan mandiri untuk absen dan slip gaji digital. HR bisa memproses payroll bulanan hanya dengan beberapa klik.",
        features: [
            "Absensi GPS Geotagging",
            "Hitung PPh 21 & BPJS Otomatis",
            "Slip Gaji Digital (PDF/Email)",
            "Manajemen Cuti & Izin",
            "KPI & Performance Review"
        ],
        ctaLink: "https://snishop.base44.app/",
        ctaText: "Coba Payroll System",
        keywords: "aplikasi payroll indonesia, sistem hris, aplikasi absensi online, software penggajian",
        schemaType: "SoftwareApplication",
        price: "0",
        parentService: "erp-snishop"
    },
    // 6. ERP Modul CRM (New Spoke)
    {
        name: "SNISHOP ERP: CRM & Loyalty Program",
        slug: "erp-crm",
        category: "Business",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png",
        shortDesc: "Ubah pelanggan biasa menjadi pelanggan setia.",
        intro: "Mendapatkan pelanggan baru itu mahal. Pertahankan mereka dengan sistem Customer Relationship Management (CRM) yang powerful dari SNISHOP.",
        problem: "Tidak tahu siapa pelanggan setia, kehilangan kontak database pelanggan, dan promosi yang tidak tertarget.",
        solution: "Database pelanggan terpusat, riwayat belanja lengkap, dan fitur membership/loyalty point yang terintegrasi dengan POS.",
        features: [
            "Database Pelanggan Terpusat",
            "Loyalty Points & Rewards",
            "Email & WhatsApp Marketing Blast",
            "Analisis Perilaku Pelanggan",
            "Voucher & Kupon Digital"
        ],
        ctaLink: "https://snishop.base44.app/",
        ctaText: "Tingkatkan Retensi Pelanggan",
        keywords: "aplikasi crm indonesia, customer loyalty program, software membership, manajemen pelanggan",
        schemaType: "SoftwareApplication",
        price: "0",
        parentService: "erp-snishop"
    },
    // 7. Todoit AI
    {
        name: "TODOIT AI: Asisten Produktivitas Cerdas",
        slug: "todoit-ai",
        category: "Productivity",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688a42916670b89e7b51038c/de7e35572_logo.png",
        shortDesc: "Lebih dari sekadar to-do list.",
        intro: "TODOIT AI menggabungkan manajemen tugas (Task Management) dengan kecerdasan buatan untuk membantu Anda menyelesaikan lebih banyak hal dengan lebih sedikit stres.",
        problem: "Deadline terlewat, tugas menumpuk tanpa prioritas, dan kelelahan mental akibat multitasking.",
        solution: "AI yang membantu memecah tugas besar menjadi langkah-langkah kecil, menyarankan prioritas, dan mengingatkan Anda di waktu yang tepat.",
        features: [
            "AI Task Breakdown",
            "Smart Reminders & Scheduling",
            "Integrasi Kalender",
            "Gamification (Level & Badges)",
            "Voice Input"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20Todoit%20AI",
        ctaText: "Coba Todoit AI",
        keywords: "aplikasi to do list ai, manajemen tugas otomatis, asisten pribadi virtual",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 8. Cek Turnitin
    {
        name: "Cek Plagiasi Turnitin (No Repository)",
        slug: "cek-turnitin",
        category: "Edukasi",
        image: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png",
        shortDesc: "Cek plagiasi aman, hasil akurat, privasi terjaga.",
        intro: "Layanan cek plagiasi Turnitin No-Repository memastikan karya tulis Anda diperiksa dengan database global Turnitin tanpa disimpan, sehingga aman untuk pengecekan ulang di kampus.",
        problem: "Takut tulisan terdeteksi plagiat self-plagiarism karena pernah dicek sebelumnya, atau biaya cek Turnitin yang mahal.",
        solution: "Akun Instructor No-Repository menjamin file Anda tidak masuk database Turnitin. Hasil keluar dalam hitungan menit.",
        features: [
            "No Repository (Aman 100%)",
            "Hasil Cepat (5-10 Menit)",
            "Full Report PDF",
            "Bisa Cek Berulang-ulang",
            "Support 24 Jam"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Halo%20Admin,%20saya%20mau%20cek%20Turnitin",
        ctaText: "Cek Plagiasi Sekarang",
        keywords: "jasa cek turnitin murah, cek plagiasi no repository, cara lolos turnitin, cek turnitin 24 jam",
        schemaType: "Service",
        price: "5000"
    },
    // 9. BudgyAI
    {
        name: "BudgyAI: Manajer Keuangan Pribadi",
        slug: "budgy-ai",
        category: "Finance",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/cae5a7a92_logo.png",
        shortDesc: "Atur gaji anti boncos dengan AI.",
        intro: "BudgyAI membantu Anda melacak pengeluaran, menetapkan anggaran, dan menabung untuk tujuan impian dengan saran yang dipersonalisasi oleh AI.",
        problem: "Uang gaji lewat begitu saja, tidak tahu kemana perginya uang, dan sulit menabung.",
        solution: "Pelacak pengeluaran otomatis (scan struk), kategori budget pintar, dan insight keuangan mingguan.",
        features: [
            "Scan Struk Belanja (OCR)",
            "Budgeting Planner",
            "Simulasi Tabungan",
            "Laporan Keuangan Bulanan",
            "Multi-Wallet Support"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20BudgyAI",
        ctaText: "Download BudgyAI",
        keywords: "aplikasi pengatur keuangan, cara mengatur gaji, aplikasi catat pengeluaran, money manager ai",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 10. FormEase
    {
        name: "FormEase: Form Builder Professional",
        slug: "form-ease",
        category: "Tools",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/e4985649a_logo.png",
        shortDesc: "Buat form online cantik dalam detik.",
        intro: "Alternatif Google Form yang lebih estetik dan powerful. Cocok untuk pendaftaran event, survei pelanggan, atau order form toko online.",
        problem: "Tampilan Google Form yang membosankan dan fitur yang terbatas untuk branding bisnis.",
        solution: "Drag-and-drop form builder dengan tema custom, logika percabangan (conditional logic), dan integrasi pembayaran.",
        features: [
            "Custom Branding & Domain",
            "Terima Pembayaran (Payment Gateway)",
            "Export Data ke Excel/Google Sheets",
            "Conditional Logic",
            "Email Notification"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20FormEase",
        ctaText: "Buat Form Gratis",
        keywords: "membuat form online, alternatif google form pro, aplikasi survei online, form order whatsapp",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 11. AutoInvoice
    {
        name: "AutoInvoice: Kirim Tagihan Profesional",
        slug: "auto-invoice",
        category: "Business",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/50941d487_logo.png",
        shortDesc: "Generator invoice kilat untuk freelancer.",
        intro: "Buat dan kirim invoice profesional dalam hitungan detik. Lacak status pembayaran dari 'Terkirim' hingga 'Lunas' dengan mudah.",
        problem: "Invoice manual di Word/Excel yang membuang waktu dan terlihat tidak profesional.",
        solution: "Template invoice siap pakai, pengingat jatuh tempo otomatis, dan link pembayaran online.",
        features: [
            "Template Profesional",
            "Reminder Jatuh Tempo",
            "Multi-Mata Uang",
            "Download PDF & Share WA",
            "Rekap Pendapatan Bulanan"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20AutoInvoice",
        ctaText: "Buat Invoice Sekarang",
        keywords: "contoh invoice jasa, aplikasi pembuat invoice, cara menagih klien, invoice generator indonesia",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 12. StudeeAI
    {
        name: "StudeeAI: Tutor Privat dalam Saku",
        slug: "studee-ai",
        category: "Edukasi",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/45029a465_logo.png",
        shortDesc: "Bantu kerjakan PR dan jelaskan materi.",
        intro: "Kesulitan dengan matematika atau fisika? StudeeAI memberikan penjelasan langkah demi langkah, bukan hanya jawaban akhir.",
        problem: "Siswa kesulitan memahami materi di sekolah dan tidak memiliki mentor belajar di rumah.",
        solution: "Tanya jawab materi pelajaran 24/7 dengan AI yang dilatih khusus untuk kurikulum pendidikan.",
        features: [
            "Penyelesaian Soal Matematika (Photo Math)",
            "Penjelasan Konsep Sains",
            "Translator Bahasa Asing",
            "Generator Ringkasan Materi",
            "Quiz & Latihan Soal"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20StudeeAI",
        ctaText: "Mulai Belajar",
        keywords: "aplikasi belajar ai, jawaban soal matematika, tutor online gratis, bantuan pr sekolah",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 13. VoiceScribe
    {
        name: "VoiceScribe: Speech-to-Text Akurat",
        slug: "voice-scribe",
        category: "Productivity",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68bba57a36470263178ec522/c8c4dc720_logo.png",
        shortDesc: "Transkripsi rekaman rapat & kuliah otomatis.",
        intro: "Hemat waktu mencatat. VoiceScribe mengubah rekaman audio menjadi teks yang rapi dan dapat diedit dalam berbagai bahasa.",
        problem: "Mencatat notulen rapat atau materi dosen secara manual sangat melelahkan dan sering ada poin yang terlewat.",
        solution: "Teknologi AI Speech Recognition yang mengenali berbagai aksen dan pembicara.",
        features: [
            "Support Bahasa Indonesia & Inggris",
            "Speaker Identification (Siapa Bicara Apa)",
            "Export ke Word/PDF",
            "Highlight Poin Penting",
            "Unlimited Duration"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20VoiceScribe",
        ctaText: "Transkrip Sekarang",
        keywords: "aplikasi transkrip suara ke teks, cara notulen rapat otomatis, speech to text indonesia",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 14. TaskDay
    {
        name: "TaskDay: Fokus Hari Ini",
        slug: "task-day",
        category: "Productivity",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d7e4cdddd_logo.png",
        shortDesc: "To-do list minimalis untuk orang sibuk.",
        intro: "Aplikasi manajemen tugas yang stripping down fitur tidak perlu. Fokus hanya pada apa yang harus selesai hari ini.",
        problem: "Aplikasi to-do list yang terlalu rumit justru membuat malas mencatat tugas.",
        solution: "Desain super simpel, satu daftar untuk satu hari, dan reset otomatis setiap pagi.",
        features: [
            "Daily Reset",
            "Dark Mode",
            "Drag & Drop Priority",
            "Widget Home Screen",
            "No Distraction Mode"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20TaskDay",
        ctaText: "Mulai Fokus",
        keywords: "aplikasi to do list simpel, daily planner app, cara meningkatkan fokus kerja",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 15. KasirinAI
    {
        name: "KasirinAI: Solusi POS UMKM",
        slug: "kasirin-ai",
        category: "Retail",
        image: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png",
        shortDesc: "Aplikasi kasir gratis selamanya.",
        intro: "KasirinAI adalah aplikasi kasir (POS) yang didesain khusus untuk warung, cafe, dan toko kelontong. Gratis, ringan, dan mudah digunakan.",
        problem: "Mesin kasir mahal dan software POS berlangganan memberatkan biaya operasional UMKM kecil.",
        solution: "Aplikasi Android gratis dengan fitur dasar lengkap: catat penjualan, stok, dan laporan harian.",
        features: [
            "Tanpa Biaya Langganan",
            "Bisa Offline",
            "Cetak Struk Bluetooth",
            "Laporan Excel",
            "Manajemen Produk Mudah"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20KasirinAI",
        ctaText: "Download KasirinAI",
        keywords: "aplikasi kasir warung gratis, software toko kelontong, program kasir android terbaik",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 16. FineEase
    {
        name: "FineEase: Financial Ease",
        slug: "fine-ease",
        category: "Finance",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8a46ff438_logo.png",
        shortDesc: "Kalkulator finansial & kpr pintar.",
        intro: "Bantu Anda menghitung cicilan KPR, kredit kendaraan, dan perencanaan dana pensiun dengan akurat.",
        problem: "Rumus keuangan yang rumit membuat orang salah mengambil keputusan kredit.",
        solution: "Kumpulan kalkulator finansial dalam satu aplikasi yang mudah dipahami.",
        features: [
            "Simulasi KPR & KKB",
            "Kalkulator Dana Darurat",
            "Analisis Rasio Hutang",
            "Tips Keuangan Harian",
            "Bandingkan Bunga Bank"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20FineEase",
        ctaText: "Hitung Cicilan",
        keywords: "kalkulator kpr rumah, simulasi kredit mobil, cara menghitung bunga bank",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 17. CatatanID
    {
        name: "CatatanID: Secure Notes",
        slug: "catatan-id",
        category: "Productivity",
        image: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png",
        shortDesc: "Catatan terenkripsi & password protected.",
        intro: "Simpan password, PIN, ide rahasia, dan jurnal pribadi Anda dengan keamanan tingkat tinggi.",
        problem: "Mencatat hal sensitif di aplikasi note biasa berisiko terbaca orang lain.",
        solution: "Enkripsi end-to-end dan kunci biometrik (fingerprint/wajah) untuk setiap catatan.",
        features: [
            "AES-256 Encryption",
            "Biometric Lock",
            "Cloud Backup (Encrypted)",
            "Organisasi Folder",
            "Rich Text Editor"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20CatatanID",
        ctaText: "Amankan Catatan",
        keywords: "aplikasi catatan rahasia, password manager aman, secure notes app android",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 18. TeamMath
    {
        name: "TeamMath: Belajar Matematika Seru",
        slug: "team-math",
        category: "Edukasi",
        image: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png",
        shortDesc: "Game edukasi matematika multiplayer.",
        intro: "Belajar matematika jadi menyenangkan dengan kompetisi dan tantangan bersama teman.",
        problem: "Anak-anak sering merasa matematika itu membosankan dan menakutkan.",
        solution: "Gamifikasi pelajaran matematika dengan sistem level, avatar, dan duel otak real-time.",
        features: [
            "Duel Matematika Online",
            "Latihan Soal Harian",
            "Leaderboard Global",
            "Materi SD-SMA",
            "Mode Offline"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20TeamMath",
        ctaText: "Main Sekarang",
        keywords: "game matematika anak, aplikasi belajar math seru, lomba matematika online",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 19. PPOB SNISHOP
    {
        name: "PPOB SNISHOP: Bisnis Pulsa & Tagihan",
        slug: "ppob-snishop",
        category: "Payment",
        image: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png",
        shortDesc: "Agen kuota & pembayaran termurah.",
        intro: "Mulai bisnis agen pulsa dan pembayaran tagihan dengan modal kecil. Harga termurah, transaksi 24 jam.",
        problem: "Ingin usaha sampingan tapi modal terbatas dan bingung mulai dari mana.",
        solution: "Platform PPOB terlengkap: Pulsa, Paket Data, Token PLN, PDAM, BPJS, hingga Topup E-Wallet.",
        features: [
            "Harga Distributor",
            "Transaksi Cepat (Detik)",
            "Laporan Transaksi Lengkap",
            "Cetak Struk Bluetooth",
            "CS Responsif"
        ],
        ctaLink: "https://snishop.base44.app/",
        ctaText: "Daftar Agen Gratis",
        keywords: "agen pulsa termurah, aplikasi ppob terbaik, bisnis modal kecil untung besar, cara jual pulsa",
        schemaType: "Service",
        price: "0"
    },
    // 20. TopUp Games
    {
        name: "TopUp Games: Voucher Game Murah",
        slug: "topup-games",
        category: "Entertainment",
        image: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png",
        shortDesc: "Topup Diamond ML, FF, PUBG legal & aman.",
        intro: "Pusat topup game terlengkap dan termurah di Indonesia. Proses instan, 100% legal, dan aman.",
        problem: "Takut kena tipu saat beli item game atau akun kena ban karena topup ilegal.",
        solution: "Mitra resmi berbagai publisher game. Garansi uang kembali jika diamond tidak masuk.",
        features: [
            "Mobile Legends, Free Fire, PUBG",
            "Genshin Impact, Valorant",
            "Metode Bayar Lengkap (QRIS, VA, Pulsa)",
            "Proses 1-3 Detik",
            "Layanan 24 Jam"
        ],
        ctaLink: "https://snishop.id/games",
        ctaText: "Top Up Sekarang",
        keywords: "top up ml murah, beli diamond ff, voucher game online, tempat topup aman",
        schemaType: "Service",
        price: "0"
    },
    // 21. Sninonton
    {
        name: "Sninonton: Streaming Film & Series",
        slug: "sninonton",
        category: "Entertainment",
        image: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png",
        shortDesc: "Akses ribuan konten hiburan premium.",
        intro: "Platform streaming film, series, dan anime dengan kualitas HD dan subtitle Indonesia lengkap.",
        problem: "Langganan banyak platform streaming bikin boros.",
        solution: "Satu akses untuk berbagai konten hiburan pilihan dengan harga terjangkau.",
        features: [
            "Kualitas HD & 4K",
            "Subtitle Indonesia",
            "Update Tepat Waktu",
            "Request Film",
            "Tanpa Iklan Mengganggu"
        ],
        ctaLink: "https://snishop.id/nonton",
        ctaText: "Nonton Sekarang",
        keywords: "situs nonton film online, streaming sub indo, aplikasi nonton hemat",
        schemaType: "Service",
        price: "25000"
    },
    // 22. Snidesain
    {
        name: "Snidesain: Jasa Desain Grafis",
        slug: "snidesain",
        category: "Services",
        image: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png",
        shortDesc: "Desain logo, sosmed, & banner profesional.",
        intro: "Butuh desain bagus tapi tidak bisa pakai Photoshop? Serahkan pada tim desainer profesional Snidesain.",
        problem: "Branding bisnis terlihat amatir karena desain asal-asalan.",
        solution: "Jasa desain on-demand dengan revisi sepuasnya sampai cocok. Harga UMKM, kualitas agensi.",
        features: [
            "Desain Logo & Identitas Brand",
            "Konten Instagram/TikTok",
            "Banner & Spanduk",
            "Company Profile",
            "Revisi Unlimited"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Halo%20saya%20mau%20order%20desain",
        ctaText: "Pesan Desain",
        keywords: "jasa desain logo murah, buat feed instagram, jasa desain grafis online",
        schemaType: "Service",
        price: "50000"
    },
    // 23. Snijadwalin
    {
        name: "Snijadwalin: Booking System",
        slug: "snijadwalin",
        category: "Productivity",
        image: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png",
        shortDesc: "Sistem reservasi & janji temu online.",
        intro: "Kelola jadwal konsultasi, meeting, atau layanan jasa Anda dengan sistem booking otomatis.",
        problem: "Chat whatsapp berantakan karena klien tanya jadwal kosong terus-menerus.",
        solution: "Halaman booking online dimana klien bisa pilih waktu sendiri sesuai ketersediaan Anda.",
        features: [
            "Sync Google Calendar",
            "Reminder WhatsApp Otomatis",
            "Payment Gateway Integration",
            "Custom Booking Form",
            "Zoom Integration"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Info%20Snijadwalin",
        ctaText: "Buat Jadwal",
        keywords: "aplikasi booking online, sistem reservasi barbershop, jadwal temu dokter",
        schemaType: "SoftwareApplication",
        price: "0"
    },
    // 24. Bangunweb
    {
        name: "Bangunweb: Jasa Pembuatan Website",
        slug: "bangunweb",
        category: "Services",
        image: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png",
        shortDesc: "Bikin website terima jadi, cepat & murah.",
        intro: "Miliki website profesional untuk bisnis Anda tanpa perlu mengerti coding. Terima beres, cepat, dan SEO friendly.",
        problem: "Biaya jasa pembuatan website agency mahal dan prosesnya lama.",
        solution: "Paket pembuatan website all-in-one (Domain + Hosting + Desain) dengan harga bersahabat.",
        features: [
            "Gratis Domain .COM",
            "Hosting Cepat & Aman",
            "Desain Premium Responsif",
            "SEO Basic Setup",
            "Garansi Maintenance"
        ],
        ctaLink: "https://wa.me/6285185151356?text=Halo%20saya%20mau%20bikin%20website",
        ctaText: "Konsultasi Website",
        keywords: "jasa buat website murah, bikin landing page, jasa web toko online",
        schemaType: "Service",
        price: "500000"
    }
];

// --- HELPER FUNCTIONS ---

// 1. Generate Schema JSON-LD
const generateSchema = (service) => {
    let schema = {};

    if (service.schemaType === 'SoftwareApplication') {
        schema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": service.name,
            "operatingSystem": "Web, Android, iOS",
            "applicationCategory": service.category,
            "offers": {
                "@type": "Offer",
                "price": service.price || "0",
                "priceCurrency": "IDR"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1250"
            },
            "description": service.shortDesc,
            "author": {
                "@type": "Organization",
                "name": "SNISHOP.ID",
                "url": "https://snishop.id"
            }
        };
    } else if (service.schemaType === 'Service') {
        schema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.name,
            "serviceType": service.category,
            "provider": {
                "@type": "Organization",
                "name": "SNISHOP.ID",
                "url": "https://snishop.id"
            },
            "description": service.shortDesc,
            "offers": {
                "@type": "Offer",
                "price": service.price || "0",
                "priceCurrency": "IDR"
            }
        };
    } else {
        // Default Article Schema
        schema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": service.name,
            "image": service.image,
            "author": {
                "@type": "Organization",
                "name": "SNISHOP.ID"
            },
            "publisher": {
                "@type": "Organization",
                "name": "SNISHOP.ID",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://i.ibb.co.com/MGVPZtv/20230722-162429.png"
                }
            },
            "datePublished": new Date().toISOString(),
            "description": service.shortDesc
        };
    }

    return JSON.stringify(schema, null, 2);
};

// 2. Generate Related Articles
const generateRelatedArticles = (currentService, allServices) => {
    // Filter services in the same category, excluding current
    const related = allServices.filter(s =>
        (s.category === currentService.category || s.parentService === currentService.slug) &&
        s.slug !== currentService.slug
    ).slice(0, 3); // Max 3 articles

    if (related.length === 0) return '';

    const listItems = related.map(s => `
        <li>
            <a href="${s.slug}.html" class="related-link">
                <strong>${s.name}</strong><br>
                <span style="font-size: 0.9em; color: #666;">${s.shortDesc}</span>
            </a>
        </li>
    `).join('');

    return `
        <div class="related-articles-box" style="margin-top: 40px; background: #f8f9fa; padding: 25px; border-radius: 12px; border-left: 4px solid var(--primary-color);">
            <h3 style="margin-top: 0; margin-bottom: 15px;">Pelajari Juga:</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
                ${listItems}
            </ul>
        </div>
    `;
};

// --- HTML TEMPLATE GENERATOR ---
const generateHTML = (service, allServices) => {
    const schemaJson = generateSchema(service);
    const relatedHtml = generateRelatedArticles(service, allServices);
    const ctaLinkPrimary = service.ctaLink || "https://wa.me/6285185151356";
    const ctaTextPrimary = service.ctaText || "Hubungi Kami";

    return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${service.name} - Review & Fitur Lengkap 2026 | SNISHOP.ID Blog</title>
    <meta name="description" content="Review lengkap ${service.name}: ${service.shortDesc} Pelajari fitur, manfaat, dan cara menggunakannya untuk bisnis Anda.">
    <meta name="keywords" content="${service.keywords || ''}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${service.name} - SNISHOP.ID">
    <meta property="og:description" content="${service.shortDesc}">
    <meta property="og:image" content="${service.image}">
    <meta property="og:type" content="article">
    
    <!-- Styles -->
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    ${schemaJson}
    </script>
    
    <style>
        .article-header { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 60px 0 40px; text-align: center; border-bottom: 1px solid #dee2e6; }
        .article-container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .article-img { width: 100%; max-height: 400px; object-fit: cover; border-radius: 16px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .content h2 { margin-top: 40px; margin-bottom: 20px; color: var(--text-primary); font-size: 1.8rem; }
        .content p { font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 20px; }
        .content ul { list-style: none; padding: 0; margin-bottom: 30px; }
        .content ul li { padding: 12px 0; border-bottom: 1px solid #eee; display: flex; align-items: start; gap: 10px; font-size: 1.05rem; }
        .content ul li::before { content: '✅'; font-size: 1.2rem; }
        .cta-box { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; padding: 40px; border-radius: 20px; text-align: center; margin-top: 60px; box-shadow: 0 20px 40px rgba(37, 99, 235, 0.2); }
        .cta-box h3 { color: white; margin-bottom: 15px; font-size: 2rem; }
        .cta-box p { color: rgba(255,255,255,0.9); margin-bottom: 30px; font-size: 1.2rem; }
        .btn-light { background: white; color: var(--primary-color); border: none; font-weight: 700; padding: 15px 40px; font-size: 1.1rem; border-radius: 50px; transition: all 0.3s; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .btn-light:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .related-link { display: block; padding: 10px; border-radius: 8px; text-decoration: none; color: var(--primary-color); transition: background 0.2s; }
        .related-link:hover { background: rgba(37, 99, 235, 0.05); }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-inner">
                <a href="../index.html" class="logo"><img src="https://i.ibb.co.com/MGVPZtv/20230722-162429.png" alt="SNISHOP.ID"></a>
                <nav class="nav">
                    <a href="../index.html" class="nav-link">Beranda</a>
                    <a href="index.html" class="nav-link active">Blog</a>
                </nav>
            </div>
        </div>
    </header>

    <header class="article-header">
        <div class="container">
            <span class="badge" style="background: var(--primary-color); color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; margin-bottom: 15px; display: inline-block;">${service.category}</span>
            <h1 style="max-width: 800px; margin: 0 auto; line-height: 1.3;">${service.name}</h1>
            <p style="margin-top: 15px; opacity: 0.7;">Dipublikasikan oleh Tim SNISHOP.ID Editorial</p>
        </div>
    </header>

    <div class="article-container content">
        <img src="${service.image}" alt="${service.name}" class="article-img" onerror="this.src='https://i.ibb.co.com/MGVPZtv/20230722-162429.png'">

        <p class="lead" style="font-size: 1.35rem; font-weight: 500; color: var(--text-primary); margin-bottom: 40px;">${service.intro}</p>

        <!-- Dynamic Related Articles (Top) -->
        ${relatedHtml}

        <h2 id="masalah">Mengapa Anda Butuh Solusi Ini?</h2>
        <p>${service.problem}</p>

        <h2 id="solusi">Solusi: ${service.name}</h2>
        <p>${service.solution} Dengan teknologi berbasis cloud yang aman dan user-friendly, aplikasi ini dirancang untuk memudahkan operasional bisnis Anda dari mana saja.</p>

        <h2 id="fitur">Fitur Unggulan</h2>
        <ul>
            ${service.features.map(f => `<li><strong>${f}</strong></li>`).join('')}
        </ul>

        <div class="info-box" style="background: #eef2ff; padding: 25px; border-radius: 12px; border: 1px solid #dbeafe; margin: 30px 0;">
            <h3 style="margin-top:0; font-size: 1.4rem; color: var(--primary-color);"><i class="fas fa-info-circle"></i> Harga & Penawaran</h3>
            <p style="margin-bottom: 0;">Layanan ini tersedia dengan harga: <strong>${service.price === "0" ? "GRATIS (Versi Dasar)" : "Mulai Rp " + parseInt(service.price).toLocaleString('id-ID')}</strong>. Dapatkan akses penuh sekarang juga.</p>
        </div>

        <h2 id="kesimpulan">Kesimpulan</h2>
        <p>Jika Anda mencari solusi <strong>${service.keywords.split(',')[0]}</strong> yang handal, <strong>${service.name}</strong> adalah investasi terbaik untuk masa depan bisnis Anda.</p>

        <!-- CTA Section -->
        <div class="cta-box">
            <h3>Siap Menggunakan ${service.name}?</h3>
            <p>Klik tombol di bawah untuk mencoba atau konsultasi gratis.</p>
            <a href="${ctaLinkPrimary}" class="btn btn-light btn-lg" target="_blank">${ctaTextPrimary} <i class="fas fa-arrow-right"></i></a>
        </div>
        
        <!-- Bottom Related Articles (Recap) -->
        ${relatedHtml ? '<hr style="margin: 60px 0; border: 0; border-top: 1px solid #eee;">' + relatedHtml.replace('margin-top: 40px', 'margin-top: 0') : ''}

    </div>

    <!-- FAQ Logic Placeholder -->
    <!-- Ideally added dynamically if data exists -->

    <footer class="footer bg-dark-blue text-white" style="padding: 60px 0; text-align: center; margin-top: 60px;">
        <div class="container">
            <div style="margin-bottom: 30px;">
                <a href="../index.html" style="color: white; text-decoration: none; font-weight: bold; font-size: 1.5rem;">SNISHOP.ID</a>
                <p style="opacity: 0.7; margin-top: 10px;">Platform Digital Terpercaya untuk Bisnis Anda</p>
            </div>
            <p>&copy; 2026 SNISHOP.ID. All rights reserved.</p>
        </div>
    </footer>

    <script src="../js/main.js"></script>
</body>
</html>`;
};

// --- INDEX PAGE GENERATOR ---
const generateIndexHTML = (services) => {
    // Generate cards with category labels
    const cards = services.map(service => `
            <!-- ${service.name} -->
            <div class="article-card fade-in">
                <div class="article-img">
                    <img src="${service.image}" alt="${service.name}" onerror="this.src='https://i.ibb.co.com/MGVPZtv/20230722-162429.png'">
                </div>
                <div class="article-content">
                    <span class="article-tag">${service.category}</span>
                    <h3 class="article-title"><a href="${service.slug}.html">${service.name}</a></h3>
                    <p class="article-excerpt">${service.shortDesc}</p>
                    <a href="${service.slug}.html" class="read-more">Baca Selengkapnya <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>`).join('');

    return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog & Artikel - SNISHOP.ID Ecosystem</title>
    <meta name="description" content="Kumpulan artikel mendalam tentang ekosistem SNISHOP.ID, mulai dari ERP, Kasir, Absensi, hingga layanan digital AI.">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .blog-header { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; padding: 120px 0 60px; text-align: center; }
        .blog-grid { margin-top: -50px; margin-bottom: 80px; }
        .article-card { background: white; border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 100%; display: flex; flex-direction: column; }
        .article-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
        .article-img { height: 200px; overflow: hidden; background: #f0f2f5; display: flex; align-items: center; justify-content: center; }
        .article-img img { width: 100%; height: 100%; object-fit: cover; }
        .article-content { padding: 24px; flex-grow: 1; display: flex; flex-direction: column; }
        .article-tag { display: inline-block; padding: 4px 12px; background: var(--bg-surface); color: var(--primary-color); border-radius: 20px; font-size: 0.8rem; font-weight: 600; margin-bottom: 12px; }
        .article-title { font-size: 1.25rem; margin-bottom: 12px; line-height: 1.4; }
        .article-title a { color: var(--text-primary); text-decoration: none; }
        .article-excerpt { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px; flex-grow: 1; }
        .read-more { color: var(--primary-color); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-inner">
                <a href="../index.html" class="logo"><img src="https://i.ibb.co.com/MGVPZtv/20230722-162429.png" alt="SNISHOP.ID"></a>
                <nav class="nav">
                    <a href="../index.html" class="nav-link">Kembali ke Beranda</a>
                </nav>
            </div>
        </div>
    </header>
    <div class="blog-header">
        <div class="container">
            <h1 class="fade-in">Pusat Informasi & Edukasi</h1>
            <p class="fade-in" style="opacity: 0.9;">Pelajari cara memaksimalkan bisnis Anda dengan ekosistem digital SNISHOP.ID</p>
        </div>
    </div>
    <div class="container">
        <div class="grid grid-3 blog-grid">
            ${cards}
        </div>
    </div>
    <div class="container mb-5 text-center">
         <h3>Belum menemukan yang Anda cari?</h3>
         <a href="https://wa.me/6285185151356" class="btn btn-primary mt-3">Hubungi Tim Support Kami</a>
    </div>
    <footer class="footer bg-dark-blue text-white" style="padding: 40px 0; text-align: center;">
        <div class="container"><p>&copy; 2026 SNISHOP.ID. All rights reserved.</p></div>
    </footer>
    <script src="../js/main.js"></script>
</body>
</html>`;
};

// --- EXECUTION ---
const main = () => {
    // Ensure dir exists
    if (!fs.existsSync(BLOG_DIR)) {
        fs.mkdirSync(BLOG_DIR);
    }

    // Generate Article Pages
    services.forEach(service => {
        const html = generateHTML(service, services); // Pass all services for related logic
        fs.writeFileSync(path.join(BLOG_DIR, `${service.slug}.html`), html);
        console.log(`Generated: ${service.slug}.html`);
    });

    // Generate Index Page
    const indexHtml = generateIndexHTML(services);
    fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), indexHtml);
    console.log('Generated: blog/index.html');
};

main();
