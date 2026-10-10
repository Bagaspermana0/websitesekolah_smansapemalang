import Link from "next/link";
import { FiMapPin, FiClock, FiPhone, FiMail, FiGlobe, FiExternalLink, FiNavigation } from "react-icons/fi";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import sekolah from "@/data/sekolah";

export default function Footer() {
  return (
    <footer className="bg-[#85daf7] text-[#0f3756] border-t-4 border-[#2A5BA8] relative overflow-hidden font-sans">
      {/* ── Main Content Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* ── Kolom Kiri: Judul, Subtitle, Info Kontak & Sosmed (lg:col-span-5) ── */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Header Sekolah */}
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f3756] tracking-tight uppercase mb-2">
              {sekolah.nama}
            </h2>
            <p className="text-xs sm:text-sm text-[#18537e] font-semibold mb-6 leading-relaxed max-w-md">
              SMA Rujukan Kabupaten Pemalang • Penggerak Mutu Pendidikan dengan Akreditasi A (96).
            </p>

            {/* List Detail Kontak dengan Ikon */}
            <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-[#14486d] mb-8">
              <li className="flex items-start gap-3">
                <FiMapPin size={18} className="mt-0.5 shrink-0 text-[#0f3756]" />
                <span className="leading-snug">{sekolah.alamat}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiClock size={18} className="shrink-0 text-[#0f3756]" />
                <span>Senin – Jumat: 07.00 – 15.30 WIB</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone size={18} className="shrink-0 text-[#0f3756]" />
                <span>Help Desk / Telepon: {sekolah.telepon}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail size={18} className="shrink-0 text-[#0f3756]" />
                <a href={`mailto:${sekolah.email}`} className="hover:underline text-[#0f3756]">
                  {sekolah.email}
                </a>
              </li>
            </ul>
          </div>

          {/* ── Tombol Media Sosial Kotak ── */}
          <div>
            <div className="flex items-center gap-2.5">
              <a
                href={sekolah.sosmed.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#38bdf8] border-2 border-[#0284c7] text-[#0f3756] shadow-[2px_2px_0px_#0284c7] hover:bg-white hover:scale-105 transition-all flex items-center justify-center"
                title={sekolah.sosmed.youtube.label}
              >
                <FaYoutube size={18} />
              </a>
              <a
                href={sekolah.sosmed.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#38bdf8] border-2 border-[#0284c7] text-[#0f3756] shadow-[2px_2px_0px_#0284c7] hover:bg-white hover:scale-105 transition-all flex items-center justify-center"
                title={sekolah.sosmed.instagram.label}
              >
                <FaInstagram size={18} />
              </a>
              <a
                href={sekolah.sosmed.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#38bdf8] border-2 border-[#0284c7] text-[#0f3756] shadow-[2px_2px_0px_#0284c7] hover:bg-white hover:scale-105 transition-all flex items-center justify-center"
                title={sekolah.sosmed.facebook.label}
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href={`mailto:${sekolah.email}`}
                className="w-10 h-10 rounded-xl bg-[#38bdf8] border-2 border-[#0284c7] text-[#0f3756] shadow-[2px_2px_0px_#0284c7] hover:bg-white hover:scale-105 transition-all flex items-center justify-center"
                title="Kirim Email"
              >
                <FiMail size={18} />
              </a>
              <a
                href={`http://${sekolah.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#38bdf8] border-2 border-[#0284c7] text-[#0f3756] shadow-[2px_2px_0px_#0284c7] hover:bg-white hover:scale-105 transition-all flex items-center justify-center"
                title="Website Resmi"
              >
                <FiGlobe size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Kolom Kanan: Navigasi Halaman & Peta Google Maps (lg:col-span-7) ── */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Eksplorasi */}
          <div>
            <h3 className="font-extrabold text-[#0f3756] mb-4 text-sm tracking-wide">
              Eksplorasi
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-[#18537e]">
              <li>
                <Link href="/" className="hover:text-[#0f3756] transition-colors block">
                  Beranda Utama
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0f3756] transition-colors block">
                  Profil Sekolah
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-[#0f3756] transition-colors block">
                  Berita &amp; Informasi
                </Link>
              </li>
              <li>
                <Link href="/about#visimisi" className="hover:text-[#0f3756] transition-colors block">
                  Visi &amp; Misi
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Aktivitas & Informasi */}
          <div>
            <h3 className="font-extrabold text-[#0f3756] mb-4 text-sm tracking-wide">
              Aktivitas
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-[#18537e]">
              <li>
                <Link href="/about" className="hover:text-[#0f3756] transition-colors block">
                  Kegiatan Ekskul
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0f3756] transition-colors block">
                  Galeri Kampus
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0f3756] transition-colors block">
                  Data Identitas DAPODIK
                </Link>
              </li>
              <li>
                <a
                  href={`http://${sekolah.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0f3756] transition-colors inline-flex items-center gap-1"
                >
                  Portal Web Resmi <FiExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Peta Google Maps Embed */}
          <div>
            <h3 className="font-extrabold text-[#0f3756] mb-4 text-sm tracking-wide flex items-center gap-1.5">
              <FiNavigation className="text-[#0f3756]" size={14} /> Peta Lokasi
            </h3>
            <div className="bg-white p-1.5 rounded-xl border-2 border-[#0284c7] shadow-[3px_3px_0px_#0284c7] overflow-hidden">
              <div className="relative w-full h-[120px] rounded-lg overflow-hidden">
                <iframe
                  src={sekolah.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi SMAN 1 Pemalang"
                  className="w-full h-full"
                ></iframe>
              </div>
              <a
                href={sekolah.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 w-full bg-[#38bdf8] hover:bg-[#0284c7] hover:text-white text-[#0f3756] text-xs font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                Buka Peta Google Maps <FiExternalLink size={12} />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* ── Bottom Bar Copyright ── */}
      <div className="border-t border-[#60c5ed] bg-[#72cefa] py-4 px-4 text-center text-xs font-bold text-[#0f3756]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
          <div>
            &copy; 2026 <span className="underline">{sekolah.nama}</span>. Dibuat untuk tugas UTS Pemrograman Web.
          </div>
        </div>
      </div>
    </footer>
  );
}


