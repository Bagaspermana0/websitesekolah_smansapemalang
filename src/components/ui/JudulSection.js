// Judul section dengan coretan / highlight kuning di kata kunci
export default function JudulSection({ children, highlight, sub }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold font-judul text-gunung-tua leading-tight">
        {highlight ? (
          <>
            {children}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{highlight}</span>
              {/* Highlight kuning di belakang kata kunci */}
              <span
                className="absolute bottom-1 left-0 w-full h-3 bg-kuning -z-0 rounded"
                aria-hidden="true"
              />
            </span>
          </>
        ) : (
          children
        )}
      </h2>
      {sub && (
        <p className="mt-3 text-gunung/70 text-base max-w-xl mx-auto">{sub}</p>
      )}
    </div>
  );
}
