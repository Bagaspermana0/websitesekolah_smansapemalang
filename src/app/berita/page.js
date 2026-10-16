import BeritaListClient from "@/components/BeritaListClient";
import beritaData from "@/data/berita";

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

      {/* Grid Berita dengan localStorage sync */}
      <section className="py-20 px-4 sm:px-6 relative bg-white overflow-hidden">
        <BeritaListClient initialBerita={beritaData} />
      </section>
    </>
  );
}
