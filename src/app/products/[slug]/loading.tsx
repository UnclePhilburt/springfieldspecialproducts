import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-5 w-56 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <Skeleton className="aspect-square rounded-lg" />
        <div>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-7 w-24 mt-4" />
          <Skeleton className="h-12 w-full mt-6 rounded-lg" />
          <Skeleton className="h-4 w-full mt-8" />
          <Skeleton className="h-4 w-5/6 mt-2" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </div>
      </div>
    </div>
  );
}
