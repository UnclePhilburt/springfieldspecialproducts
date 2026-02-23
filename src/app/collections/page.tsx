import { Metadata } from "next";
import Link from "next/link";
import { getTopLevelCollections } from "@/data/collections";
import CollectionCard from "@/components/ui/CollectionCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "All Collections",
  description:
    "Browse all product collections from Springfield Special Products. RV skirts, trailer covers, custom tarps, and more.",
};

export default function CollectionsPage() {
  const collections = getTopLevelCollections();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Collections" }]} />

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark-800">
          All Products
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Everything we build — from RV skirts and trailer covers to custom
          tarps and safety mats. All made by hand in Springfield, Missouri.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>

      <div className="mt-12 text-center bg-gray-50 rounded-xl p-8">
        <h2 className="text-lg font-bold text-dark-800 mb-2">
          Not sure where to start?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Give us a call and we&apos;ll help you figure out exactly what you need.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="tel:4178648461"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-dark-900 font-semibold rounded-lg hover:bg-brand-400 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (417) 864-8461
          </a>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-sm"
          >
            Send Us a Message
          </Link>
        </div>
      </div>
    </div>
  );
}
