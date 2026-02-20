import { Product } from "@/lib/types";

export const products: Product[] = [
  // ── RV Skirts ─────────────────────────────────────────────────
  {
    id: "rv-skirting",
    name: "Custom RV Skirting Kit",
    slug: "rv-skirting",
    description:
      "Custom-fitted RV skirting made with premium 18 oz vinyl. Prevents frozen pipes, cuts heating costs, and protects your RV's underside from harsh winter weather. Each kit is cut to your RV's exact perimeter measurement and includes all necessary hardware for installation. Available in four colors to match your RV.",
    shortDescription: "Custom 18 oz vinyl RV skirting kit with hardware",
    price: 610,
    images: ["/images/placeholder-product.svg"],
    options: [
      { name: "Length", values: ["50 ft", "55 ft", "60 ft", "65 ft", "70 ft", "75 ft", "80 ft", "85 ft", "90 ft", "95 ft", "100 ft"] },
      { name: "Color", values: ["Black", "White", "Tan", "Gray"] },
    ],
    variants: [
      { id: "rv-50-bk", name: "50 ft / Black", sku: "RVS-50-BK", price: 610, inStock: true },
      { id: "rv-50-wh", name: "50 ft / White", sku: "RVS-50-WH", price: 610, inStock: true },
      { id: "rv-50-tn", name: "50 ft / Tan", sku: "RVS-50-TN", price: 610, inStock: true },
      { id: "rv-50-gy", name: "50 ft / Gray", sku: "RVS-50-GY", price: 610, inStock: true },
      { id: "rv-60-bk", name: "60 ft / Black", sku: "RVS-60-BK", price: 730, inStock: true },
      { id: "rv-60-wh", name: "60 ft / White", sku: "RVS-60-WH", price: 730, inStock: true },
      { id: "rv-60-tn", name: "60 ft / Tan", sku: "RVS-60-TN", price: 730, inStock: true },
      { id: "rv-60-gy", name: "60 ft / Gray", sku: "RVS-60-GY", price: 730, inStock: true },
      { id: "rv-70-bk", name: "70 ft / Black", sku: "RVS-70-BK", price: 850, inStock: true },
      { id: "rv-70-wh", name: "70 ft / White", sku: "RVS-70-WH", price: 850, inStock: true },
      { id: "rv-70-tn", name: "70 ft / Tan", sku: "RVS-70-TN", price: 850, inStock: true },
      { id: "rv-70-gy", name: "70 ft / Gray", sku: "RVS-70-GY", price: 850, inStock: true },
      { id: "rv-80-bk", name: "80 ft / Black", sku: "RVS-80-BK", price: 960, inStock: true },
      { id: "rv-80-wh", name: "80 ft / White", sku: "RVS-80-WH", price: 960, inStock: true },
      { id: "rv-80-tn", name: "80 ft / Tan", sku: "RVS-80-TN", price: 960, inStock: true },
      { id: "rv-80-gy", name: "80 ft / Gray", sku: "RVS-80-GY", price: 960, inStock: true },
      { id: "rv-90-bk", name: "90 ft / Black", sku: "RVS-90-BK", price: 1070, inStock: true },
      { id: "rv-90-wh", name: "90 ft / White", sku: "RVS-90-WH", price: 1070, inStock: true },
      { id: "rv-90-tn", name: "90 ft / Tan", sku: "RVS-90-TN", price: 1070, inStock: true },
      { id: "rv-90-gy", name: "90 ft / Gray", sku: "RVS-90-GY", price: 1070, inStock: true },
      { id: "rv-100-bk", name: "100 ft / Black", sku: "RVS-100-BK", price: 1180, inStock: true },
      { id: "rv-100-wh", name: "100 ft / White", sku: "RVS-100-WH", price: 1180, inStock: true },
      { id: "rv-100-tn", name: "100 ft / Tan", sku: "RVS-100-TN", price: 1180, inStock: true },
      { id: "rv-100-gy", name: "100 ft / Gray", sku: "RVS-100-GY", price: 1180, inStock: true },
    ],
    specs: [
      { label: "Material", value: "18 oz vinyl" },
      { label: "Height", value: "Custom to your RV" },
      { label: "Hardware", value: "Included" },
      { label: "Colors", value: "Black, White, Tan, Gray" },
    ],
    categorySlug: "rv-skirts",
    collectionSlugs: ["rv-skirts"],
    inStock: true,
    featured: true,
  },
  {
    id: "fifth-wheel-skirt-addon",
    name: "Fifth-Wheel Skirt Add-On",
    slug: "fifth-wheel-skirt-addon",
    description:
      "Add-on skirting panel designed specifically for the front hitch area of fifth-wheel RVs. Pairs with our standard RV skirting kits to provide complete coverage around the pin box and landing gear.",
    shortDescription: "Fifth-wheel front hitch area skirting add-on",
    price: 345,
    images: ["/images/placeholder-product.svg"],
    options: [{ name: "Color", values: ["Black", "White", "Tan", "Gray"] }],
    variants: [
      { id: "5w-bk", name: "Black", sku: "5W-BK", price: 345, inStock: true },
      { id: "5w-wh", name: "White", sku: "5W-WH", price: 345, inStock: true },
      { id: "5w-tn", name: "Tan", sku: "5W-TN", price: 345, inStock: true },
      { id: "5w-gy", name: "Gray", sku: "5W-GY", price: 345, inStock: true },
    ],
    specs: [
      { label: "Material", value: "18 oz vinyl" },
      { label: "Fits", value: "Fifth-wheel front hitch area" },
      { label: "Hardware", value: "Included" },
    ],
    categorySlug: "rv-skirts",
    collectionSlugs: ["rv-skirts"],
    inStock: true,
    featured: false,
  },

  // ── Custom Design Tarps ─────────────────────────────────────
  {
    id: "custom-design-tarp",
    name: "Custom Design Tarp",
    slug: "custom-design-tarp",
    description:
      "Fully custom tarp built to your exact specifications. Choose your dimensions, vinyl weight, color, grommet spacing, and reinforcement options. We'll manufacture it in our Springfield shop and ship it ready to use. Call us or submit a quote request with your measurements.",
    shortDescription: "Made-to-order tarp built to your specifications",
    price: 200,
    images: ["/images/placeholder-product.svg"],
    options: [],
    variants: [
      { id: "cdt-default", name: "Default", sku: "CDT-CUSTOM", price: 200, inStock: true },
    ],
    specs: [
      { label: "Material", value: "18 oz or 22 oz vinyl" },
      { label: "Seams", value: "Heat-welded" },
      { label: "Colors", value: "Multiple options available" },
      { label: "Sizing", value: "Custom to your specs" },
    ],
    categorySlug: "custom-design-tarps",
    collectionSlugs: ["custom-design-tarps"],
    inStock: true,
    featured: false,
  },

];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collectionSlugs.includes(collectionSlug));
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getAllProducts(): Product[] {
  return products;
}
