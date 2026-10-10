import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiExternalLink,
  FiCheck,
  FiAward,
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiShield,
  FiCompass,
  FiNavigation,
} from "react-icons/fi";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import sekolah from "@/data/sekolah";

export const metadata = {
  title: "Profil Sekolah — SMA Negeri 1 Pemalang",
  description:
    "Profil resmi, sejarah, visi, misi, data identitas, fasilitas, peta lokasi, dan media sosial SMA Negeri 1 Pemalang — NPSN 20324216, Akreditasi A, berdiri sejak 1963.",
};

// Data identitas untuk tabel
const identitas = [
  { label: "Nama Sekolah", nilai: sekolah.nama },
  { label: "NPSN", nilai: sekolah.npsn },
  { label: "Status Sekolah", nilai: sekolah.status },
  {
    label: "Akreditasi",
    nilai: `${sekolah.akreditasi} (Nilai ${sekolah.nilaiAkreditasi}, ${sekolah.tahunAkreditasi})`,
  },
  { label: "Kepala Sekolah", nilai: sekolah.kepalaSekolah },
  { label: "Kurikulum", nilai: sekolah.kurikulum },
  { label: "SK Pendirian", nilai: sekolah.skPendirian },
  { label: "Website Resmi", nilai: sekolah.website },
];

// Misi sekolah (sesuai PRD)
const misi = [
  "Menjaga keutuhan NKRI.",
  "Menumbuhkan pengamalan agama warga sekolah sesuai agama masing-masing.",
  "Membekali siswa dengan budi pekerti luhur sesuai nilai bangsa.",
  "Memberdayakan potensi siswa di IPTEKS, imtaq, serta kecerdasan sosial dan emosional.",
  "Meningkatkan prestasi siswa supaya mampu bersaing secara global.",
];

// Empat jalur ekstrakurikuler
const ekskul = [
  {
    jalur: "Olah Hati",
    contoh: "Rohis, PMR, Paskibra",
    ikon: FiShield,
    warna: "bg-rose-50 text-rose-600 border-rose-200",
    badge: "Spiritual & Karakter",
  },
  {
    jalur: "Olah Pikir",
    contoh: "KIR, Olimpiade Sains, Debat Bahasa",
    ikon: FiBookOpen,
    warna: "bg-blue-50 text-blue-600 border-blue-200",
    badge: "Akademik & Sains",
  },
  {
    jalur: "Olah Raga",
    contoh: "Basket, Voli, Karate, Renang",
    ikon: FiAward,
    warna: "bg-emerald-50 text-emerald-600 border-emerald-200",
    badge: "Stamina & Fisik",
  },
  {
    jalur: "Olah Rasa",
    contoh: "Seni Tari, Musik, Teater, Desain",
    ikon: FiCompass,
    warna: "bg-amber-50 text-amber-600 border-amber-200",
    badge: "Seni & Budaya",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Header Banner ── */}
      <section className="bg-[#b3e5fc] pt-[150px] pb-20 px-4 sm:px-6 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 uppercase tracking-tight text-white drop-shadow-[3px_3px_0px_#0284c7]">
            SMA NEGERI 1 PEMALANG
          </h1>
          <p className="text-[#0f3756] max-w-2xl mx-auto text-lg sm:text-xl font-bold leading-relaxed">
            {sekolah.slogan}
          </p>
        </div>

        {/* Wave Divider Transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none translate-y-1">
          <svg
            className="relative block w-full h-[40px] sm:h-[60px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C320,110 520,10 720,70 C920,120 1120,20 1440,65 L1440,120 L0,120 Z"
              fill="#fff"
            ></path>
          </svg>
        </div>
      </section>

      {/* ── 2. Sejarah dengan Double Wrapper ── */}
      <section className="py-20 px-4 sm:px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Outer Blue Wrapper */}
          <div className="bg-[#b3e5fc] border-[12px] border-[#81d4fa] p-4 sm:p-6 md:p-8 rounded-xl shadow-[0_10px_30px_rgba(3,105,161,0.2)]">
            {/* Inner Yellow Wrapper */}
            <div className="bg-[#fff9c4] border-[6px] border-[#fde047] p-8 sm:p-10 md:p-12 rounded-xl flex flex-col items-center gap-8 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-50 pointer-events-none"></div>

              <div className="relative z-10 w-full">
                <h2 className="text-3xl sm:text-4xl font-black text-orange-600 mb-6 drop-shadow-[2px_2px_0px_#fff] text-center">
                  Sejarah <span className="text-orange-500">SMANSA</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-3xl mx-auto">
                  <div className="bg-white p-4 rounded-[2rem] border border-orange-100 text-center shadow-lg shadow-orange-500/10 hover:-translate-y-1 transition-all">
                    <span className="text-3xl font-black text-orange-500 block mb-1">1963</span>
                    <span className="text-sm text-gray-600 font-bold">Resmi Berdiri</span>
                  </div>
                  <div className="bg-white p-4 rounded-[2rem] border border-orange-100 text-center shadow-lg shadow-orange-500/10 hover:-translate-y-1 transition-all">
                    <span className="text-3xl font-black text-orange-500 block mb-1">2016</span>
                    <span className="text-sm text-gray-600 font-bold">SMA Rujukan</span>
                  </div>
                  <div className="bg-white p-4 rounded-[2rem] border border-orange-100 text-center shadow-lg shadow-orange-500/10 hover:-translate-y-1 transition-all">
                    <span className="text-3xl font-black text-orange-500 block mb-1">96 / A</span>
                    <span className="text-sm text-gray-600 font-bold">Akreditasi BAN-S/M</span>
                  </div>
                </div>

                <div className="space-y-4 text-gray-800 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-4xl mx-auto text-justify">
                  <p>
                    SMA Negeri 1 Pemalang resmi berdiri berdasarkan Surat Keputusan tertanggal <strong className="text-orange-600">5 Januari 1963</strong>, menjadikannya salah satu sekolah menengah atas negeri pionir tertua di Kabupaten Pemalang.
                  </p>
                  <p>
                    Selama lebih dari enam dekade, SMAN 1 Pemalang telah meluluskan ribuan alumni yang kini berkiprah di berbagai sektor nasional hingga internasional — dari ranah akademisi, pemerintahan, kesehatan, hingga wirausaha kreatif.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Identitas Data Resmi Sekolah ── */}
      <section className="py-20 px-4 sm:px-6 relative bg-gray-50/50">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
              Identitas & Legitimasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
              Data Resmi Sekolah
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 relative bg-white p-4 rounded-[2rem] border border-gray-100 shadow-xl shadow-orange-500/10 overflow-hidden flex flex-col">
              <div className="relative flex-1 min-h-[260px] sm:min-h-[320px] rounded-xl overflow-hidden bg-gray-100">
                <ImageSlot
                  src={sekolah.aset.gedung}
                  alt="Gedung Utama SMA Negeri 1 Pemalang"
                  label="gedung.jpg"
                  className="w-full h-full"
                  imageClassName="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="pt-4 pb-2 px-2 text-center">
                <p className="font-bold text-gray-800 text-lg">Gedung Utama SMANSA</p>
                <p className="text-sm text-gray-500 mt-1">{sekolah.alamatSingkat}</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-orange-500/10 overflow-hidden flex flex-col justify-between">
              <div className="p-6 sm:p-8 overflow-x-auto">
                <table className="w-full text-sm sm:text-base">
                  <tbody>
                    {identitas.map(({ label, nilai }, i) => (
                      <tr key={label} className="border-b border-gray-100 last:border-0 hover:bg-orange-50/50 transition-colors">
                        <td className="py-4 pr-4 font-bold text-gray-800 w-1/3 align-top">
                          {label}
                        </td>
                        <td className="py-4 text-gray-600 font-medium">{nilai}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Visi & Misi ── */}
      <section className="py-20 px-4 sm:px-6 relative bg-white" id="visimisi">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
              Visi & Misi SMANSA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 bg-gradient-to-br from-orange-400 to-orange-500 text-white p-10 rounded-[2rem] shadow-xl shadow-orange-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
              <div>
                <span className="inline-block text-sm font-extrabold uppercase tracking-widest text-orange-100 border-b border-orange-200/40 pb-2 mb-6">
                  Visi Utama
                </span>
                <blockquote className="text-xl sm:text-2xl font-bold leading-relaxed">
                  &ldquo;Mewujudkan insan Indonesia berkepribadian Pancasila, kuat iman, berakhlak mulia, berprestasi prima, berwawasan lingkungan dan global.&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="md:col-span-7 bg-white p-8 sm:p-10 rounded-[2rem] border border-gray-100 shadow-xl shadow-orange-500/10">
              <span className="inline-block text-sm font-extrabold uppercase tracking-widest text-orange-500 border-b border-orange-100 pb-2 mb-6">
                Misi Strategis Sekolah
              </span>
              <ul className="space-y-4">
                {misi.map((m, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-black text-sm flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-600 text-base font-medium pt-1 leading-snug">
                      {m}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Ekstrakurikuler ── */}
      <section className="py-20 px-4 sm:px-6 relative bg-white">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Outer Blue Wrapper */}
          <div className="bg-[#b3e5fc] border-[12px] border-[#81d4fa] p-4 sm:p-6 md:p-8 rounded-xl shadow-[0_10px_30px_rgba(3,105,161,0.2)]">
            {/* Inner Yellow Wrapper */}
            <div className="bg-[#fff9c4] border-[6px] border-[#fde047] p-8 sm:p-10 md:p-12 rounded-xl flex flex-col items-center gap-10 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-50 pointer-events-none"></div>

              <div className="text-center relative z-10 w-full">
                <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-sm">
                  Pengembangan Karakter
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-orange-600 drop-shadow-[2px_2px_0px_#fff]">
                  Jalur Ekstrakurikuler
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 w-full">
                {ekskul.map(({ jalur, contoh, ikon: Ikon, warna }) => (
                  <div key={jalur} className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-[2rem] border border-white shadow-lg shadow-orange-500/10 hover:-translate-y-2 transition-all group flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${warna} mb-5 group-hover:scale-110 transition-transform`}>
                      <Ikon size={28} />
                    </div>
                    <h3 className="font-extrabold text-xl text-gray-800 mb-2">{jalur}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {contoh}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Galeri Kampus ── */}
      <section className="py-20 px-4 sm:px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
              Galeri Lingkungan Kampus
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { src: sekolah.aset.foto1, judul: "Gedung Utama & Gerbang Kampus" },
              { src: sekolah.aset.foto2, judul: "Fasilitas Belajar & Ruang Kelas" },
              { src: sekolah.aset.foto3, judul: "Area Lingkungan & Taman Asri" },
            ].map(({ src, judul }) => (
              <div key={judul} className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-orange-500/10 overflow-hidden group hover:-translate-y-2 transition-all p-3">
                <div className="relative h-60 rounded-xl overflow-hidden bg-gray-100">
                  <ImageSlot src={src} alt={judul} className="w-full h-full" imageClassName="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="pt-4 pb-2 text-center">
                  <h3 className="font-bold text-gray-800 text-sm">{judul}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Lokasi & Sosial Media ── */}
      <section className="py-20 px-4 sm:px-6 relative bg-gray-50/50">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
              Lokasi & Kontak Resmi
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 bg-white p-4 border border-gray-100 shadow-xl shadow-orange-500/10 rounded-[2rem] overflow-hidden flex flex-col justify-between">
              <div className="relative w-full h-[350px] rounded-xl overflow-hidden">
                <iframe src={sekolah.googleMapsEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full"></iframe>
              </div>
              <div className="mt-4 px-2 flex items-center justify-between">
                <p className="text-sm font-bold text-gray-700">{sekolah.alamat}</p>
                <a href={sekolah.googleMaps} target="_blank" rel="noopener noreferrer" className="text-xs bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full font-bold hover:bg-orange-100 transition-colors">
                  Buka Map
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-orange-500/10">
                <h3 className="font-black text-xl text-gray-800 mb-6">Informasi Kontak</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-gray-600 font-medium">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                      <FiPhone size={18} />
                    </div>
                    {sekolah.telepon}
                  </li>
                  <li className="flex items-center gap-4 text-gray-600 font-medium">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                      <FiMail size={18} />
                    </div>
                    {sekolah.email}
                  </li>
                  <li className="flex items-center gap-4 text-gray-600 font-medium">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                      <FiGlobe size={18} />
                    </div>
                    {sekolah.website}
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-orange-500/10">
                <h3 className="font-black text-xl text-gray-800 mb-6">Sosial Media</h3>
                <div className="flex gap-4">
                  <a href={sekolah.sosmed.instagram.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-lg shadow-pink-500/30">
                    <FaInstagram size={24} />
                  </a>
                  <a href={sekolah.sosmed.youtube.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-lg shadow-red-500/30">
                    <FaYoutube size={24} />
                  </a>
                  <a href={sekolah.sosmed.facebook.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-lg shadow-blue-500/30">
                    <FaFacebookF size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

