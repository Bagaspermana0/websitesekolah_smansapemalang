import Link from "next/link";
import sekolah from "@/data/sekolah";
import ImageSlot from "./ImageSlot";
import { FiMousePointer } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[100vh] min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like feel (smansa.png) */}
      <div className="absolute inset-0 w-full h-full">
        <ImageSlot
          src={sekolah.aset.hero}
          alt={sekolah.nama}
          label="smansa.png"
          showLabelText={false}
          className="w-full h-full object-cover object-top scale-105 animate-[kenburns_20s_ease-out_forwards]"
          priority
          sizes="100vw"
        />
        {/* No dark overlay, keeping the background clean as requested */}
      </div>

      {/* ── Action Buttons in Hero ── */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-32 sm:pb-40 px-6 pointer-events-none">
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <Link
            href="/#kontak"
            className="bg-orange-500 hover:bg-orange-600 border-2 border-white text-white font-bold py-3.5 px-10 rounded-full shadow-xl shadow-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/60 hover:-translate-y-1 transition-all text-lg flex items-center justify-center gap-3"
          >
            Pendaftaran Siswa Baru <FiMousePointer size={24} className="text-white" />
          </Link>
        </div>
      </div>

      {/* Soft gradient blend into cream section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 md:h-44 bg-gradient-to-t from-[#fff7ed]/80 via-[#fff7ed]/20 to-transparent z-10 pointer-events-none"></div>

      {/* Smooth Layered Wave Transition (Krem #fff7ed) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          className="relative block w-full h-[45px] sm:h-[65px] md:h-[85px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          {/* Lapisan Ombak Belakang (Transparan Halus) */}
          <path
            d="M0,45 C320,15 480,95 720,55 C960,15 1160,95 1440,50 L1440,120 L0,120 Z"
            fill="#fff7ed"
            opacity="0.5"
          ></path>
          {/* Lapisan Ombak Utama Depan (Solid Krem) */}
          <path
            d="M0,70 C240,105 440,25 720,65 C1000,105 1200,25 1440,65 L1440,120 L0,120 Z"
            fill="#fff7ed"
          ></path>
        </svg>
      </div>
    </section>
  );
}
