import { CHARACTERS, Character, CharacterId } from "@/data/characters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  selected: CharacterId | null;
  onSelect: (id: CharacterId) => void;
  onConfirm: () => void;
}

export const CharacterPicker = ({ selected, onSelect, onConfirm }: Props) => {
  const sel: Character | undefined = CHARACTERS.find((c) => c.id === selected);
  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-black mb-3 bg-gradient-hero bg-clip-text text-transparent">
          Choose your guide
        </h1>
        <p className="text-muted-foreground text-lg">Pick a companion to learn Spanish with — from kid-friendly to grown-up.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {CHARACTERS.map((c) => {
          const active = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={cn(
                "group relative bg-gradient-card rounded-3xl p-5 text-left border-2 shadow-card transition-bounce hover:-translate-y-1 hover:shadow-pop",
                active ? "border-primary shadow-pop -translate-y-1" : "border-border hover:border-primary/50",
              )}
            >
              {active && (
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-pop animate-bounce-in">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className="aspect-square w-full overflow-hidden flex items-center justify-center mb-3">
                <img
                  src={c.image}
                  alt={c.name}
                  className={cn("w-full h-full object-contain transition-bounce", active ? "animate-float" : "group-hover:scale-105")}
                  loading="lazy"
                />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">{c.audience}</div>
              <div className="text-xl font-extrabold mt-0.5">{c.name}</div>
              <div className="text-sm text-muted-foreground">{c.vibe}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          disabled={!sel}
          onClick={onConfirm}
          className="rounded-full font-extrabold px-10 shadow-pop bg-gradient-hero text-primary-foreground border-0 hover:opacity-90 disabled:opacity-50"
        >
          {sel ? `Continue with ${sel.name} →` : "Pick a character to start"}
        </Button>
      </div>
    </div>
  );
};
