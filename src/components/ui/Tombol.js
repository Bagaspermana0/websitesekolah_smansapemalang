// Tombol chunky bergaya Canva / PIONIR UGM
// Bayangan solid ke bawah, saat hover naik sedikit, saat klik turun
import Link from "next/link";

/**
 * @param {"oranye"|"kuning"|"gunung"|"putih"} varian
 * @param {string} href — kalau ada, render sebagai Link; kalau tidak, render sebagai button
 */
export default function Tombol({
  children,
  href,
  varian = "oranye",
  className = "",
  ...props
}) {
  // Pilihan warna per varian
  const varianStyle = {
    oranye:
      "bg-oranye text-white border-gunung-tua shadow-[0_4px_0_#173E7A] hover:shadow-[0_2px_0_#173E7A] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none",
    kuning:
      "bg-kuning text-gunung-tua border-gunung-tua shadow-[0_4px_0_#173E7A] hover:shadow-[0_2px_0_#173E7A] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none",
    gunung:
      "bg-gunung text-white border-gunung-tua shadow-[0_4px_0_#173E7A] hover:shadow-[0_2px_0_#173E7A] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none",
    putih:
      "bg-white text-gunung-tua border-gunung-tua shadow-[0_4px_0_#173E7A] hover:shadow-[0_2px_0_#173E7A] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none",
  };

  const base = `inline-flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 font-semibold text-sm transition-all duration-150 cursor-pointer ${varianStyle[varian]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}
