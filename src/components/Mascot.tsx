import mascotImg from "@/assets/mascot-fox.png";
import { cn } from "@/lib/utils";

type Mood = "happy" | "cheer" | "sad" | "think" | "wave";

const MESSAGES: Record<Mood, string[]> = {
  happy: ["¡Vamos! Let's learn together!", "You've got this!", "I'm so proud of you!"],
  cheer: ["¡Excelente! Amazing!", "¡Muy bien! Keep going!", "You're on fire! 🔥"],
  sad: ["¡No te preocupes! Don't worry, try again!", "Mistakes help us learn!", "Let's review and grow!"],
  think: ["Take your time…", "Read carefully!", "You can do it!"],
  wave: ["¡Hola amigo! I'm Lumi the fox!", "Ready for some Spanish?", "¡Bienvenido!"],
};

interface MascotProps {
  mood?: Mood;
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Mascot = ({ mood = "happy", message, size = "md", className }: MascotProps) => {
  const sizes = { sm: "w-20 h-20", md: "w-32 h-32 sm:w-40 sm:h-40", lg: "w-48 h-48 sm:w-64 sm:h-64" };
  const text = message ?? MESSAGES[mood][Math.floor(Math.random() * MESSAGES[mood].length)];
  const animation =
    mood === "cheer" ? "animate-bounce-in" : mood === "sad" ? "animate-shake" : mood === "wave" ? "animate-wiggle" : "animate-float";

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <img
        src={mascotImg}
        alt="Lumi the fox mascot"
        className={cn(sizes[size], animation, "drop-shadow-xl select-none")}
        draggable={false}
      />
      {text && (
        <div className="relative max-w-xs animate-fade-in">
          <div className="bg-card text-card-foreground rounded-2xl px-4 py-3 shadow-card text-sm sm:text-base font-medium text-center border-2 border-primary/20">
            {text}
          </div>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l-2 border-t-2 border-primary/20 rotate-45" />
        </div>
      )}
    </div>
  );
};
