import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface TableSkeletonProps {
  rows?: number
  columns?: number
}

export function TableSkeleton({ rows = 5, columns = 5 }: TableSkeletonProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          {/* Table header */}
          <div className="border-b bg-gray-50 dark:bg-gray-800 p-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-4" />
              {[...Array(columns)].map((_, i) => (
                <Skeleton key={i} className="h-4 flex-1" />
              ))}
            </div>
          </div>

          {/* Table rows */}
          {[...Array(rows)].map((_, rowIndex) => (
            <div key={rowIndex} className="border-b p-4 last:border-b-0">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-4" />
                {[...Array(columns)].map((_, colIndex) => (
                  <Skeleton
                    key={colIndex}
                    className="h-4 flex-1"
                    style={{
                      width: `${Math.random() * 30 + 70}%`
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-4 w-48" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}