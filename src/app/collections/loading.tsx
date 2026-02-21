import { Skeleton } from "@/components/ui/Skeleton";

export default function CollectionsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-5 w-32 mb-6" />
      <Skeleton className="h-9 w-64 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
            <Skeleton className="aspect-[3/2] rounded-none" />
            <div className="p-6">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
