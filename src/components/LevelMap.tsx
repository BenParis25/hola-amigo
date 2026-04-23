import { LEVEL_ORDER, Level, STAGE_INFO } from "@/data/questions";
import { cn } from "@/lib/utils";
import { Lock, Check } from "lucide-react";

interface Props {
  unlocked: Level; // highest unlocked level
  current: Level;
  completed: Set<Level>;
  onPick: (lvl: Level) => void;
}

const STAGES = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export const LevelMap = ({ unlocked, current, completed, onPick }: Props) => {
  const unlockedIdx = LEVEL_ORDER.indexOf(unlocked);

  return (
    <div className="space-y-6">
      {STAGES.map((stage) => {
        const info = STAGE_INFO[stage];
        const stageLevels = LEVEL_ORDER.filter((l) => l.startsWith(stage));
        return (
          <section key={stage} className="bg-gradient-card rounded-3xl border-2 border-border shadow-card p-5">
            <header className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{info.emoji}</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">{stage}</div>
                  <div className="font-extrabold text-lg leading-tight">{info.title}</div>
                  <div className="text-xs text-muted-foreground">{info.tagline}</div>
                </div>
              </div>
            </header>
            <div className="grid grid-cols-3 gap-3">
              {stageLevels.map((lvl) => {
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
                      "relative rounded-2xl border-2 p-3 text-center font-extrabold transition-bounce",
                      isLocked && "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-60",
                      !isLocked && "hover:-translate-y-0.5 hover:shadow-soft",
                      isCurrent && !isLocked && "border-primary bg-primary/10 text-primary shadow-pop",
                      !isCurrent && !isLocked && "border-border bg-card hover:border-primary",
                      isDone && "border-success bg-success/10 text-success",
                    )}
                  >
                    <div className="text-base">{lvl}</div>
                    <div className="absolute top-1.5 right-1.5">
                      {isLocked ? (
                        <Lock className="w-3.5 h-3.5" />
                      ) : isDone ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
