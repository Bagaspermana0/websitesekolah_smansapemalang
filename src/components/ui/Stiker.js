// Kartu stiker bergaya Canva — border solid, bayangan offset, sedikit miring
// Prop miring: true = -rotate-1, false = lurus (selang-seling dari parent)
export default function Stiker({ children, miring = false, className = "" }) {
  return (
    <div
      className={`rounded-3xl border-2 border-gunung-tua bg-white shadow-[6px_6px_0_#173E7A] transition-all duration-200 hover:rotate-0 hover:shadow-[3px_3px_0_#173E7A] ${miring ? "-rotate-1" : "rotate-0"} ${className}`}
    >
      {children}
    </div>
  );
}
