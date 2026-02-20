import { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import { getCollectionBySlug } from "@/data/collections";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbs} />
      <ProductPageClient product={product} />
    </div>
  );
}
