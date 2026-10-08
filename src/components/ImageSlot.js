"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * ImageSlot — client component wrapper for Image with fallback state.
 * Prevents "Event handlers cannot be passed to Client Component props" error.
 */
export default function ImageSlot({
  src,
  alt,
  label,
  className = "",
  imageClassName = "object-cover",
  priority = false,
  sizes,
  fill = true,
  width,
  height,
  showLabelText = true,
  unoptimized = false,
}) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 p-2 overflow-hidden animate-pulse ${className}`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 opacity-50"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        {showLabelText && (
          <span className="text-[10px] font-medium text-center uppercase tracking-widest opacity-60">
            {label ? label : "Image"}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          unoptimized={unoptimized}
          className={imageClassName}
          onError={() => setError(true)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          unoptimized={unoptimized}
          className={imageClassName}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
