"use client";

import { useState, useEffect } from "react";
import BeritaCard from "@/components/BeritaCard";
import defaultBerita from "@/data/berita";
import { getBeritaList } from "@/utils/storage";

export default function BeritaListClient({ initialBerita = defaultBerita }) {
  const [list, setList] = useState(initialBerita);

  useEffect(() => {
    // Ambil data terbaru dari localStorage jika ada
    setList(getBeritaList());

    const handleUpdate = () => {
      setList(getBeritaList());
    };

    window.addEventListener("sman1_data_updated", handleUpdate);
    return () => window.removeEventListener("sman1_data_updated", handleUpdate);
  }, []);

  return (
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
          Semua Berita SMANSA
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium">
          Menampilkan {list.length} berita &amp; kegiatan
        </p>
      </div>

      {/* Grid responsif: 1 kolom HP, 2 tablet, 3 desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((b) => (
          <BeritaCard key={b.id} berita={b} />
        ))}
      </div>
    </div>
  );
}
