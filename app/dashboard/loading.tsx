export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 space-y-4">
        <div className="h-8 w-64 animate-pulse rounded bg-white/5" />
        <div className="flex items-center gap-6">
          <div className="h-[120px] w-[120px] animate-pulse rounded-full bg-white/5" />
          <div className="h-16 w-48 animate-pulse rounded-xl bg-white/5" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-48 animate-pulse rounded-2xl bg-white/5" />
        <div className="h-64 animate-pulse rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}
