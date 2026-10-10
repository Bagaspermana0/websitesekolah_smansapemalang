import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiTag } from "react-icons/fi";
import Badge from "@/components/ui/Badge";
import ImageSlot from "@/components/ImageSlot";
import beritaData from "@/data/berita";

// Generate static params untuk semua slug berita
export function generateStaticParams() {
  return beritaData.map((b) => ({ id: b.id }));
}

// Metadata dinamis per berita
export async function generateMetadata({ params }) {
  const { id } = await params;
  const berita = beritaData.find((b) => b.id === id);
  if (!berita) {
    return { title: "Berita tidak ditemukan — SMAN 1 Pemalang" };
  }
  return {
    title: `${berita.judul} — SMA Negeri 1 Pemalang`,
    description: berita.ringkasan,
  };
}

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;
  const berita = beritaData.find((b) => b.id === id);

  if (!berita) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center">
        <div className="text-6xl font-bold text-gray-200 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Berita tidak ditemukan</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Berita dengan ID <code className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">{id}</code> tidak ada.
        </p>
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 rounded bg-[#49952E] text-white px-5 py-3 font-bold text-sm hover:bg-[#3d7a26] transition-colors"
        >
          <FiArrowLeft size={16} aria-hidden="true" />
          Kembali ke Berita
        </Link>
      </div>
    );
  }

  const { judul, tanggal, tanggalISO, gambar, kategori, isi, ringkasan } = berita;

  const badgeVarian =
    kategori === "Prestasi" ? "atap" :
    kategori === "Olahraga" ? "hijau" :
    kategori === "OSIS"     ? "gunung" : "kuning";

  return (
    <>
      {/* Header artikel */}
      <section className="bg-gradient-to-br from-[#0b1728] via-[#173e7a] to-[#1b2a4a] px-4 sm:px-6 pt-[150px] pb-16 relative overflow-hidden text-white">
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-300 hover:text-white transition-colors mb-4 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-orange-500/30"
          >
            <FiArrowLeft size={14} aria-hidden="true" />
            Kembali ke Berita
          </Link>

          {/* Badge dan tanggal */}
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-orange-500 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {kategori}
            </span>
            <time
              dateTime={tanggalISO}
              className="flex items-center gap-1 text-xs text-slate-300 font-semibold"
            >
              <FiCalendar size={13} aria-hidden="true" />
              {tanggal}
            </time>
          </div>

          {/* Judul */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-3">
            {judul}
          </h1>

          {/* Ringkasan */}
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
            {ringkasan}
          </p>
        </div>

        {/* Wave Divider Transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            className="relative block w-full h-[40px] sm:h-[50px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C320,110 520,10 720,70 C920,120 1120,20 1440,65 L1440,120 L0,120 Z"
              fill="#fff7ed"
            ></path>
          </svg>
        </div>
      </section>

      {/* Gambar utama */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="relative h-60 sm:h-80 md:h-96 border-4 border-orange-400 shadow-[8px_8px_0px_#fb923c] rounded-2xl overflow-hidden bg-gray-100">
          <ImageSlot
            src={gambar}
            alt={judul}
            label={gambar.replace("/", "")}
            className="w-full h-full object-cover"
            priority
            sizes="(max-width: 768px) 90vw, 800px"
          />
        </div>
      </div>

      {/* Isi artikel */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white border-4 border-orange-400 shadow-[8px_8px_0px_#fb923c] rounded-2xl p-6 sm:p-10 space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed font-normal">
          {isi.map((paragraf, i) => (
            <p key={i} className="text-gray-800 leading-relaxed font-medium">
              {paragraf}
            </p>
          ))}
        </div>

        {/* Navigasi bawah */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-bold text-sm shadow-lg shadow-orange-500/30 transition-all"
          >
            <FiArrowLeft size={16} aria-hidden="true" />
            Lihat Berita Lainnya
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
            <FiTag size={13} aria-hidden="true" />
            Dokumentasi Informasi Resmi SMANSA
          </div>
        </div>
      </article>
    </>
  );
}

