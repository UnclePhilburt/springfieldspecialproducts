import { Skeleton } from "@/components/ui/Skeleton";

export default function RepairsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-5 w-20 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Skeleton className="h-9 w-56 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-6" />
          <Skeleton className="aspect-video w-full rounded-lg mb-6" />
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-52" />
            <Skeleton className="h-4 w-44" />
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
          <Skeleton className="h-7 w-48 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
