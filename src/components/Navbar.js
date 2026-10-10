"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiStar, FiUser, FiFileText, FiSearch, FiMenu, FiX, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import ImageSlot from "./ImageSlot";
import sekolah from "@/data/sekolah";

export default function Navbar() {
  const pathname = usePathname();
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuTerbuka(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Beranda", href: "/",      ikon: FiHome },
    { label: "Profil",  href: "/about", ikon: FiUser },
    { label: "Berita",  href: "/berita", ikon: FiFileText },
    { label: "Kontak",  href: "/#kontak", ikon: FiPhone },
  ];

  const taglines = [
    <div key="tagline" className="flex items-center gap-2"><FiStar size={14} className="text-[#0f3756] shrink-0" /> <span>{sekolah.slogan}</span></div>,
    <div key="alamat" className="flex items-center gap-2"><FiMapPin size={14} className="text-[#0f3756] shrink-0" /> <span>{sekolah.alamat}</span></div>,
    <div key="kontak" className="flex items-center gap-6">
      <span className="flex items-center gap-2"><FiPhone size={14} className="text-[#0f3756] shrink-0" /> <span>{sekolah.telepon}</span></span>
      <span className="flex items-center gap-2"><FiMail size={14} className="text-[#0f3756] shrink-0" /> <span>{sekolah.email}</span></span>
    </div>,
    <div key="tagline2" className="flex items-center gap-2"><FiStar size={14} className="text-[#0f3756] shrink-0" /> <span>Berprestasi, Berkarakter, Berwawasan Global</span></div>
  ];
  const [activeTagline, setActiveTagline] = useState(0);
  const [animClass, setAnimClass] = useState("translate-y-0 opacity-100");

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Geser ke atas & pudar keluar
      setAnimClass("-translate-y-4 opacity-0 transition-all duration-300 ease-in");

      setTimeout(() => {
        // 2. Ganti teks & posisikan di bawah seketika
        setActiveTagline((current) => (current + 1) % taglines.length);
        setAnimClass("translate-y-4 opacity-0 transition-none");

        // 3. Masuk meluncur ke tengah dengan mulus
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimClass("translate-y-0 opacity-100 transition-all duration-400 ease-out");
          });
        });
      }, 300);
    }, 4500);

    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* ── Sliding Tagline & Info Bar (Biru Seger, Hanya di Beranda) ── */}
      {pathname === "/" && (
        <div
          className={`bg-[#85daf7] border-b-[2px] border-white/50 text-[#0f3756] text-xs sm:text-sm font-bold font-sans tracking-wide transition-all duration-300 flex justify-center items-center overflow-hidden h-9 relative z-10 shadow-[0_4px_15px_rgba(255,255,255,0.4)] ${
            scrolled ? "h-0 opacity-0 py-0 border-b-0" : "opacity-100"
          }`}
        >
          <div className={`transform w-full px-4 text-center flex justify-center items-center ${animClass}`}>
            {taglines[activeTagline]}
          </div>
        </div>
      )}

      {/* ── Main Nav ── */}
      <div className={`mx-auto transition-all duration-300 ${scrolled ? "max-w-7xl mt-4 px-4 sm:px-6 lg:px-8" : "w-full"}`}>
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-orange-500/15 rounded-2xl h-[72px] px-6 border-4 border-orange-500" : "bg-gradient-to-b from-black/85 via-black/45 to-transparent h-[100px] px-6 lg:px-8 pt-2"}`}>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            <div className={`flex items-center justify-center shrink-0 transition-all duration-300 ${scrolled ? "w-10 h-10" : "w-14 h-14"}`}>
              <ImageSlot
                src={sekolah.aset.logo}
                alt={`Logo ${sekolah.nama}`}
                label="logo.png"
                showLabelText={false}
                unoptimized
                className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                imageClassName="object-contain"
              />
            </div>
            <div className="flex items-center flex-1 min-w-0">
              <span className={`font-black text-sm sm:text-2xl tracking-tight uppercase leading-none whitespace-nowrap transition-colors duration-300 ${scrolled ? "text-gray-900" : "text-white [text-shadow:_2px_2px_0px_#ea580c,_0_2px_10px_rgba(249,115,22,0.8)]"}`}>
                SMA NEGERI <span className={`transition-colors duration-300 ml-1 sm:ml-1.5 ${scrolled ? "text-orange-500" : "text-white"}`}>1 PEMALANG</span>
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <nav className="flex items-center gap-2">
              {menuItems.map(({ label, href }) => {
                const aktif = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`relative px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 group ${
                      scrolled 
                        ? (aktif ? "text-orange-600 bg-orange-100/70 font-bold" : "text-gray-700 hover:text-orange-600 hover:bg-orange-50") 
                        : (aktif ? "text-white bg-white/25 backdrop-blur-md shadow-md [text-shadow:_0_1px_3px_rgba(0,0,0,0.9)] font-bold" : "text-white/95 hover:text-white hover:bg-white/15 [text-shadow:_0_1px_3px_rgba(0,0,0,0.9)]")
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 lg:hidden relative z-50 shrink-0 ml-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setMenuTerbuka(true);
              }}
              className={`p-3 rounded-xl transition-all duration-300 cursor-pointer pointer-events-auto relative z-50 ${scrolled ? "bg-gray-100 text-gray-800 shadow-sm hover:bg-gray-200" : "bg-black/40 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-black/60 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.8))]"}`}
              aria-label="Open Menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>

        {/* ── Mobile Sidebar Overlay ── */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${menuTerbuka ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setMenuTerbuka(false)}
        />

        {/* ── Mobile Sidebar ── */}
        <div 
          className={`fixed top-0 right-0 h-[100dvh] w-[280px] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 lg:hidden ${menuTerbuka ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <span className="font-black text-gray-900 text-lg">MENU</span>
            <button
              type="button"
              onClick={() => setMenuTerbuka(false)}
              className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
          
          <nav className="flex flex-col gap-2 p-6 overflow-y-auto">
            {menuItems.map(({ label, href, ikon: Ikon }) => {
              const aktif = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-semibold transition-all ${
                    aktif ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Ikon size={20} className={aktif ? "text-white" : "text-orange-500"} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto p-6 border-t border-gray-100">
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center"><FiPhone size={14}/></div>
                {sekolah.telepon}
              </span>
              <span className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center"><FiMail size={14}/></div>
                {sekolah.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

