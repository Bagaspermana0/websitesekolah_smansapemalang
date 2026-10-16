"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiTag } from "react-icons/fi";
import ImageSlot from "@/components/ImageSlot";
import { getBeritaById } from "@/utils/storage";

export default function BeritaDetailClient({ initialBerita, id }) {
  const [berita, setBerita] = useState(initialBerita);
  const [isChecking, setIsChecking] = useState(!initialBerita);

  useEffect(() => {
    // Cek di localStorage apakah ada data yang lebih baru atau data berita kustom
    const local = getBeritaById(id);
    if (local) {
      setBerita(local);
    }
    setIsChecking(false);

    const handleUpdate = () => {
      const updated = getBeritaById(id);
      if (updated) setBerita(updated);
    };

    window.addEventListener("sman1_data_updated", handleUpdate);
    return () => window.removeEventListener("sman1_data_updated", handleUpdate);
  }, [id]);

  if (isChecking) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center pt-32">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 py-32 text-center">
        <div className="text-6xl font-black text-gray-200 mb-4">404</div>
        <h1 className="text-2xl font-black text-gray-800 mb-2">
          Berita Tidak Ditemukan
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          Berita dengan ID{" "}
          <code className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
            {id}
          </code>{" "}
          tidak ditemukan di data sekolah.
        </p>
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 text-white px-6 py-3 font-bold text-sm hover:bg-orange-600 transition-colors shadow-md"
        >
          <FiArrowLeft size={16} aria-hidden="true" />
          Kembali ke Berita
        </Link>
      </div>
    );
  }

  const { judul, tanggal, tanggalISO, gambar, kategori, isi, ringkasan } = berita;

  const isiArray = Array.isArray(isi)
    ? isi
    : typeof isi === "string"
    ? isi.split("\n").filter((p) => p.trim().length > 0)
    : [ringkasan];

  return (
    <>
      {/* Header artikel */}
      <section className="bg-[#b3e5fc] px-4 sm:px-6 pt-[150px] pb-24 relative text-center">
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors mb-6 bg-white px-5 py-2 rounded-full border-2 border-orange-200 shadow-sm"
          >
            <FiArrowLeft size={16} aria-hidden="true" />
            Kembali ke Berita
          </Link>

          {/* Badge dan tanggal */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              {kategori}
            </span>
            <time
              dateTime={tanggalISO}
              className="flex items-center gap-1.5 text-sm text-gray-700 font-bold bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white"
            >
              <FiCalendar size={14} aria-hidden="true" />
              {tanggal}
            </time>
          </div>

          {/* Judul */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6 drop-shadow-[3px_3px_0px_#0284c7] uppercase tracking-tight">
            {judul}
          </h1>

          {/* Ringkasan */}
          <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-semibold bg-white/40 p-4 rounded-2xl border border-white/60 shadow-inner">
            {ringkasan}
          </p>
        </div>
      </section>

      {/* Gambar utama */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <div className="relative h-64 sm:h-80 md:h-[28rem] rounded-[2rem] overflow-hidden bg-white p-2 border-[8px] border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
          <ImageSlot
            src={gambar}
            alt={judul}
            label={gambar?.startsWith("data:") ? "foto-berita" : (gambar?.replace("/", "") || "berita")}
            className="w-full h-full object-cover rounded-xl"
            priority
            sizes="(max-width: 768px) 90vw, 800px"
          />
        </div>
      </div>

      {/* Isi artikel */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white border-2 border-gray-100 shadow-xl shadow-blue-500/5 rounded-[2rem] p-8 sm:p-12 space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed font-medium text-justify">
          {isiArray.map((paragraf, i) => (
            <p key={i} className="text-gray-800 leading-relaxed">
              {paragraf}
            </p>
          ))}
        </div>

        {/* Navigasi bawah */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-[#fff9c4] rounded-[2rem] border-[6px] border-[#fde047] shadow-sm">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all"
          >
            <FiArrowLeft size={18} aria-hidden="true" />
            Berita Lainnya
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-600 font-bold bg-white px-5 py-2.5 rounded-full shadow-sm border border-orange-100">
            <FiTag size={16} className="text-orange-500" aria-hidden="true" />
            Informasi Resmi SMANSA
          </div>
        </div>
      </article>
    </>
  );
}
