// Data berita simulasi — BUKAN berita resmi, hanya contoh untuk tugas
// Ganti isi paragraf dengan berita nyata sebelum dipublikasikan

const berita = [
  {
    id: "penerimaan-murid-baru-2026",
    judul: "Pendaftaran Murid Baru Tahun Ajaran 2026/2027 Dibuka",
    tanggal: "2 September 2026",
    tanggalISO: "2026-09-02",
    ringkasan:
      "SMAN 1 Pemalang membuka pendaftaran peserta didik baru untuk tahun ajaran 2026/2027. Calon siswa dapat mendaftar secara daring melalui jalur prestasi, zonasi, dan afirmasi.",
    isi: [
      "SMAN 1 Pemalang resmi membuka pendaftaran peserta didik baru (PPDB) untuk tahun ajaran 2026/2027 mulai 2 September 2026. Sekolah menerima calon siswa melalui tiga jalur: prestasi akademik, zonasi, dan afirmasi bagi keluarga kurang mampu.",
      "Pendaftaran dilakukan secara daring melalui portal resmi Dinas Pendidikan Provinsi Jawa Tengah. Calon pendaftar diminta menyiapkan nilai rapor, surat keterangan domisili, dan dokumen pendukung sesuai jalur yang dipilih.",
      "Kuota penerimaan mengikuti ketentuan Permendikbudristek terbaru. Informasi lebih lengkap dapat diperoleh langsung di sekretariat sekolah di Jl. Jend. Gatot Subroto, Pemalang, pada hari kerja pukul 07.00–14.00 WIB. (Data simulasi untuk tugas pemweb)",
    ],
    gambar: "/smansa_foto1.webp",
    kategori: "PPDB",
  },
  {
    id: "upacara-hari-kesaktian-pancasila",
    judul: "Upacara Peringatan Hari Kesaktian Pancasila",
    tanggal: "1 Oktober 2026",
    tanggalISO: "2026-10-01",
    ringkasan:
      "Seluruh warga SMAN 1 Pemalang mengikuti upacara bendera peringatan Hari Kesaktian Pancasila dengan khidmat di lapangan utama sekolah.",
    isi: [
      "Rabu, 1 Oktober 2026 — SMAN 1 Pemalang menyelenggarakan upacara bendera peringatan Hari Kesaktian Pancasila di lapangan utama sekolah. Seluruh guru, tenaga kependidikan, dan siswa hadir dengan mengenakan seragam lengkap.",
      "Kepala sekolah dalam amanatnya menekankan pentingnya nilai-nilai Pancasila sebagai landasan kehidupan berbangsa. Beliau mengajak siswa untuk meneladani semangat para pendiri bangsa dan mengamalkan nilai Pancasila dalam kehidupan sehari-hari.",
      "Upacara berlangsung sekitar 45 menit dan diakhiri dengan doa bersama. Kegiatan ini merupakan bagian dari program penguatan profil pelajar Pancasila yang rutin dilaksanakan sekolah setiap tahun. (Data simulasi untuk tugas pemweb)",
    ],
    gambar: "/smansa_foto2.webp",
    kategori: "Kegiatan",
  },
  {
    id: "pemilihan-ketua-osis",
    judul: "Orasi dan Pemilihan Ketua OSIS Periode Baru",
    tanggal: "6 Oktober 2026",
    tanggalISO: "2026-10-06",
    ringkasan:
      "Tiga pasang calon ketua dan wakil ketua OSIS menyampaikan visi-misi di depan seluruh siswa, dilanjutkan pemilihan langsung secara elektronik.",
    isi: [
      "Senin, 6 Oktober 2026 — SMAN 1 Pemalang menggelar pemilihan ketua OSIS periode 2026/2027. Tiga pasang calon yang telah melewati seleksi berkas dan wawancara mempresentasikan visi dan program kerja di hadapan seluruh siswa di aula sekolah.",
      "Pemilihan dilaksanakan secara langsung menggunakan sistem e-voting yang dikelola tim IT sekolah. Proses berlangsung tertib dengan pengawasan dari dewan guru dan panitia pemilihan yang terdiri dari siswa kelas XI.",
      "Pasangan terpilih akan dilantik dalam waktu dekat dan langsung menjalankan program kerja perdana. Sekolah berharap kepengurusan OSIS baru dapat menjadi wadah pengembangan kepemimpinan dan kreativitas siswa. (Data simulasi untuk tugas pemweb)",
    ],
    gambar: "/smansa_foto3.webp",
    kategori: "OSIS",
  },
  {
    id: "juara-olimpiade-sains",
    judul: "Siswa SMAN 1 Pemalang Raih Juara Olimpiade Sains",
    tanggal: "20 September 2026",
    tanggalISO: "2026-09-20",
    ringkasan:
      "Dua siswa SMAN 1 Pemalang meraih juara di ajang Olimpiade Sains Nasional tingkat provinsi bidang Kimia dan Komputer.",
    isi: [
      "Sabtu, 20 September 2026 — SMAN 1 Pemalang kembali menorehkan prestasi di bidang akademik. Dua siswanya berhasil meraih juara dalam Olimpiade Sains Nasional (OSN) tingkat provinsi yang diselenggarakan di Semarang.",
      "Bidang Kimia dan Komputer menjadi andalan sekolah tahun ini. Kedua siswa akan mewakili Jawa Tengah di babak nasional yang rencananya digelar November 2026. Mereka telah menjalani pembinaan intensif selama beberapa bulan di bawah pendampingan guru mata pelajaran dan alumni.",
      "Kepala sekolah menyampaikan apresiasi kepada siswa dan pembimbing, serta berharap prestasi ini mendorong semangat siswa lain untuk aktif berkompetisi. (Data simulasi, prestasi detail belum terverifikasi)",
    ],
    gambar: "/smansa_foto2.webp",
    kategori: "Prestasi",
  },
  {
    id: "lomba-basket-antar-sma",
    judul: "Tim Basket Putra Lolos Semifinal Lomba Antar SMA",
    tanggal: "12 September 2026",
    tanggalISO: "2026-09-12",
    ringkasan:
      "Tim basket putra SMAN 1 Pemalang lolos ke babak semifinal turnamen basket antar SMA se-Kabupaten Pemalang setelah memenangi dua laga penyisihan.",
    isi: [
      "Jumat, 12 September 2026 — Tim basket putra SMAN 1 Pemalang berhasil lolos ke babak semifinal turnamen basket antar SMA se-Kabupaten Pemalang. Mereka menyelesaikan babak penyisihan dengan dua kemenangan dari dua pertandingan.",
      "Di laga penentu penyisihan, tim unggul 58–43 atas SMA Muhammadiyah 1 Pemalang. Pelatih tim menyebut kekompakan dan stamina sebagai kunci kemenangan. Beberapa pemain kunci merupakan siswa kelas X yang baru bergabung musim ini.",
      "Semifinal dijadwalkan pada pekan depan. Seluruh siswa dan warga sekolah diundang untuk memberikan dukungan langsung di lapangan pertandingan. (Data simulasi untuk tugas pemweb)",
    ],
    gambar: "/smansa_foto3.webp",
    kategori: "Olahraga",
  },
  {
    id: "pentas-seni-dan-budaya",
    judul: "Pentas Seni dan Budaya Akhir Semester",
    tanggal: "28 Agustus 2026",
    tanggalISO: "2026-08-28",
    ringkasan:
      "Ratusan siswa tampil dalam pentas seni akhir semester: tari tradisional, musik, teater, hingga pameran karya visual dari berbagai kelas.",
    isi: [
      "Kamis, 28 Agustus 2026 — SMAN 1 Pemalang menyelenggarakan Pentas Seni dan Budaya Akhir Semester di lapangan utama dan aula sekolah. Kegiatan ini menampilkan karya siswa dari berbagai ekstrakurikuler seni yang aktif sepanjang semester.",
      "Rangkaian penampilan meliputi tari tradisional Jawa, pertunjukan musik akustik, teater pendek bertema lingkungan, serta pameran lukisan dan karya desain dari kelas seni. Antusiasme penonton sangat tinggi, termasuk wali murid yang hadir menyaksikan.",
      "Pentas seni ini merupakan bagian dari jalur pembinaan karakter 'olah rasa' yang menjadi salah satu dari empat jalur ekstrakurikuler unggulan sekolah, di samping olah hati, olah pikir, dan olah raga. (Data simulasi untuk tugas pemweb)",
    ],
    gambar: "/smansa_foto1.webp",
    kategori: "Seni",
  },
];

export default berita;
