import { Zap, Shield } from "lucide-react";

export function MvdBanner() {
  return (
    <div className="glass-card overflow-hidden border-yellow-500/20">
      <div className="h-0.5 bg-gradient-to-r from-yellow-500 to-amber-500" />
      <div className="flex items-start gap-3 p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10">
          <Zap className="h-4 w-4 text-yellow-400" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-yellow-300 flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            Minimum Viable Day
          </p>
          <p className="mt-1 text-xs leading-relaxed text-yellow-300/60">
            Low readiness detected. Today focuses on movement quality with reduced
            volume to protect your recovery.
          </p>
        </div>
      </div>
    </div>
  );
}
