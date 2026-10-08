import Link from "next/link";
import ImageSlot from "./ImageSlot";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

export default function BeritaCard({ berita }) {
  const { id, judul, tanggal, ringkasan, gambar, kategori } = berita;

  return (
    <article className="relative group bg-white border-4 border-orange-400 shadow-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
      {/* Gambar Berita */}
      <div className="relative h-56 bg-gray-100 overflow-hidden border-b-4 border-orange-400">
        {/* Corner geometric cutouts */}
        <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-orange-400 border-l-transparent -scale-x-100 z-10"></div>
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-orange-400 border-r-transparent z-10"></div>

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
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 border-2 border-orange-400 shadow-[2px_2px_0px_#fb923c] uppercase tracking-wide">
            {kategori}
          </span>
        </div>
      </div>

      {/* Detail Konten */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-white relative">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
            <FiCalendar size={14} className="text-orange-500" />
            <time dateTime={berita.tanggalISO}>{tanggal}</time>
          </div>

          <h3 className="text-lg font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors mb-3">
            {judul}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6">
            {ringkasan}
          </p>
        </div>

        <Link
          href={`/berita/${id}`}
          className="inline-flex items-center self-start gap-2 bg-orange-100 text-orange-600 text-xs font-bold px-4 py-2 border-2 border-orange-400 shadow-[3px_3px_0px_#fb923c] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#fb923c] transition-all uppercase tracking-wide"
        >
          Baca Selengkapnya
          <FiArrowRight size={16} />
        </Link>
        
        {/* Bottom geometric cutouts */}
        <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[20px] border-l-[20px] border-b-orange-400 border-l-transparent"></div>
        <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-orange-400 border-r-transparent -scale-x-100"></div>
      </div>
    </article>
  );
}
