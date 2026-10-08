// Pembatas gelombang SVG antar section
// flip=true untuk membalik arah gelombang
export default function Gelombang({ warna = "#A9E1F7", flip = false }) {
  return (
    <div
      className="w-full overflow-hidden leading-none"
      style={{ transform: flip ? "scaleY(-1)" : "none" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full h-16 md:h-20"
      >
        <path
          d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
          fill={warna}
        />
      </svg>
    </div>
  );
}
