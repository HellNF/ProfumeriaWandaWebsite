export function ProductSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="aspect-[4/5] bg-wanda-surface-mid rounded-xl" />
      <div className="space-y-2">
        <div className="h-4 bg-wanda-surface-mid rounded w-1/3" />
        <div className="h-6 bg-wanda-surface-mid rounded w-3/4" />
        <div className="h-5 bg-wanda-surface-mid rounded w-1/4" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
