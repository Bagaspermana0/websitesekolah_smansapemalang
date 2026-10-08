// Badge kapsul kecil — label kategori atau tanggal
export default function Badge({ children, varian = "kuning" }) {
  const varianStyle = {
    kuning: "bg-kuning text-gunung-tua",
    atap:   "bg-atap text-white",
    hijau:  "bg-hijau text-white",
    gunung: "bg-gunung text-white",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wide ${varianStyle[varian]}`}
    >
      {children}
    </span>
  );
}
