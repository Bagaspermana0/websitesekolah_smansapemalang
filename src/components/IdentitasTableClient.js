"use client";

import { useState, useEffect } from "react";
import defaultSekolah from "@/data/sekolah";
import { getSekolahData } from "@/utils/storage";

export default function IdentitasTableClient({ initialSekolah = defaultSekolah }) {
  const [sekolah, setSekolah] = useState(initialSekolah);

  useEffect(() => {
    setSekolah(getSekolahData());

    const handleUpdate = () => {
      setSekolah(getSekolahData());
    };

    window.addEventListener("sman1_data_updated", handleUpdate);
    return () => window.removeEventListener("sman1_data_updated", handleUpdate);
  }, []);

  const identitas = [
    { label: "Nama Sekolah", nilai: sekolah.nama },
    { label: "NPSN", nilai: sekolah.npsn },
    { label: "Status Sekolah", nilai: sekolah.status },
    {
      label: "Akreditasi",
      nilai: `${sekolah.akreditasi} (Nilai ${sekolah.nilaiAkreditasi || 96}, ${sekolah.tahunAkreditasi || 2022})`,
    },
    { label: "Kepala Sekolah", nilai: sekolah.kepalaSekolah },
    { label: "Kurikulum", nilai: sekolah.kurikulum },
    { label: "SK Pendirian", nilai: sekolah.skPendirian },
    { label: "Website Resmi", nilai: sekolah.website },
  ];

  return (
    <div className="lg:col-span-7 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-orange-500/10 overflow-hidden flex flex-col justify-between">
      <div className="p-6 sm:p-8 overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <tbody>
            {identitas.map(({ label, nilai }) => (
              <tr
                key={label}
                className="border-b border-gray-100 last:border-0 hover:bg-orange-50/50 transition-colors"
              >
                <td className="py-4 pr-4 font-bold text-gray-800 w-1/3 align-top">
                  {label}
                </td>
                <td className="py-4 text-gray-600 font-medium">{nilai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
