import Link from "next/link";
import ImageSlot from "./ImageSlot";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

export default function BeritaCard({ berita }) {
  const { id, judul, tanggal, ringkasan, gambar, kategori } = berita;

  return (
    <article className="relative group bg-white border border-gray-100 shadow-xl shadow-orange-500/10 rounded-[2rem] overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-300 p-3">
      {/* Gambar Berita */}
      <div className="relative h-60 bg-gray-100 overflow-hidden rounded-xl">
        <ImageSlot
          src={gambar}
          alt={judul}
          label={gambar.replace("/", "")}
          className="w-full h-full"
          imageClassName="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badge Kategori */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/30 uppercase tracking-wide">
            {kategori}
          </span>
        </div>
      </div>

      {/* Detail Konten */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white relative">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-bold mb-3">
            <FiCalendar size={14} className="text-orange-500" />
            <time dateTime={berita.tanggalISO}>{tanggal}</time>
          </div>

          <h3 className="text-xl font-black text-gray-800 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors mb-3">
            {judul}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed font-medium line-clamp-3 mb-6">
            {ringkasan}
          </p>
        </div>

        <Link
          href={`/berita/${id}`}
          className="inline-flex items-center self-start gap-2 bg-orange-50 text-orange-600 text-xs font-bold px-5 py-2.5 rounded-full hover:bg-orange-100 transition-colors uppercase tracking-wide"
        >
          Baca Selengkapnya
          <FiArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
