import { DM_Sans, Baloo_2 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Font DM Sans untuk body
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Font Baloo 2 untuk judul
const baloo2 = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata = {
  title: "SMAN 1 Pemalang",
  description:
    "Website profil SMA Negeri 1 Pemalang (NPSN 20324216) — SMA Rujukan Kabupaten Pemalang, akreditasi A, Jl. Jend. Gatot Subroto, Pemalang, Jawa Tengah.",
  icons: {
    icon: "/logo_smansa.png?v=2026",
  },
};

// Navbar dan Footer dirender sekali di sini, tidak diulang di tiap halaman
export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${dmSans.variable} ${baloo2.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
