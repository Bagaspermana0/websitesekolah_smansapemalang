import BeritaCard from "@/components/BeritaCard";
import beritaData from "@/data/berita";

export const metadata = {
  title: "Berita — SMA Negeri 1 Pemalang",
  description:
    "Berita dan informasi terkini kegiatan, prestasi, dan pengumuman SMA Negeri 1 Pemalang.",
};

export default function BeritaPage() {
  return (
    <>
      {/* Header halaman */}
      <section className="bg-[#49952E] px-6 pt-[160px] pb-14 relative overflow-hidden text-center text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 uppercase tracking-wider">
            Berita Sekolah
          </h1>
          <p className="text-white/90 max-w-md mx-auto text-sm">
            Kegiatan, prestasi, dan pengumuman terkini dari SMA Negeri 1 Pemalang.
          </p>
        </div>
      </section>

      {/* Grid berita */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Semua Berita</h2>
            <p className="text-sm text-gray-500 mt-1">Menampilkan {beritaData.length} berita</p>
            <div className="w-16 h-1 bg-[#49952E] mt-3 mx-auto"></div>
          </div>

          {/* Grid responsif: 1 kolom HP, 2 tablet, 3 desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beritaData.map((b) => (
              <BeritaCard key={b.id} berita={b} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
