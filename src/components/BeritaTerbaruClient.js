"use client";

import { useState, useEffect } from "react";
import BeritaCard from "@/components/BeritaCard";
import defaultBerita from "@/data/berita";
import { getBeritaList } from "@/utils/storage";

export default function BeritaTerbaruClient({ initialBerita = defaultBerita.slice(0, 3) }) {
  const [list, setList] = useState(initialBerita);

  useEffect(() => {
    const all = getBeritaList();
    setList(all.slice(0, 3));

    const handleUpdate = () => {
      const updated = getBeritaList();
      setList(updated.slice(0, 3));
    };

    window.addEventListener("sman1_data_updated", handleUpdate);
    return () => window.removeEventListener("sman1_data_updated", handleUpdate);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {list.map((b) => (
        <BeritaCard key={b.id} berita={b} />
      ))}
    </div>
  );
}
