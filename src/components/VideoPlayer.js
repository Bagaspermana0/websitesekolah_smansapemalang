"use client";

import { useState } from "react";
import Image from "next/image";

export default function VideoPlayer({ videoId, title, label, customPoster }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    customPoster || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  );

  return (
    <div className="flex flex-col items-center w-full">
      {/* Video Container Frame */}
      <div className="relative w-full aspect-video bg-gray-900 border-4 sm:border-8 border-orange-400 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center group">
        {!isPlaying ? (
          /* ── Custom Poster & Play Button (Zero YouTube UI) ── */
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Putar video ${title}`}
            className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer overflow-hidden text-left focus:outline-none focus:ring-4 focus:ring-orange-400"
          >
            {/* Thumbnail Image */}
            <Image
              src={imgSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-90"
              onError={() => {
                // Fallback jika hqdefault gagal
                setImgSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
              }}
            />

            {/* Subtle dark vignette overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none"></div>

            {/* Custom Orange Play Button (Static, No Animation) */}
            <div className="relative z-20 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                {/* Solid White Play Icon */}
                <svg
                  className="w-7 h-7 sm:w-9 sm:h-9 text-white ml-1 drop-shadow-sm"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86a1 1 0 00-1.5.86z" />
                </svg>
              </div>
            </div>
          </button>
        ) : (
          /* ── YouTube Embed Player (Autoplay saat dipencet) ── */
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        {/* ── Corner Decorations Mimicking Reference Frame ── */}
        <div className="absolute top-0 left-0 w-0 h-0 border-t-[32px] border-l-[32px] border-t-orange-400 border-l-transparent -scale-x-100 pointer-events-none z-30"></div>
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-r-[32px] border-t-orange-400 border-r-transparent pointer-events-none z-30"></div>
        <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[32px] border-l-[32px] border-b-orange-400 border-l-transparent pointer-events-none z-30"></div>
        <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[32px] border-r-[32px] border-b-orange-400 border-r-transparent -scale-x-100 pointer-events-none z-30"></div>
      </div>

      {/* Name Tag Below Video */}
      {label && (
        <div className="mt-5 inline-block bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-base sm:text-lg px-6 py-2 rounded shadow-md border-b-4 border-orange-600">
          {label}
        </div>
      )}
    </div>
  );
}
