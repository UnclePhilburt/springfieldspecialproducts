import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getProductsByCollection } from "@/data/products";
import { getCollectionBySlug } from "@/data/collections";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import ProductPageClient from "./ProductPageClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product?.name || "Product",
    description: product?.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const collection = getCollectionBySlug(product.categorySlug);

  const breadcrumbs = [
    { label: "Collections", href: "/collections" },
    ...(collection
      ? [{ label: collection.name, href: `/collections/${collection.slug}` }]
      : []),
    { label: product.name },
  ];

  const relatedProducts = getProductsByCollection(product.categorySlug).filter(
    (p) => p.id !== product.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbs} />
      <ProductPageClient product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-dark-800 mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Next Actions */}
      <div className="mt-12 border-t border-gray-200 pt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
        {collection && (
          <Link
            href={collection.href || `/collections/${collection.slug}`}
            className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Browse {collection.name}
          </Link>
        )}
        <Link
          href="/build/custom-tarp"
          className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Build a Custom Tarp
        </Link>
        <Link
          href="/contact"
          className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
