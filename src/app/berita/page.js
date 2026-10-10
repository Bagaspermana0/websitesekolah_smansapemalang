import BeritaCard from "@/components/BeritaCard";
import beritaData from "@/data/berita";
import { FiFileText } from "react-icons/fi";

export const metadata = {
  title: "Berita — SMA Negeri 1 Pemalang",
  description:
    "Berita dan informasi terkini kegiatan, prestasi, dan pengumuman SMA Negeri 1 Pemalang.",
};

export default function BeritaPage() {
  return (
    <>
      {/* ── 1. Header Banner ── */}
      <section className="bg-[#b3e5fc] pt-[150px] pb-20 px-4 sm:px-6 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 uppercase tracking-tight text-white drop-shadow-[3px_3px_0px_#0284c7]">
            BERITA & INFORMASI
          </h1>
          <p className="text-[#0f3756] max-w-lg mx-auto text-lg sm:text-xl font-bold leading-relaxed">
            Kegiatan, prestasi, dan pengumuman terkini dari SMA Negeri 1 Pemalang.
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

      {/* Grid Berita */}
      <section className="py-20 px-4 sm:px-6 relative bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
              Semua Berita SMANSA
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium">
              Menampilkan {beritaData.length} berita &amp; kegiatan
            </p>
          </div>

          {/* Grid responsif: 1 kolom HP, 2 tablet, 3 desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaData.map((b) => (
              <BeritaCard key={b.id} berita={b} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

