import Link from "next/link";
import Hero from "@/components/Hero";
import BeritaCard from "@/components/BeritaCard";
import VideoPlayer from "@/components/VideoPlayer";
import ImageSlot from "@/components/ImageSlot";
import { FiArrowRight, FiAward, FiUsers, FiBookOpen, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import beritaData from "@/data/berita";
import sekolah from "@/data/sekolah";

const beritaTerbaru = beritaData.slice(0, 3);

export const metadata = {
  title: "Beranda — SMA Negeri 1 Pemalang",
  description:
    "SMA Negeri 1 Pemalang, SMA Rujukan Kabupaten Pemalang, akreditasi A. Lebih dari 1.500 siswa, 36 ruang kelas, 4 lab komputer.",
};

export default function Home() {
  return (
    <>
      {/* ── 1. Hero Section (Persis Screenshot) ── */}
      <Hero />

      {/* ── 2. Video Profil & Sambutan Kepala Sekolah (Kiri & Kanan) ── */}
      <section id="sambutan" className="py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-orange-600 tracking-wide uppercase mb-10 drop-shadow-sm" style={{ textShadow: "2px 2px 0px #fed7aa" }}>
            Profil &amp; Sambutan
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* ── KIRI: Video Profil Sekolah ── */}
            <VideoPlayer
              videoId="dA9WhywgOq8"
              title="Video Profil SMAN 1 Pemalang"
              label={`Video Profil — ${sekolah.singkatan}`}
              customPoster="/smansa_foto2.webp"
            />

            {/* ── KANAN: Sambutan Kepala Sekolah ── */}
            <VideoPlayer
              videoId="kwL7fAtn7Gk"
              title="Sambutan Kepala Sekolah"
              label={`${sekolah.kepalaSekolah} — Kepala ${sekolah.nama}`}
              customPoster="/smansa_foto3.webp"
            />
          </div>
        </div>
      </section>

      {/* ── 3. Profil & Keunggulan Ringkas ── */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Outer Blue Wrapper */}
          <div className="bg-[#b3e5fc] border-[12px] border-[#81d4fa] p-4 sm:p-6 md:p-8 rounded-xl shadow-[0_10px_30px_rgba(3,105,161,0.2)]">
            
            {/* Inner Yellow Wrapper */}
            <div className="bg-[#fff9c4] border-[6px] border-[#fde047] p-8 sm:p-10 md:p-12 rounded-xl flex flex-col md:flex-row items-center gap-10 md:gap-14 shadow-inner relative overflow-hidden">
              
              {/* Decorative background for yellow box */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

              {/* LEFT: Logo */}
              <div className="shrink-0 relative z-10 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500">
                <ImageSlot
                  src={sekolah.aset.logo}
                  alt={`Logo ${sekolah.nama}`}
                  label="logo.png"
                  showLabelText={false}
                  unoptimized
                  className="w-full h-full"
                  imageClassName="object-contain p-2"
                />
              </div>

              {/* RIGHT: Text Content */}
              <div className="relative z-10 flex-1">
                <h2 className="text-3xl sm:text-4xl font-black text-orange-600 mb-6 drop-shadow-[2px_2px_0px_#fff] text-center md:text-left">
                  Tentang <span className="text-orange-500">{sekolah.nama}</span>
                </h2>
                
                <div className="space-y-4 text-gray-800 text-sm sm:text-base md:text-lg font-medium leading-relaxed text-justify">
                  <p>
                    Sebagai sekolah tertua yang berdiri sejak 1963, <strong>SMANSA</strong> konsisten menjadi barometer pendidikan dan meraih peringkat atas di Kabupaten Pemalang berdasarkan data LTMPT. Kami berkomitmen mencetak calon pemimpin masa depan yang memiliki visi luas dan berakhlak mulia.
                  </p>
                  <p>
                    Melalui penanaman karakter <strong className="text-orange-600">"JUARA"</strong> (Jujur, Unggul, Adaptif, Religius, Asri), siswa dididik tidak hanya mengejar jaminan masuk Perguruan Tinggi Negeri favorit melalui SNBP dan jalur tes, namun juga mendominasi prestasi non-akademik mulai dari ajang O2SN, FLS2N, hingga lomba debat tingkat Nasional.
                  </p>
                  <p>
                    Bersama SMAN 1 Pemalang, mari mengukir jati diri dan memberikan kontribusi yang berdampak luas bagi bangsa!
                  </p>
                </div>

                <div className="mt-8 flex justify-center md:justify-start">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all"
                  >
                    Selengkapnya Profil Sekolah
                    <FiArrowRight size={18} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Berita Terbaru ── */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
                Kabar SMANSA
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
                Berita &amp; Informasi
              </h2>
            </div>
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all"
            >
              Semua Berita
              <FiArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaTerbaru.map((b) => (
              <BeritaCard key={b.id} berita={b} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQ (Pertanyaan yang Sering Diajukan) ── */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-orange-50/50">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
              F.A.Q
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight drop-shadow-sm">
              Pertanyaan Seputar Smansa
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                tanya: "Apa syarat pendaftaran siswa baru di SMAN 1 Pemalang?",
                jawab: "Pendaftaran mengikuti jalur PPDB dari Disdikbud Provinsi Jawa Tengah, meliputi jalur Zonasi, Afirmasi, Prestasi, dan Pindah Tugas Orang Tua.",
              },
              {
                tanya: "Apa saja fasilitas unggulan yang tersedia?",
                jawab: "Sekolah kami dilengkapi 36 ruang kelas ber-AC, 4 Lab Komputer, Lab IPA, Perpustakaan Digital, Masjid, dan Lapangan Olahraga multifungsi yang luas.",
              },
              {
                tanya: "Ekstrakurikuler apa saja yang aktif di sekolah ini?",
                jawab: "Terdapat puluhan ekskul mulai dari Pramuka, Paskibra, PMR, Rohis, Basket, Futsal, English Club, Karya Ilmiah Remaja, hingga Jurnalistik.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-start gap-3">
                  <span className="text-orange-500 font-black text-2xl leading-none">Q.</span>
                  {faq.tanya}
                </h3>
                <p className="text-gray-600 font-medium pl-8 leading-relaxed">
                  <span className="text-gray-400 font-black text-xl mr-2">A.</span>
                  {faq.jawab}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Kontak ── */}
      <section id="kontak" className="py-20 px-4 sm:px-6 bg-[#fff7ed]">
        <div className="max-w-6xl mx-auto">
          {/* Main Card */}
          <div className="bg-white border border-gray-100 p-8 sm:p-12 rounded-[2rem] shadow-2xl shadow-orange-500/10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* LEFT: Contact Form */}
            <div>
              <h2 className="text-3xl font-black text-orange-600 mb-8 uppercase tracking-tight">Contact</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      placeholder=" "
                      className="peer w-full border-b-2 border-gray-300 bg-transparent py-2.5 focus:border-orange-500 focus:outline-none transition-colors text-gray-800"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-3 -translate-y-6 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-orange-500 peer-focus:font-bold"
                    >
                      Name
                    </label>
                  </div>
                  
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder=" "
                      className="peer w-full border-b-2 border-gray-300 bg-transparent py-2.5 focus:border-orange-500 focus:outline-none transition-colors text-gray-800"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-3 -translate-y-6 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-orange-500 peer-focus:font-bold"
                    >
                      E-mail
                    </label>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative pt-6">
                  <textarea
                    id="message"
                    rows="4"
                    placeholder=" "
                    className="peer w-full border-b-2 border-gray-300 bg-transparent py-2.5 focus:border-orange-500 focus:outline-none transition-colors text-gray-800 resize-none"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-8 -translate-y-6 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-orange-500 peer-focus:font-bold"
                  >
                    Pesan
                  </label>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-gray-500 mb-6 font-medium">
                    *NB anda tidak perlu login untuk mengisi kritik dan saran
                  </p>
                  <div className="flex justify-center sm:justify-start">
                    <button
                      type="button"
                      className="bg-orange-500 text-white font-bold px-10 py-3 rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
                    >
                      Kirim
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* RIGHT: Info & Map */}
            <div className="flex flex-col">
              <h2 className="text-3xl font-black text-gray-800 mb-4 text-center lg:text-left">{sekolah.nama}</h2>
              
              <div className="flex flex-col items-center lg:items-start gap-2 mb-8 text-gray-600 font-medium">
                <div className="flex items-start gap-2 text-center lg:text-left">
                  <FiMapPin className="text-orange-500 mt-1 shrink-0" size={18} />
                  <span>{sekolah.alamat}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-orange-500" size={18} />
                    <span>{sekolah.telepon}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMail className="text-orange-500" size={18} />
                    <span>{sekolah.email}</span>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="flex-1 w-full min-h-[300px] rounded-xl overflow-hidden border-4 border-orange-200 relative shadow-inner">
                <iframe 
                  src={sekolah.googleMapsEmbed}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps SMAN 1 Pemalang"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
