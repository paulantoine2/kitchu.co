import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="w-full space-y-2">
      <Skeleton className="h-[400px] w-full" />
      <Skeleton className="h-[35px] w-1/2" />
      <Skeleton className="h-[20px] w-1/4" />
    </div>
  )
}
