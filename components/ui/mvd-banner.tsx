import { Zap } from "lucide-react";

export function MvdBanner() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3">
      <Zap className="h-4 w-4 text-yellow-400" />
      <p className="text-sm text-yellow-300">
        <strong>Minimum Viable Day</strong> — Low readiness detected. Today
        focuses on movement quality with reduced volume.
      </p>
    </div>
  );
}
