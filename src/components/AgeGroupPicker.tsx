import { Button } from "@/components/ui/button";
import { AGE_GROUPS, AgeGroupId } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  selected: AgeGroupId | null;
  onSelect: (id: AgeGroupId) => void;
  onConfirm: () => void;
}

export const AgeGroupPicker = ({ selected, onSelect, onConfirm }: Props) => {
  const active = AGE_GROUPS.find((group) => group.id === selected);

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-black mb-3 text-gradient-hero">Pick your age group</h1>
        <p className="text-muted-foreground text-lg">
          This shapes the tone of the experience, but everyone starts with the easiest Spanish words.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {AGE_GROUPS.map((group) => {
          const isActive = selected === group.id;

          return (
            <button
              key={group.id}
              onClick={() => onSelect(group.id)}
              className={cn(
                "group relative bg-gradient-card rounded-3xl p-5 text-left border-2 shadow-card transition-bounce hover:-translate-y-1 hover:shadow-pop",
                isActive ? "border-primary shadow-pop -translate-y-1" : "border-border hover:border-primary/50",
              )}
            >
              {isActive && (
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-pop animate-bounce-in">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-background/60 border border-border flex items-center justify-center text-2xl shadow-soft">
                  {group.emoji}
                </div>
                <div className="flex-1">
                  <div className="text-xl font-extrabold">{group.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">{group.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          disabled={!active}
          onClick={onConfirm}
          className="rounded-full font-extrabold px-10 shadow-pop bg-gradient-hero text-primary-foreground border-0 hover:opacity-90 disabled:opacity-50"
        >
          {active ? `Start with ${active.label} →` : "Pick an age group to continue"}
        </Button>
      </div>
    </div>
  );
};