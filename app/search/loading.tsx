import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container">
      <div className="grid grid-cols-5 gap-6 my-4">
        <div className="space-y-3 transition-all animate-fade-in">
          <div className="overflow-hidden rounded-md aspect-square relative">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="w-11/12 h-6" />
            <Skeleton className="w-8/12 h-6 " />
          </div>
        </div>
        <div className="space-y-3 transition-all animate-fade-in">
          <div className="overflow-hidden rounded-md aspect-square relative">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="w-11/12 h-6" />
            <Skeleton className="w-8/12 h-6 " />
          </div>
        </div>
        <div className="space-y-3 transition-all animate-fade-in">
          <div className="overflow-hidden rounded-md aspect-square relative">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="w-11/12 h-6" />
            <Skeleton className="w-8/12 h-6 " />
          </div>
        </div>
        <div className="space-y-3 transition-all animate-fade-in">
          <div className="overflow-hidden rounded-md aspect-square relative">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="w-11/12 h-6" />
            <Skeleton className="w-8/12 h-6 " />
          </div>
        </div>
        <div className="space-y-3 transition-all animate-fade-in">
          <div className="overflow-hidden rounded-md aspect-square relative">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="w-11/12 h-6" />
            <Skeleton className="w-8/12 h-6 " />
          </div>
        </div>
      </div>
    </div>
  )
}
