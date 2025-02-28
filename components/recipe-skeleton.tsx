import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function RecipeSkeleton() {
  return (
    <Card className="overflow-hidden border-2 shadow-lg animate-pulse">
      <CardHeader className="bg-primary/10 pb-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="mt-2 flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Skeleton className="h-64 w-full" />
        <div className="p-6">
          <Skeleton className="mb-4 h-10 w-full" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

