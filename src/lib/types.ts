export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  specs: ProductSpec[];
  categorySlug: string;
  collectionSlugs: string[];
  inStock: boolean;
  featured: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  href?: string;
  parentSlug?: string;
  featured: boolean;
  displayOrder: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}
