/**
 * Gallery photos per category.
 *
 * To add photos:
 *  1. Drop images into public/images/gallery/<category>/
 *  2. Add an entry here with the path and a short alt description.
 */

export interface GalleryPhoto {
  src: string;
  alt: string;
}

export const galleryPhotos: Record<string, GalleryPhoto[]> = {
  "stock-trailer-covers": [
    { src: "/images/StockTrailer.png", alt: "Stock trailer cover" },
    // Add more: { src: "/images/gallery/stock-trailer-covers/photo2.jpg", alt: "Description" },
  ],
  "rollover-tarps": [
    { src: "/images/rollovertarp.jpg", alt: "Rollover tarp" },
    { src: "/images/rollovertarp2.jpg", alt: "Rollover tarp" },
  ],
  "dump-truck-tarps": [
    // { src: "/images/gallery/dump-truck-tarps/photo1.jpg", alt: "Dump truck tarp" },
  ],
  "agriculture-tarps": [
    { src: "/images/fertilizerbuggy.jpg", alt: "Fertilizer buggy cover" },
  ],
  "custom-tarps": [
    { src: "/images/customtarp.png", alt: "Custom tarp" },
    // Add more: { src: "/images/gallery/custom-tarps/photo2.jpg", alt: "Description" },
  ],
  "rv-skirts": [
    { src: "/images/rvskirt.png", alt: "RV skirt installed" },
    // Add more: { src: "/images/gallery/rv-skirts/photo2.jpg", alt: "Description" },
  ],
  "safety-foam-mats": [
    { src: "/images/foammat1.jpg", alt: "Safety foam mat" },
    { src: "/images/foammat2.jpg", alt: "Safety foam mat" },
    { src: "/images/foammat3.jpg", alt: "Safety foam mat" },
    { src: "/images/foammat4.jpg", alt: "Safety foam mat" },
    { src: "/images/foammat5.jpg", alt: "Safety foam mat" },
  ],
};
