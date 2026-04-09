export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] animate-pulse">
      <div className="aspect-[2/3] bg-[hsl(240_12%_10%)]" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[hsl(240_12%_12%)] rounded-lg w-3/4" />
        <div className="h-3 bg-[hsl(240_12%_12%)] rounded-lg w-1/2" />
        <div className="h-3 bg-[hsl(240_12%_10%)] rounded-lg w-1/3" />
        <div className="h-5 bg-[hsl(240_12%_12%)] rounded-lg w-1/4 mt-2" />
      </div>
    </div>
  );
}

export function SkeletonWorldCard() {
  return (
    <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-[hsl(240_12%_10%)] animate-pulse" />
  );
}

export function SkeletonAuthorCard() {
  return (
    <div className="rounded-2xl bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] p-6 animate-pulse space-y-4">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-full bg-[hsl(240_12%_12%)]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[hsl(240_12%_12%)] rounded w-3/4" />
          <div className="h-3 bg-[hsl(240_12%_10%)] rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-[hsl(240_12%_10%)] rounded" />
        <div className="h-3 bg-[hsl(240_12%_10%)] rounded w-5/6" />
      </div>
    </div>
  );
}
