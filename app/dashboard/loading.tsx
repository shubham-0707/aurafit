export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="shimmer h-8 w-64 rounded-lg" />
        <div className="shimmer mt-2 h-4 w-40 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="shimmer h-48 rounded-2xl md:row-span-2" />
        <div className="shimmer h-24 rounded-2xl md:col-span-2" />
        <div className="flex gap-3 md:col-span-2">
          <div className="shimmer h-20 flex-1 rounded-2xl" />
          <div className="shimmer h-20 flex-1 rounded-2xl" />
          <div className="shimmer h-20 flex-1 rounded-2xl" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="shimmer h-6 w-40 rounded-lg" />
        <div className="shimmer h-52 rounded-2xl" />
        <div className="shimmer h-72 rounded-2xl" />
      </div>
    </div>
  );
}
