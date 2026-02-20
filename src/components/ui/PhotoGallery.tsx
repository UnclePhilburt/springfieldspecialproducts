"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

interface PhotoGalleryProps {
  photos: { src: string; alt: string }[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : photos.length - 1)),
    [photos.length],
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : 0)),
    [photos.length],
  );

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [photos.length]);

  function scrollBy(dir: number) {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, prev, next]);

  if (photos.length === 0) return null;

  // For 1-2 photos use a simpler grid, for 3+ use the scroll strip
  const useGrid = photos.length <= 2;

  return (
    <>
      {useGrid ? (
        /* Simple grid for 1-2 photos */
        <div className={`grid gap-3 ${photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </button>
          ))}
        </div>
      ) : (
        /* Scrollable strip with hidden scrollbar and fade edges */
        <div className="relative">
          {/* Left fade + arrow */}
          {canScrollLeft && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <button
                onClick={() => scrollBy(-1)}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </>
          )}

          {/* Right fade + arrow */}
          {canScrollRight && (
            <>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <button
                onClick={() => scrollBy(1)}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            ref={scrollRef}
            data-gallery-scroll
            className="flex gap-3 overflow-x-auto [&]:[-ms-overflow-style:none] [&]:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="relative shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="176px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-in fade-in duration-200"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10 cursor-pointer transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-10 cursor-pointer transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-10 cursor-pointer transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Thumbnail strip in lightbox */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`relative w-14 h-14 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                  i === lightboxIndex
                    ? "ring-2 ring-white scale-110"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
