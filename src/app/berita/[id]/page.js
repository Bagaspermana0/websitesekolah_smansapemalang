import BeritaDetailClient from "@/components/BeritaDetailClient";
import beritaData from "@/data/berita";


// Generate static params untuk semua slug bawaan
export function generateStaticParams() {
  return beritaData.map((b) => ({ id: b.id }));
}

// Metadata dinamis per berita
export async function generateMetadata({ params }) {
  const { id } = await params;
  const berita = beritaData.find((b) => b.id === id);
  if (!berita) {
    return { title: "Berita Sekolah — SMA Negeri 1 Pemalang" };
  }
  return {
    title: `${berita.judul} — SMA Negeri 1 Pemalang`,
    description: berita.ringkasan,
  };
}

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;
  const berita = beritaData.find((b) => b.id === id) || null;

  return <BeritaDetailClient initialBerita={berita} id={id} />;
}
