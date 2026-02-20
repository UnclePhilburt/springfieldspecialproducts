import Link from "next/link";
import Image from "next/image";
import { Collection } from "@/lib/types";
import { getProductsByCollection } from "@/data/products";

export default function CollectionCard({ collection }: { collection: Collection }) {
  const productCount = getProductsByCollection(collection.slug).length;

  return (
    <Link
      href={collection.href || `/collections/${collection.slug}`}
      className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md hover:border-brand-300 transition-all"
    >
      <div className="aspect-[2/1] relative bg-brand-50">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
          {collection.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {collection.description}
        </p>
        <p className="mt-2 text-xs text-gray-400">
          {productCount} {productCount === 1 ? "product" : "products"}
        </p>
      </div>
    </Link>
  );
}
