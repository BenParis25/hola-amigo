import { LEVEL_INFO, Level } from "@/data/questions";
import { cn } from "@/lib/utils";

export const LevelBadge = ({ level, active = false, className }: { level: Level; active?: boolean; className?: string }) => {
  const info = LEVEL_INFO[level];
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2 font-bold text-sm transition-bounce border-2",
        active
          ? "bg-gradient-hero text-primary-foreground border-primary shadow-pop scale-105"
          : "bg-card text-muted-foreground border-border",
        className,
      )}
    >
      <span className="text-lg">{info.emoji}</span>
      <span>{level}</span>
      <span className="hidden sm:inline opacity-80">· {info.title}</span>
    </div>
  );
};
