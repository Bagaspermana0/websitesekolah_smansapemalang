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
      <section className="bg-gray-50 px-4 sm:px-6 pt-[160px] pb-10 sm:pb-14 relative overflow-hidden border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-500 hover:text-[#49952E] transition-colors mb-4 bg-white px-3 py-1.5 rounded border border-gray-200 shadow-sm"
          >
            <FiArrowLeft size={14} aria-hidden="true" />
            Kembali ke Berita
          </Link>

          {/* Badge dan tanggal */}
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#49952E]/10 text-[#49952E] text-xs font-bold px-3 py-1 rounded uppercase">
              {kategori}
            </span>
            <time
              dateTime={tanggalISO}
              className="flex items-center gap-1 text-xs text-gray-500 font-semibold"
            >
              <FiCalendar size={13} aria-hidden="true" />
              {tanggal}
            </time>
          </div>

          {/* Judul */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-3">
            {judul}
          </h1>

          {/* Ringkasan */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
            {ringkasan}
          </p>
        </div>
      </section>

      {/* Gambar utama */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-6 relative z-10">
        <div className="relative h-56 sm:h-80 md:h-96 border border-gray-200 shadow-md overflow-hidden bg-gray-50">
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
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8 space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed font-normal">
          {isi.map((paragraf, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">
              {paragraf}
            </p>
          ))}
        </div>

        {/* Navigasi bawah */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 rounded bg-[#49952E] text-white px-5 py-3 font-bold text-sm hover:bg-[#3d7a26] transition-colors"
          >
            <FiArrowLeft size={16} aria-hidden="true" />
            Lihat Berita Lainnya
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <FiTag size={13} aria-hidden="true" />
            Data simulasi profil sekolah
          </div>
        </div>
      </article>
    </>
  );
}
