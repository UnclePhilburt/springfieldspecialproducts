import { Skeleton } from "@/components/ui/Skeleton";

export default function CollectionLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-5 w-48 mb-6" />
      <Skeleton className="h-9 w-72 mb-2" />
      <Skeleton className="h-5 w-96 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
            <Skeleton className="aspect-square rounded-none" />
            <div className="p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-20 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
