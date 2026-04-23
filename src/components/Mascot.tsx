import { Character } from "@/data/characters";
import { cn } from "@/lib/utils";

type Mood = "happy" | "cheer" | "sad" | "wave";

interface MascotProps {
  character: Character;
  mood?: Mood;
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Mascot = ({ character, mood = "happy", message, size = "md", className }: MascotProps) => {
  const sizes = {
    sm: "w-20 h-20",
    md: "w-32 h-32 sm:w-40 sm:h-40",
    lg: "w-48 h-48 sm:w-64 sm:h-64",
  };
  const pool = character.messages[mood];
  const text = message ?? pool[Math.floor(Math.random() * pool.length)];
  const animation =
    mood === "cheer" ? "animate-bounce-in" : mood === "sad" ? "animate-shake" : mood === "wave" ? "animate-wiggle" : "animate-float";

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <img
        src={character.image}
        alt={`${character.name} mascot`}
        className={cn(sizes[size], animation, "drop-shadow-xl select-none object-contain")}
        draggable={false}
        loading="lazy"
      />
      {text && (
        <div className="relative max-w-xs animate-fade-in">
          <div className="bg-card text-card-foreground rounded-2xl px-4 py-3 shadow-card text-sm sm:text-base font-medium text-center border-2 border-primary/20">
            <span className="block text-[10px] uppercase tracking-wider text-primary font-bold mb-0.5">
              {character.name}
            </span>
            {text}
          </div>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l-2 border-t-2 border-primary/20 rotate-45" />
        </div>
      )}
    </div>
  );
};
