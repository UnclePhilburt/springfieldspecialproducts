import { Metadata } from "next";
import { getTopLevelCollections } from "@/data/collections";
import CollectionCard from "@/components/ui/CollectionCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "All Collections",
  description:
    "Browse all product collections from Springfield Special Products. Ratchet straps, RV skirts, trailer covers, custom tarps, and more.",
};

export default function CollectionsPage() {
  const collections = getTopLevelCollections();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Collections" }]} />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}
