import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const maxPrice = Math.max(...product.variants.map((v) => v.price));
  const hasRange = minPrice !== maxPrice;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md hover:border-brand-300 transition-all"
    >
      <div className="aspect-square relative bg-gray-50">
        <Image
          src={product.images[0] || "/images/placeholder-product.svg"}
          alt={product.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-dark-800 group-hover:text-brand-700 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-dark-800">
          {hasRange ? `From ${formatPrice(minPrice)}` : formatPrice(minPrice)}
        </p>
        {product.inStock ? (
          <span className="mt-2 inline-block text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
            In Stock
          </span>
        ) : (
          <span className="mt-2 inline-block text-xs text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
            Out of Stock
          </span>
        )}
      </div>
    </Link>
  );
}
