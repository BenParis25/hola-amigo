import { useEffect, useMemo, useState } from "react";
import { LEVEL_INFO, LEVEL_ORDER, Level, Question, pickQuestions } from "@/data/questions";
import { Mascot } from "@/components/Mascot";
import { LevelBadge } from "@/components/LevelBadge";
import { QuizCard } from "@/components/QuizCard";
import { ProgressDots } from "@/components/ProgressDots";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw, Trophy, Heart } from "lucide-react";
import { toast } from "sonner";

type Stage = "home" | "quiz" | "results";

const QUESTIONS_PER_ROUND = 5;
const PASS_THRESHOLD = 5; // all 5 to advance
const DROP_THRESHOLD = 3; // 3 or less drops a level

const Index = () => {
  const [stage, setStage] = useState<Stage>("home");
  const [level, setLevel] = useState<Level>("A1.1");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const [streak, setStreak] = useState(0);

  const score = useMemo(() => results.filter((r) => r === true).length, [results]);

  useEffect(() => {
    document.title = "Lingo Fox · Learn Spanish with Lumi";
    const meta =
      document.querySelector('meta[name="description"]') ?? document.head.appendChild(document.createElement("meta"));
    meta.setAttribute("name", "description");
    meta.setAttribute("content", "Learn Spanish through fun A1.1, A1.2 and A1.3 quizzes guided by Lumi the fox mascot.");
  }, []);

  const startRound = (lvl: Level) => {
    setLevel(lvl);
    setQuestions(pickQuestions(lvl, QUESTIONS_PER_ROUND));
    setResults(Array(QUESTIONS_PER_ROUND).fill(null));
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setStage("quiz");
  };

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    const isRight = i === questions[current].correct;
    setResults((prev) => prev.map((r, idx) => (idx === current ? isRight : r)));
    if (isRight) {
      setStreak((s) => s + 1);
      toast.success("¡Correcto!", { description: "Great job!" });
    } else {
      setStreak(0);
      toast.error("¡Casi!", { description: `Correct: ${questions[current].answers[questions[current].correct]}` });
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setStage("results");
    }
  };

  const finishOutcome = useMemo(() => {
    if (stage !== "results") return null;
    const lvlIdx = LEVEL_ORDER.indexOf(level);
    if (score >= PASS_THRESHOLD && lvlIdx < LEVEL_ORDER.length - 1) {
      return { type: "advance" as const, nextLevel: LEVEL_ORDER[lvlIdx + 1] };
    }
    if (score >= PASS_THRESHOLD) return { type: "mastered" as const, nextLevel: level };
    if (score <= DROP_THRESHOLD && lvlIdx > 0) {
      return { type: "drop" as const, nextLevel: LEVEL_ORDER[lvlIdx - 1] };
    }
    if (score <= DROP_THRESHOLD) return { type: "retry" as const, nextLevel: level };
    return { type: "stay" as const, nextLevel: level };
  }, [stage, score, level]);

  // ---------- HOME ----------
  if (stage === "home") {
    return (
      <main className="min-h-screen bg-gradient-sky">
        <div className="container max-w-5xl mx-auto px-4 py-10 sm:py-16">
          <header className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-extrabold text-xl tracking-tight">Lingo Fox</span>
            </div>
            <div className="flex items-center gap-1.5 bg-card rounded-full px-3 py-1.5 shadow-card">
              <Heart className="w-4 h-4 text-destructive fill-destructive" />
              <span className="text-sm font-bold">5</span>
            </div>
          </header>

          <section className="text-center mb-12">
            <Mascot mood="wave" size="lg" message="¡Hola! I'm Lumi. Ready to learn Spanish? Pick a level!" />
            <h1 className="text-4xl sm:text-6xl font-black mt-8 mb-3 bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Learn Spanish, the fun way
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Bite-sized quizzes from A1.1 to A1.3. Get all 5 right to level up — fall short and we'll review together.
            </p>
          </section>

          <section className="grid sm:grid-cols-3 gap-5">
            {LEVEL_ORDER.map((lvl) => {
              const info = LEVEL_INFO[lvl];
              return (
                <button
                  key={lvl}
                  onClick={() => startRound(lvl)}
                  className="group bg-gradient-card rounded-3xl p-6 text-left border-2 border-border hover:border-primary shadow-card hover:shadow-pop transition-bounce hover:-translate-y-1"
                >
                  <div className="text-5xl mb-3 group-hover:animate-wiggle">{info.emoji}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">{lvl}</div>
                  <div className="text-2xl font-extrabold mt-1">{info.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{info.subtitle}</div>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    Start round →
                  </div>
                </button>
              );
            })}
          </section>

          <footer className="mt-16 text-center text-sm text-muted-foreground">
            5 questions per round · 4 choices · 1 correct answer
          </footer>
        </div>
      </main>
    );
  }

  // ---------- QUIZ ----------
  if (stage === "quiz") {
    const q = questions[current];
    return (
      <main className="min-h-screen bg-gradient-sky">
        <div className="container max-w-3xl mx-auto px-4 py-6 sm:py-10">
          <header className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setStage("home")} className="rounded-full font-bold">
              ← Exit
            </Button>
            <LevelBadge level={level} active />
            <div className="flex items-center gap-1.5 bg-card rounded-full px-3 py-1.5 shadow-card">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-bold">{streak}</span>
            </div>
          </header>

          <div className="mb-6">
            <ProgressDots total={questions.length} current={current} results={results} />
          </div>

          <div className="flex flex-col items-center gap-6">
            <QuizCard
              question={q}
              selected={selected}
              revealed={revealed}
              onSelect={handleSelect}
              questionNumber={current + 1}
              total={questions.length}
            />

            {revealed && (
              <div className="flex flex-col items-center gap-4 animate-fade-in">
                <Mascot
                  mood={selected === q.correct ? "cheer" : "sad"}
                  size="sm"
                  message={
                    selected === q.correct
                      ? "¡Perfecto! Onwards!"
                      : `The answer was "${q.answers[q.correct]}". You'll get the next one!`
                  }
                />
                <Button size="lg" onClick={handleNext} className="rounded-full font-extrabold px-10 shadow-pop bg-gradient-hero hover:opacity-90 text-primary-foreground border-0">
                  {current + 1 < questions.length ? "Next question →" : "See results 🎉"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // ---------- RESULTS ----------
  const o = finishOutcome!;
  const headlines: Record<typeof o.type, string> = {
    advance: "¡Felicidades! Level up!",
    mastered: "¡Maestro! You finished A1!",
    drop: "Let's strengthen the basics",
    retry: "Almost there — try again!",
    stay: "Good effort — keep practicing!",
  };
  const subtext: Record<typeof o.type, string> = {
    advance: `You aced it! Moving up to ${o.nextLevel}.`,
    mastered: "You mastered the highest level. Amazing work!",
    drop: `We'll step back to ${o.nextLevel} and rebuild confidence.`,
    retry: `Let's run through ${level} once more.`,
    stay: `You passed enough to stay on ${level}. Try once more for a perfect score.`,
  };
  const isWin = o.type === "advance" || o.type === "mastered";

  return (
    <main className="min-h-screen bg-gradient-sky">
      <div className="container max-w-2xl mx-auto px-4 py-10 sm:py-16">
        <div className="bg-gradient-card rounded-3xl shadow-pop border-2 border-border p-8 sm:p-10 text-center animate-bounce-in">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${isWin ? "bg-gradient-success" : "bg-secondary"}`}>
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-2">{headlines[o.type]}</h1>
          <p className="text-muted-foreground text-lg mb-6">{subtext[o.type]}</p>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="text-6xl font-black bg-gradient-hero bg-clip-text text-transparent">{score}</div>
            <div className="text-2xl font-bold text-muted-foreground">/ {questions.length}</div>
          </div>

          <div className="flex justify-center mb-8">
            <Mascot mood={isWin ? "cheer" : "sad"} size="md" message={isWin ? "I knew you could do it!" : "We'll get it next round!"} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => startRound(o.nextLevel)}
              className="rounded-full font-extrabold px-8 shadow-pop bg-gradient-hero text-primary-foreground border-0 hover:opacity-90"
            >
              {o.type === "advance" ? `Start ${o.nextLevel} →` : o.type === "mastered" ? "Play A1.3 again" : `Try ${o.nextLevel} again`}
            </Button>
            <Button size="lg" variant="outline" onClick={() => setStage("home")} className="rounded-full font-bold">
              <RotateCcw className="w-4 h-4 mr-2" /> Choose level
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
