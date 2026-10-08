import Link from "next/link";
import { FiMapPin, FiPhone, FiMail, FiExternalLink, FiGlobe } from "react-icons/fi";
import sekolah from "@/data/sekolah";
import ImageSlot from "./ImageSlot";

export default function Footer() {
  return (
    <footer className="bg-gunung-tua text-white border-t-4 border-oranye">
      {/* ── Content Footer ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Kolom 1: Logo & Profil (md:col-span-5) */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-12 shrink-0">
              <ImageSlot
                src={sekolah.aset.logo}
                alt={`Logo ${sekolah.nama}`}
                label="logo.png"
                showLabelText={false}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-judul text-lg sm:text-xl font-extrabold text-white tracking-wide">
                {sekolah.nama}
              </span>
            </div>
          </div>

          <p className="text-langit-muda text-sm leading-relaxed mb-4 max-w-sm">
            {sekolah.slogan}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-hijau text-white px-3 py-1 rounded-full font-bold">
              Akreditasi {sekolah.akreditasi} (Nilai {sekolah.nilaiAkreditasi})
            </span>
            <span className="bg-white/10 text-langit px-3 py-1 rounded-full font-bold">
              NPSN {sekolah.npsn}
            </span>
          </div>
        </div>

        {/* Kolom 2: Kontak Informasi (md:col-span-4) */}
        <div className="md:col-span-4">
          <h3 className="font-bold text-kuning mb-4 uppercase text-xs tracking-widest border-b border-white/15 pb-2">
            Kontak Sekolah
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-langit-muda">
            <li className="flex items-start gap-2.5">
              <FiMapPin size={16} className="mt-0.5 shrink-0 text-oranye" aria-hidden="true" />
              <span className="leading-snug">{sekolah.alamat}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FiPhone size={16} className="text-oranye shrink-0" aria-hidden="true" />
              <span>{sekolah.telepon}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FiMail size={16} className="text-oranye shrink-0" aria-hidden="true" />
              <span>{sekolah.email}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FiGlobe size={16} className="text-oranye shrink-0" aria-hidden="true" />
              <span>{sekolah.website}</span>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Navigasi Cepat (md:col-span-3) */}
        <div className="md:col-span-3">
          <h3 className="font-bold text-kuning mb-4 uppercase text-xs tracking-widest border-b border-white/15 pb-2">
            Navigasi Halaman
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            <li>
              <Link href="/" className="text-langit-muda hover:text-kuning transition-colors flex items-center gap-1.5 font-medium">
                <span className="text-oranye">›</span> Beranda Utama
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-langit-muda hover:text-kuning transition-colors flex items-center gap-1.5 font-medium">
                <span className="text-oranye">›</span> Profil Tentang Sekolah
              </Link>
            </li>
            <li>
              <Link href="/berita" className="text-langit-muda hover:text-kuning transition-colors flex items-center gap-1.5 font-medium">
                <span className="text-oranye">›</span> Berita &amp; Informasi
              </Link>
            </li>
            <li>
              <a
                href={`https://${sekolah.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-langit-muda hover:text-kuning transition-colors flex items-center gap-1.5 font-medium"
              >
                <span className="text-oranye">›</span> Website Resmi
                <FiExternalLink size={12} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar Copyright ── */}
      <div className="border-t border-white/10 py-4 px-4 text-center text-xs text-langit/70">
        &copy; 2026 SMA Negeri 1 Pemalang. Dibuat untuk tugas UTS Pemrograman Web.
      </div>
    </footer>
  );
}
