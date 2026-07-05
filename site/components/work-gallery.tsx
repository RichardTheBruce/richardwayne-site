import Image from "next/image";
import type { WorkImage } from "@/lib/work";

// Full landing-page captures are very tall (7000px+). Rendering them at
// natural aspect ratio would dominate the page, so anything without a
// width/height pairing that fits a normal frame renders inside a fixed
// max-height frame that scrolls internally, styled to look intentional
// rather than clipped.
const SCROLL_FRAME_SOURCES = new Set([
  "/work/memetropolis-landing.png",
  "/work/ppe-rebuild-landing.png",
]);

function GalleryFrame({ image }: { image: WorkImage }) {
  const isScrollFrame = SCROLL_FRAME_SOURCES.has(image.src);

  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-2)]">
      {isScrollFrame ? (
        <div className="max-h-[720px] overflow-y-auto">
          <Image
            src={image.src}
            alt={image.alt}
            width={1440}
            height={7739}
            className="w-full"
            sizes="(min-width: 1024px) 900px, 100vw"
          />
        </div>
      ) : (
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover object-top"
          />
        </div>
      )}
      {image.label ? (
        <figcaption className="mono-label border-t border-[var(--border)] px-4 py-3 text-xs text-[var(--text-2)]">
          {image.label}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function WorkGallery({ images }: { images: WorkImage[] }) {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {images.map((image) => (
        <GalleryFrame key={image.src} image={image} />
      ))}
    </div>
  );
}
