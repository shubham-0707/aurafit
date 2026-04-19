interface AuraRingProps {
  streak: number;
  size?: number;
}

function getStreakColor(streak: number): string {
  if (streak >= 15) return "#a855f7"; // purple
  if (streak >= 8) return "#22c55e";  // green
  if (streak >= 4) return "#eab308";  // yellow
  return "#ef4444";                    // red
}

export function AuraRing({ streak, size = 120 }: AuraRingProps) {
  const color = getStreakColor(streak);
  const progress = Math.min(streak / 15, 1);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full animate-aura-glow"
        style={{
          background: `conic-gradient(${color} ${progress * 360}deg, transparent ${progress * 360}deg)`,
          mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #fff calc(100% - 5px))",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 6px), #fff calc(100% - 5px))",
          filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 20px ${color}40)`,
        }}
      />
      <span className="text-2xl font-bold text-foreground">{streak}</span>
      <style>{`
        @keyframes aura-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-aura-glow {
          animation: aura-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
