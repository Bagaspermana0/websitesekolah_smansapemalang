import Link from "next/link";
import JudulSection from "@/components/ui/JudulSection";
import Gelombang from "@/components/ui/Gelombang";
import ImageSlot from "@/components/ImageSlot";
import { FiMapPin, FiPhone, FiExternalLink, FiCheck } from "react-icons/fi";
import sekolah from "@/data/sekolah";

export const metadata = {
  title: "Tentang Sekolah — SMA Negeri 1 Pemalang",
  description:
    "Profil, sejarah, visi, misi, dan fasilitas SMA Negeri 1 Pemalang — NPSN 20324216, akreditasi A, berdiri sejak 1963.",
};

// Data identitas untuk tabel
const identitas = [
  { label: "Nama Sekolah", nilai: sekolah.nama },
  { label: "NPSN", nilai: sekolah.npsn },
  { label: "Status", nilai: sekolah.status },
  { label: "Akreditasi", nilai: `${sekolah.akreditasi} (nilai ${sekolah.nilaiAkreditasi}, ${sekolah.tahunAkreditasi})` },
  { label: "Kepala Sekolah", nilai: sekolah.kepalaSekolah },
  { label: "Kurikulum", nilai: sekolah.kurikulum },
  { label: "SK Pendirian", nilai: sekolah.skPendirian },
  { label: "Website", nilai: sekolah.website },
];

// Misi sekolah (dari PRD bagian 2)
const misi = [
  "Menjaga keutuhan NKRI.",
  "Menumbuhkan pengamalan agama warga sekolah sesuai agama masing-masing.",
  "Membekali siswa dengan budi pekerti luhur sesuai nilai bangsa.",
  "Memberdayakan potensi siswa di IPTEKS, imtaq, serta kecerdasan sosial dan emosional.",
  "Meningkatkan prestasi siswa supaya mampu bersaing secara global.",
];

// Empat jalur ekstrakurikuler
const ekskul = [
  { jalur: "Olah Hati", contoh: "Rohis, PMR, Paskibra", warna: "bg-atap" },
  { jalur: "Olah Pikir", contoh: "KIR, Olimpiade Sains, Debat", warna: "bg-gunung" },
  { jalur: "Olah Raga", contoh: "Basket, Voli, Karate, Renang", warna: "bg-hijau" },
  { jalur: "Olah Rasa", contoh: "Seni Tari, Musik, Teater, Desain", warna: "bg-oranye" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Header halaman ── */}
      <section className="bg-[#49952E] px-4 sm:px-6 pt-[160px] pb-12 sm:pb-16 relative overflow-hidden text-center text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 uppercase tracking-wider">
            SMA Negeri 1 Pemalang
          </h1>
          <p className="text-white/90 max-w-lg mx-auto text-sm sm:text-base font-medium">
            {sekolah.slogan}
          </p>
        </div>
      </section>

      {/* ── Profil & Identitas ── */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Identitas Data</h2>
            <div className="w-16 h-1 bg-[#49952E] mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Foto gedung */}
            <div className="relative h-64 sm:h-80 md:h-96 border border-gray-200 shadow-md overflow-hidden bg-gray-50">
              <ImageSlot
                src={sekolah.aset.gedung}
                alt="Gedung SMA Negeri 1 Pemalang"
                label="gedung.jpg"
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>

            {/* Tabel identitas */}
            <div className="border border-gray-200 shadow-sm overflow-hidden bg-white">
              <div className="bg-[#49952E] px-4 sm:px-5 py-3 flex items-center justify-between">
                <span className="text-white font-bold text-sm uppercase">Identitas Resmi</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <tbody>
                    {identitas.map(({ label, nilai }, i) => (
                      <tr
                        key={label}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-3 sm:px-4 py-3 font-semibold text-gray-800 w-36 align-top border-r border-gray-100">
                          {label}
                        </td>
                        <td className="px-3 sm:px-4 py-3 text-gray-600 font-medium">{nilai}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sejarah Singkat ── */}
      <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Sejarah Singkat</h2>
            <div className="w-16 h-1 bg-[#49952E] mt-2 mx-auto"></div>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8 space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            <p>
              SMA Negeri 1 Pemalang resmi berdiri berdasarkan Surat Keputusan
              tertanggal <strong>5 Januari 1963</strong>, menjadikannya salah
              satu sekolah menengah atas tertua di Kabupaten Pemalang.
            </p>
            <p>
              Selama lebih dari enam dekade, sekolah ini telah meluluskan
              ribuan alumni yang berkiprah di berbagai bidang — dari akademisi,
              birokrasi, hingga dunia wirausaha. Pada tahun 2022, Badan
              Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) memberikan
              akreditasi <strong>A</strong> dengan nilai 96, mencerminkan
              standar mutu yang konsisten dijaga.
            </p>
            <p>
              Pada <strong>tahun 2016</strong>, SMAN 1 Pemalang ditunjuk sebagai
              satu-satunya SMA Rujukan di Kabupaten Pemalang, menggantikan
              program RSBI. Status ini menegaskan peran sekolah sebagai
              penggerak mutu pendidikan di wilayah Pemalang.
            </p>
            <p className="text-xs text-gray-500 italic pt-2 border-t border-gray-100">
              Catatan: Sejarah di atas diturunkan dari data Dapodik dan Kemendikdasmen.
            </p>
          </div>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6" id="visimisi">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Visi &amp; Misi</h2>
            <div className="w-16 h-1 bg-[#49952E] mt-2 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Visi */}
            <div className="border border-gray-200 bg-[#49952E] shadow-sm p-6 sm:p-8 text-white">
              <div className="text-sm font-bold uppercase tracking-widest text-white/80 mb-3 border-b border-white/20 pb-2">Visi Utama</div>
              <p className="text-base sm:text-lg font-bold leading-relaxed">
                Mewujudkan insan Indonesia berkepribadian Pancasila, kuat iman,
                berakhlak mulia, berprestasi prima, berwawasan lingkungan dan
                global.
              </p>
            </div>

            {/* Misi */}
            <div className="border border-gray-200 bg-gray-50 shadow-sm p-6 sm:p-8">
              <div className="text-sm font-bold uppercase tracking-widest text-[#49952E] mb-4 border-b border-[#49952E]/20 pb-2">Misi Sekolah</div>
              <ol className="space-y-3">
                {misi.map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed font-medium">
                    <span className="mt-0.5 w-6 h-6 rounded bg-[#49952E]/10 text-[#49952E] flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ekstrakurikuler ── */}
      <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Kegiatan Ekstrakurikuler</h2>
            <p className="text-sm text-gray-500 mt-1">4 jalur pembinaan karakter siswa SMANSA</p>
            <div className="w-16 h-1 bg-[#49952E] mt-3 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {ekskul.map(({ jalur, contoh }, i) => (
              <div
                key={jalur}
                className="bg-white border border-gray-200 shadow-sm p-5 hover:border-[#49952E]/50 transition-colors"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-10 h-10 rounded bg-[#49952E]/10 flex items-center justify-center text-[#49952E]">
                    <FiCheck size={20} aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-center mb-1 text-gray-800">{jalur}</h3>
                <p className="text-xs text-gray-500 text-center leading-relaxed font-medium">{contoh}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Galeri Lingkungan & Kampus Sekolah ── */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Galeri Lingkungan &amp; Kampus</h2>
            <p className="text-sm text-gray-500 mt-1">Dokumentasi lingkungan dan sarana prasarana {sekolah.singkatan}</p>
            <div className="w-16 h-1 bg-[#49952E] mt-3 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                src: sekolah.aset.foto1,
                judul: "Gedung Utama & Kampus",
                deskripsi: "Suasana gerbang dan gedung utama SMAN 1 Pemalang",
              },
              {
                src: sekolah.aset.foto2,
                judul: "Fasilitas & Lingkungan Belajar",
                deskripsi: "Sarana belajar yang nyaman dan asri untuk siswa",
              },
              {
                src: sekolah.aset.foto3,
                judul: "Area Lingkungan Sekolah",
                deskripsi: "Tata lingkungan sekolah ramah anak dan berwawasan lingkungan",
              },
            ].map(({ src, judul, deskripsi }) => (
              <div
                key={judul}
                className="group relative bg-white border border-gray-200 hover:border-[#49952E] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
                  <ImageSlot
                    src={src}
                    alt={judul}
                    label="smansa_foto"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 bg-white border-t border-gray-100">
                  <h3 className="font-bold text-gray-800 text-base mb-1">{judul}</h3>
                  <p className="text-xs text-gray-500 font-medium">{deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kontak & Lokasi ── */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Kontak &amp; Lokasi</h2>
            <div className="w-16 h-1 bg-[#49952E] mt-3 mx-auto"></div>
          </div>

          <div className="border border-gray-200 bg-gray-50 shadow-sm p-6 sm:p-8 text-left space-y-4">
            <div className="flex items-start gap-3">
              <FiMapPin size={22} className="text-[#49952E] mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <div className="font-bold text-gray-800 text-base">Alamat Kampus</div>
                <div className="text-gray-600 text-xs sm:text-sm mt-0.5 font-medium">{sekolah.alamat}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone size={22} className="text-[#49952E] shrink-0" aria-hidden="true" />
              <div>
                <div className="font-bold text-gray-800 text-base">Telepon / Fax</div>
                <div className="text-gray-600 text-xs sm:text-sm font-medium">{sekolah.telepon}</div>
              </div>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={sekolah.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#49952E] text-white px-5 py-3 font-bold text-sm hover:bg-[#3d7a26] transition-colors rounded"
              >
                <FiMapPin size={16} aria-hidden="true" />
                Buka Google Maps
                <FiExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
