import { Question } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface Props {
  question: Question;
  selected: number | null;
  revealed: boolean;
  onSelect: (i: number) => void;
  questionNumber: number;
  total: number;
}

export const QuizCard = ({ question, selected, revealed, onSelect, questionNumber, total }: Props) => {
  return (
    <div className="w-full max-w-2xl bg-gradient-card rounded-3xl shadow-card border-2 border-border p-6 sm:p-8 animate-scale-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Question {questionNumber} of {total}
        </span>
        <span className="text-xs font-bold text-primary uppercase tracking-wider">English → Español</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 leading-tight">
        {question.prompt}
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {question.answers.map((answer, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correct;
          const showCorrect = revealed && isCorrect;
          const showWrong = revealed && isSelected && !isCorrect;

          return (
            <Button
              key={i}
              variant="outline"
              disabled={revealed}
              onClick={() => onSelect(i)}
              className={cn(
                "h-auto min-h-16 text-lg font-bold rounded-2xl border-2 transition-bounce justify-between px-5 py-4 whitespace-normal text-left",
                "hover:scale-[1.02] hover:shadow-soft hover:border-primary hover:bg-primary/5",
                isSelected && !revealed && "border-accent bg-accent/10 scale-[1.02]",
                showCorrect && "border-success bg-success/15 text-success animate-pop",
                showWrong && "border-destructive bg-destructive/10 text-destructive animate-shake",
                revealed && !isSelected && !isCorrect && "opacity-50",
              )}
            >
              <span className="flex-1">{answer}</span>
              {showCorrect && <Check className="w-6 h-6 shrink-0" />}
              {showWrong && <X className="w-6 h-6 shrink-0" />}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
