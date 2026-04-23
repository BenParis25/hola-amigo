import { useEffect, useRef, useState } from "react";
import { Character } from "@/data/characters";
import { cn } from "@/lib/utils";

interface Props {
  character: Character;
  size?: number; // px
  className?: string;
  paused?: boolean;
}

/**
 * A mascot that strolls back and forth across its container,
 * flips when it hits an edge, and bobs up and down like walking.
 */
export const WalkingMascot = ({ character, size = 64, className, paused = false }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(20);
  const [dir, setDir] = useState<1 | -1>(1);
  const lastTs = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const speed = 55; // px per second
    const tick = (ts: number) => {
      if (paused) {
        lastTs.current = ts;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (lastTs.current == null) lastTs.current = ts;
      const dt = (ts - lastTs.current) / 1000;
      lastTs.current = ts;

      const containerW = wrapRef.current?.clientWidth ?? 320;
      const max = Math.max(0, containerW - size);

      setX((prev) => {
        let next = prev + dir * speed * dt;
        if (next >= max) {
          next = max;
          setDir(-1);
        } else if (next <= 0) {
          next = 0;
          setDir(1);
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTs.current = null;
    };
  }, [dir, paused, size]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height: size + 8 }}
      aria-hidden
    >
      {/* ground shadow */}
      <div
        className="absolute bottom-0 rounded-[50%] bg-foreground/15 blur-sm transition-all"
        style={{
          width: size * 0.55,
          height: 8,
          transform: `translateX(${x + size * 0.225}px)`,
        }}
      />
      <div
        className="absolute bottom-0"
        style={{
          width: size,
          height: size,
          transform: `translateX(${x}px)`,
        }}
      >
        <img
          src={character.image}
          alt={`${character.name} walking`}
          className={cn(
            "w-full h-full object-contain select-none drop-shadow-md",
            !paused && "animate-walk-bob",
          )}
          style={{ transform: `scaleX(${dir})` }}
          draggable={false}
        />
      </div>
    </div>
  );
};
