import { Skeleton } from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <Skeleton className="h-12 w-3/4 max-w-xl bg-gray-700" />
          <Skeleton className="h-6 w-1/2 max-w-md mt-6 bg-gray-700" />
          <div className="mt-8 flex gap-4">
            <Skeleton className="h-12 w-40 bg-gray-700 rounded-lg" />
            <Skeleton className="h-12 w-36 bg-gray-700 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Categories skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Skeleton className="h-8 w-56 mb-8" />
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
    </>
  );
}
