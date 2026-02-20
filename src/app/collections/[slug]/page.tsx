import { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, getCollectionBySlug, getSubCollections } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import CollectionCard from "@/components/ui/CollectionCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const collection = getCollectionBySlug(slug);
    return {
      title: collection?.name || "Collection",
      description: collection?.description,
    };
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(slug);
  const subCollections = getSubCollections(slug);

  const breadcrumbs = collection.parentSlug
    ? [
        { label: "Collections", href: "/collections" },
        {
          label:
            getCollectionBySlug(collection.parentSlug)?.name || "Parent",
          href: `/collections/${collection.parentSlug}`,
        },
        { label: collection.name },
      ]
    : [{ label: "Collections", href: "/collections" }, { label: collection.name }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{collection.name}</h1>
        <p className="mt-2 text-gray-600 max-w-2xl">{collection.description}</p>
      </div>

      {/* Sub-collections */}
      {subCollections.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subCollections.map((sub) => (
              <CollectionCard key={sub.id} collection={sub} />
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      {products.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Products ({products.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        subCollections.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">
              No products in this collection yet.
            </p>
            <Link
              href="/collections"
              className="text-brand-700 font-medium hover:text-brand-800"
            >
              Browse all collections &rarr;
            </Link>
          </div>
        )
      )}
    </div>
  );
}
