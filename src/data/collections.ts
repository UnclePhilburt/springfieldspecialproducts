import { Collection } from "@/lib/types";

export const collections: Collection[] = [
  {
    id: "rv-skirts",
    name: "RV Skirts",
    slug: "rv-skirts",
    description:
      "Custom-fitted RV skirting that prevents frozen pipes and cuts heating costs. Made with 18 oz vinyl in multiple colors.",
    image: "/images/rvskirt.png",
    href: "/build/rv-skirt",
    featured: true,
    displayOrder: 4,
  },
  {
    id: "trailer-covers",
    name: "Trailer Covers",
    slug: "trailer-covers",
    description:
      "Industrial-grade vinyl trailer covers and tarps built to withstand years of highway travel and extreme weather.",
    image: "/images/StockTrailer.png",
    featured: true,
    displayOrder: 5,
  },
  {
    id: "stock-trailer-covers",
    name: "Stock Trailer Covers",
    slug: "stock-trailer-covers",
    description:
      "Heavy-duty vinyl covers for stock trailers. Protects livestock from sun, rain, and wind during transport.",
    image: "/images/StockTrailer.png",
    href: "/quote/stock-trailer-cover",
    parentSlug: "trailer-covers",
    featured: false,
    displayOrder: 6,
  },
  {
    id: "rollover-tarps",
    name: "Rollover Tarps",
    slug: "rollover-tarps",
    description:
      "Heavy-duty vinyl rollover tarps for flatbed and open-top trailers. Cut to fit your frame with heat-welded seams.",
    image: "/images/rollovertarp2.jpg",
    href: "/quote/rollover-tarp",
    parentSlug: "trailer-covers",
    featured: false,
    displayOrder: 7,
  },
  {
    id: "dump-truck-tarps",
    name: "Dump Truck Tarps",
    slug: "dump-truck-tarps",
    description:
      "Heavy-duty tarps for dump trucks and roll-off containers. Built to handle daily abuse on construction sites.",
    image: "/images/placeholder-collection.svg",
    href: "/quote/dump-truck-tarp",
    parentSlug: "trailer-covers",
    featured: false,
    displayOrder: 8,
  },
  {
    id: "agriculture-tarps",
    name: "Agriculture Tarps",
    slug: "agriculture-tarps",
    description:
      "Durable vinyl tarps for grain trailers, hay covers, and agricultural equipment protection.",
    image: "/images/fertilizerbuggy.jpg",
    href: "/quote/agriculture-tarp",
    parentSlug: "trailer-covers",
    featured: false,
    displayOrder: 9,
  },
  {
    id: "custom-design-tarps",
    name: "Custom Design Tarps",
    slug: "custom-design-tarps",
    description:
      "Made-to-order tarps built to your exact specifications. Choose your size, material, color, and reinforcement options.",
    image: "/images/customtarp.png",
    href: "/build/custom-tarp",
    featured: true,
    displayOrder: 10,
  },
  {
    id: "safety-foam-mats",
    name: "Safety Foam Mats",
    slug: "safety-foam-mats",
    description:
      "Custom-cut safety foam mats for gyms, playgrounds, workshops, and industrial applications. Vinyl-covered closed-cell foam built to absorb impact.",
    image: "/images/foammat1.jpg",
    href: "/quote/safety-foam-mat",
    featured: false,
    displayOrder: 11,
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getFeaturedCollections(): Collection[] {
  return collections
    .filter((c) => c.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getTopLevelCollections(): Collection[] {
  return collections
    .filter((c) => !c.parentSlug)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getSubCollections(parentSlug: string): Collection[] {
  return collections
    .filter((c) => c.parentSlug === parentSlug)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}
