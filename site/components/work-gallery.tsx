"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getGsap } from "@/lib/gsap";
import type { WorkImage } from "@/lib/work";

/**
 * Work gallery: an auto-scrolling filmstrip of the case-study snippets that
 * freezes and enlarges the hovered item, and opens a lightbox on click.
 *
 * Behaviour, by input surface:
 *  - motion-safe + fine pointer (desktop mouse): the strip auto-scrolls as a
 *    seamless marquee (the item list is duplicated, and a GSAP tween drives a
 *    single transform on -50% of the track width, so the loop is invisible).
 *    Hovering an item pauses the marquee and scales that item up with a
 *    #0D90FF ring; siblings dim back. Clicking opens the lightbox.
 *  - reduced-motion OR coarse pointer (touch): NO marquee, NO hover-enlarge.
 *    A tidy static grid renders instead; tapping any tile opens the lightbox.
 *
 * The marquee tween only ever animates `transform`, so it stays on the GPU and
 * never touches layout. It runs on the inner track and is scoped so the page's
 * own scroll is untouched: the strip is a normal in-flow element with hidden
 * horizontal overflow, so there is no scroll region to hijack.
 */
export function WorkGallery({ images }: { images: WorkImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showNext = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? current : (current + 1) % images.length
    );
  }, [images.length]);
  const showPrev = useCallback(() => {
    setLightboxIndex((current) =>
      current === null
        ? current
        : (current - 1 + images.length) % images.length
    );
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <Filmstrip images={images} onOpen={openLightbox} />
      {lightboxIndex !== null ? (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNext={showNext}
          onPrev={showPrev}
        />
      ) : null}
    </>
  );
}

/**
 * Fixed-height filmstrip tile. Every source screenshot comes in a different
 * aspect ratio (tall mobile shots at 0.49, wide banners at 2.74), so each tile
 * is pinned to a fixed height and lets its width follow the media's natural
 * ratio. That keeps nothing cropped or distorted and gives the strip a natural
 * wide/narrow rhythm. A plain <img> (not next/image) is used here on purpose:
 * these are small, already-optimized thumbnails and auto-width is exactly what
 * varied ratios need. The lightbox uses next/image for the full-size render.
 */
function FilmstripTile({
  image,
  onClick,
}: {
  image: WorkImage;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-tile
      className="group/tile relative block h-full shrink-0 cursor-pointer overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-2)] outline-none transition-[border-color,box-shadow] duration-300 focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      aria-label={image.label ? `Open: ${image.label}` : "Open gallery item"}
    >
      {image.video ? (
        <video
          className="pointer-events-none block h-full w-auto object-cover"
          poster={image.src}
          src={image.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={image.alt}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="pointer-events-none block h-full w-auto object-cover"
        />
      )}
      {image.label ? (
        <span className="mono-label pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(6,6,7,0.92)] to-transparent px-4 pb-3 pt-8 text-left text-[0.7rem] text-[var(--text-1)]">
          {image.label}
        </span>
      ) : null}
      {/* Zoom affordance, revealed on hover of the enlarged tile. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-bright)] bg-[rgba(6,6,7,0.55)] text-[var(--text-1)] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </span>
    </button>
  );
}

function Filmstrip({
  images,
  onOpen,
}: {
  images: WorkImage[];
  onOpen: (index: number) => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  // Whether the animated marquee is active. Starts false so SSR + reduced
  // motion + touch all render the static grid; a media-query check flips it on
  // only for motion-safe fine-pointer clients (and updates live if the user
  // toggles reduced-motion or plugs in a mouse).
  const [marquee, setMarquee] = useState(false);

  // Duplicate the list so the loop is seamless: the track is exactly 2x the
  // content, and the tween runs from x:0 to x:-50%, then repeats.
  const doubled = useMemo(() => [...images, ...images], [images]);

  // Detection: decide marquee vs static grid. Kept separate from the tween so
  // the tween always measures the real marquee track (below), never the grid.
  useEffect(() => {
    const query = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)"
    );
    const apply = () => setMarquee(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  // Marquee tween: runs only once the marquee DOM is mounted, so
  // track.scrollWidth is the doubled track's width. Only `x` (a transform)
  // animates, so it stays on the GPU and never triggers layout. The modifier
  // wraps the value into (-half, 0] for a jointless, non-drifting loop.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!marquee || !track) return;

    const gsap = getGsap();
    const half = track.scrollWidth / 2;
    if (half <= 0) return;

    const speed = 70; // px/sec, so long and short galleries feel consistent.
    const duration = Math.max(half / speed, 12);

    const tween = gsap.to(track, {
      x: -half,
      duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (value) => `${parseFloat(value) % half}px`,
      },
    });
    tweenRef.current = tween;

    // Freeze on hover, resume on leave. Native pointerenter/pointerleave are
    // true boundary events: they fire once on the strip element regardless of
    // which inner tile the cursor is over, so crossing between tiles never
    // stutters the pause. (React's onMouseEnter is derived from delegated
    // events and is noisier across a nested subtree.)
    const strip = stripRef.current;
    const pause = () => tween.pause();
    const resume = () => tween.resume();
    strip?.addEventListener("pointerenter", pause);
    strip?.addEventListener("pointerleave", resume);

    return () => {
      strip?.removeEventListener("pointerenter", pause);
      strip?.removeEventListener("pointerleave", resume);
      tween.kill();
      tweenRef.current = null;
      gsap.set(track, { x: 0 });
    };
  }, [marquee, images.length]);

  // Static, tidy grid for reduced-motion / touch (and the pre-hydration SSR
  // paint). Fixed-height rows keep varied aspect ratios honest; tap opens the
  // lightbox. No auto-scroll, no hover-enlarge.
  if (!marquee) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {/* Static, no-animation grid: reduced-motion, touch, and SSR paint. */}
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="h-40 sm:h-44"
          >
            <FilmstripTile image={image} onClick={() => onOpen(index)} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={stripRef} className="filmstrip relative select-none">
      {/* Edge fades so items enter and exit the frame instead of hard-clipping. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg-0)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg-0)] to-transparent"
      />
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="filmstrip-track flex h-64 w-max items-stretch gap-4 will-change-transform sm:h-72"
        >
          {doubled.map((image, index) => (
            <FilmstripTile
              key={`${image.src}-${index}`}
              image={image}
              onClick={() => onOpen(index % images.length)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  images: WorkImage[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const image = images[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Keyboard: Escape closes, arrows page through the gallery.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNext, onPrev]);

  // Lock body scroll while the lightbox is open, and move focus to the close
  // button so the Escape / arrow handlers work without a manual click first.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const hasMultiple = images.length > 1;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={image.label ? `Gallery: ${image.label}` : "Gallery image"}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
    >
      {/* Backdrop: click to dismiss. */}
      <button
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-[rgba(6,6,7,0.86)] backdrop-blur-sm"
      />

      {/* Close button. */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-bright)] bg-[var(--bg-2)] text-[var(--text-1)] outline-none transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--text-0)] focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      {/* Content: constrained so the full-size media fits the viewport with its
          caption, and clicks inside do not fall through to the backdrop. */}
      <figure className="relative z-10 flex max-h-full w-full max-w-5xl flex-col items-center">
        <div className="relative flex max-h-[78vh] w-full items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-bright)] bg-[var(--bg-1)]">
          {image.video ? (
            <video
              className="max-h-[78vh] w-auto max-w-full object-contain"
              poster={image.src}
              src={image.video}
              autoPlay
              muted
              loop
              playsInline
              controls
              aria-label={image.alt}
            />
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              width={1600}
              height={1200}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto max-h-[78vh] w-auto max-w-full object-contain"
              priority
            />
          )}
        </div>

        <figcaption className="mt-4 flex w-full items-center justify-between gap-4">
          <span className="text-sm text-[var(--text-1)]">
            {image.label ?? image.alt}
          </span>
          {hasMultiple ? (
            <span className="mono-label shrink-0 text-xs text-[var(--text-2)]">
              {index + 1} / {images.length}
            </span>
          ) : null}
        </figcaption>
      </figure>

      {/* Prev / next controls. */}
      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-bright)] bg-[var(--bg-2)] text-[var(--text-1)] outline-none transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--text-0)] focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:left-4"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-bright)] bg-[var(--bg-2)] text-[var(--text-1)] outline-none transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--text-0)] focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:right-4"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      ) : null}
    </div>
  );
}
