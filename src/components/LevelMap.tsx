import { LEVEL_ORDER, Level, STAGE_INFO } from "@/data/questions";
import { cn } from "@/lib/utils";
import { Lock, Check } from "lucide-react";

interface Props {
  unlocked: Level; // highest unlocked level
  current: Level;
  completed: Set<Level>;
  onPick: (lvl: Level) => void;
}

export const LevelMap = ({ unlocked, current, completed, onPick }: Props) => {
  const unlockedIdx = LEVEL_ORDER.indexOf(unlocked);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {LEVEL_ORDER.map((lvl) => {
        const info = STAGE_INFO[lvl];
        const idx = LEVEL_ORDER.indexOf(lvl);
        const isLocked = idx > unlockedIdx;
        const isCurrent = lvl === current;
        const isDone = completed.has(lvl);

        return (
          <button
            key={lvl}
            disabled={isLocked}
            onClick={() => onPick(lvl)}
            className={cn(
              "relative rounded-3xl border-2 p-5 text-left transition-bounce bg-gradient-card shadow-card",
              isLocked && "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-60",
              !isLocked && "hover:-translate-y-0.5 hover:shadow-pop",
              isCurrent && !isLocked && "border-primary bg-primary/10 text-primary shadow-pop",
              !isCurrent && !isLocked && "border-border hover:border-primary",
              isDone && "border-success bg-success/10 text-success",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-3xl mb-2">{info.emoji}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary">{lvl}</div>
                <div className="font-extrabold text-lg leading-tight">{info.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{info.tagline}</div>
              </div>
              <div className="shrink-0 mt-1">
                {isLocked ? <Lock className="w-4 h-4" /> : isDone ? <Check className="w-4 h-4" /> : null}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
