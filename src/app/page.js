import Link from "next/link";
import Hero from "@/components/Hero";
import BeritaCard from "@/components/BeritaCard";
import VideoPlayer from "@/components/VideoPlayer";
import ImageSlot from "@/components/ImageSlot";
import { FiArrowRight, FiAward, FiUsers, FiBookOpen } from "react-icons/fi";
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
      <section className="bg-orange-50 py-16 px-4 sm:px-6 border-b border-gray-100 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#F97316 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
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
      <section className="bg-orange-50 py-20 px-4 sm:px-6 relative overflow-hidden border-t border-gray-200/50">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#F97316 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block bg-white text-orange-600 text-xs font-bold px-4 py-1.5 border-2 border-orange-400 shadow-[4px_4px_0px_#fb923c] uppercase tracking-wider mb-3">
              Keunggulan Sekolah
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4 tracking-tight drop-shadow-sm">
              Mengapa Memilih {sekolah.singkatan}?
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Berdiri sejak 1963 dan menjadi SMA Rujukan di Kabupaten Pemalang sejak 2016.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                ikon: FiAward,
                judul: "Akreditasi A",
                isi: "Nilai 96 dari BAN-S/M tahun 2022. Standar mutu tertinggi untuk pendidikan menengah.",
              },
              {
                ikon: FiUsers,
                judul: "1.500+ Siswa",
                isi: "SMA Rujukan Kabupaten Pemalang sejak 2016, dipercaya ribuan keluarga.",
              },
              {
                ikon: FiBookOpen,
                judul: "Fasilitas Lengkap",
                isi: "36 ruang kelas, lab IPA (Biologi, Kimia, Fisika), 4 lab komputer, dan perpustakaan.",
              },
            ].map(({ ikon: Ikon, judul, isi }) => (
              <div
                key={judul}
                className="relative bg-white p-8 border-4 border-orange-400 shadow-xl overflow-hidden group hover:-translate-y-1 transition-transform"
              >
                {/* Corner geometric cutouts */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[24px] border-l-[24px] border-t-orange-400 border-l-transparent -scale-x-100"></div>
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-r-[24px] border-t-orange-400 border-r-transparent"></div>
                
                <div className="w-14 h-14 bg-orange-100 border-2 border-orange-400 rounded-lg flex items-center justify-center mb-6 text-orange-600 shadow-[3px_3px_0px_#fb923c] group-hover:scale-110 transition-transform">
                  <Ikon size={28} />
                </div>
                <h3 className="font-bold text-gray-800 text-xl mb-3">{judul}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{isi}</p>
                
                {/* Bottom geometric cutouts */}
                <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[24px] border-l-[24px] border-b-orange-400 border-l-transparent"></div>
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[24px] border-r-[24px] border-b-orange-400 border-r-transparent -scale-x-100"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Berita Terbaru ── */}
      <section className="bg-orange-50/30 py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Soft abstract background shape */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/3"></div>

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
    </>
  );
}
