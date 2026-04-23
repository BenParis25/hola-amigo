import { cn } from "@/lib/utils";

export const ProgressDots = ({ total, current, results }: { total: number; current: number; results: (boolean | null)[] }) => (
  <div className="flex gap-2 items-center justify-center">
    {Array.from({ length: total }).map((_, i) => {
      const r = results[i];
      return (
        <div
          key={i}
          className={cn(
            "h-2.5 rounded-full transition-bounce",
            i === current ? "w-8 bg-primary" : "w-2.5",
            r === true && "bg-success",
            r === false && "bg-destructive",
            r === null && i !== current && "bg-muted",
          )}
        />
      );
    })}
  </div>
);
