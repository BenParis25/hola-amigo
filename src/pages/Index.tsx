import { useEffect, useMemo, useState } from "react";
import { LEVEL_ORDER, Level, Question, getNextLevel, getPreviousLevel, pickQuestions } from "@/data/questions";
import { CharacterId, getCharacter } from "@/data/characters";
import { AgeGroupId, getAgeGroup } from "@/data/profile";
import { DEFAULT_PROGRESS, loadUserProgress, saveUserProgress } from "@/data/progress";
import { Mascot } from "@/components/Mascot";
import { CharacterPicker } from "@/components/CharacterPicker";
import { AgeGroupPicker } from "@/components/AgeGroupPicker";
import { LevelMap } from "@/components/LevelMap";
import { QuizCard } from "@/components/QuizCard";
import { ProgressDots } from "@/components/ProgressDots";
import { Button } from "@/components/ui/button";
import { WalkingMascot } from "@/components/WalkingMascot";
import { buildExplanation } from "@/lib/explain";
import { useAuth } from "@/hooks/useAuth";
import { Check, X } from "lucide-react";
import { Sparkles, RotateCcw, Trophy, Heart, ArrowLeft, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createClient } from "@/utils/supabase/client";

type Stage = "pick-character" | "pick-age-group" | "home" | "quiz" | "results";

const QUESTIONS_PER_ROUND = 5;
const PASS_THRESHOLD = 5;
const DROP_THRESHOLD = 3;

const getInitialStage = (hasProfile: boolean, ageGroup: AgeGroupId | null): Stage => {
  if (!hasProfile) return "pick-character";
  return ageGroup ? "home" : "pick-age-group";
};

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("pick-character");
  const [pickedId, setPickedId] = useState<CharacterId | null>(null);
  const [characterId, setCharacterId] = useState<CharacterId>(DEFAULT_PROGRESS.characterId);
  const [ageGroup, setAgeGroup] = useState<AgeGroupId | null>(DEFAULT_PROGRESS.ageGroup);
  const character = getCharacter(characterId);

  const [unlocked, setUnlocked] = useState<Level>(DEFAULT_PROGRESS.unlocked);
  const [currentLevel, setCurrentLevel] = useState<Level>(DEFAULT_PROGRESS.current);
  const [roundLevel, setRoundLevel] = useState<Level>(DEFAULT_PROGRESS.current);
  const [completed, setCompleted] = useState<Set<Level>>(new Set(DEFAULT_PROGRESS.completed));
  const [streak, setStreak] = useState(DEFAULT_PROGRESS.streak);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const [isRoundLoading, setIsRoundLoading] = useState(false);

  const score = useMemo(() => results.filter((r) => r === true).length, [results]);

  useEffect(() => {
    let isMounted = true;

    const hydrateProgress = async () => {
      if (!user?.id) {
        if (!isMounted) return;
        setStage("pick-character");
        setPickedId(null);
        setCharacterId(DEFAULT_PROGRESS.characterId);
        setAgeGroup(DEFAULT_PROGRESS.ageGroup);
        setUnlocked(DEFAULT_PROGRESS.unlocked);
        setCurrentLevel(DEFAULT_PROGRESS.current);
        setRoundLevel(DEFAULT_PROGRESS.current);
        setCompleted(new Set(DEFAULT_PROGRESS.completed));
        setStreak(DEFAULT_PROGRESS.streak);
        setIsProgressLoaded(true);
        return;
      }

      try {
        const progress = await loadUserProgress(user.id);
        if (!isMounted) return;

        if (!progress) {
          setPickedId(null);
          setCharacterId(DEFAULT_PROGRESS.characterId);
          setAgeGroup(DEFAULT_PROGRESS.ageGroup);
          setUnlocked(DEFAULT_PROGRESS.unlocked);
          setCurrentLevel(DEFAULT_PROGRESS.current);
          setRoundLevel(DEFAULT_PROGRESS.current);
          setCompleted(new Set(DEFAULT_PROGRESS.completed));
          setStreak(DEFAULT_PROGRESS.streak);
          setStage("pick-character");
          return;
        }

        setPickedId(progress.characterId);
        setCharacterId(progress.characterId);
        setAgeGroup(progress.ageGroup);
        setUnlocked(progress.unlocked);
        setCurrentLevel(progress.current);
        setRoundLevel(progress.current);
        setCompleted(new Set(progress.completed));
        setStreak(progress.streak);
        setStage(getInitialStage(true, progress.ageGroup));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load progress.";
        toast.error("Could not load saved progress", { description: message });
      } finally {
        if (isMounted) setIsProgressLoaded(true);
      }
    };

    setIsProgressLoaded(false);
    void hydrateProgress();

    // Reset in-progress round state when switching accounts.
    setQuestions([]);
    setQIndex(0);
    setSelected(null);
    setRevealed(false);
    setResults([]);
    setIsRoundLoading(false);
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  // Persist
  useEffect(() => {
    if (!isProgressLoaded || !user?.id) return;

    const data = {
      characterId,
      ageGroup,
      unlocked,
      current: currentLevel,
      completed: [...completed],
      streak,
    };
    void saveUserProgress(user.id, data).catch((error) => {
      const message = error instanceof Error ? error.message : "Failed to save progress.";
      toast.error("Could not save progress", { description: message });
    });
  }, [isProgressLoaded, user?.id, characterId, ageGroup, unlocked, currentLevel, completed, streak]);

  // SEO
  useEffect(() => {
    document.title = "Lingo Fox · Learn Spanish A1–C2";
    const meta =
      document.querySelector('meta[name="description"]') ?? document.head.appendChild(document.createElement("meta"));
    meta.setAttribute("name", "description");
    meta.setAttribute("content", "Fun Spanish quizzes from A1 to C2 with a mascot guide. Pick your character and learn at your level.");
  }, []);

  const startRound = async (lvl: Level) => {
    if (isRoundLoading) return;

    setIsRoundLoading(true);
    try {
      const nextQuestions = await pickQuestions(lvl, QUESTIONS_PER_ROUND);
      setRoundLevel(lvl);
      setCurrentLevel(lvl);
      setQuestions(nextQuestions);
      setResults(Array(nextQuestions.length).fill(null));
      setQIndex(0);
      setSelected(null);
      setRevealed(false);
      setStage("quiz");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error loading questions.";
      toast.error("Could not start round", { description: message });
    } finally {
      setIsRoundLoading(false);
    }
  };

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    const isRight = i === questions[qIndex].correct;
    setResults((prev) => prev.map((r, idx) => (idx === qIndex ? isRight : r)));
    if (isRight) {
      setStreak((s) => s + 1);
      toast.success("¡Correcto!", { description: "Great job!" });
    } else {
      setStreak(0);
      toast.error("¡Casi!", { description: `Correct: ${questions[qIndex].answers[questions[qIndex].correct]}` });
    }
  };

  const handleNext = () => {
    if (qIndex + 1 < questions.length) {
      setQIndex((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      finalize();
    }
  };

  const finalize = () => {
    const finalScore = results.filter((r) => r === true).length;
    const nextLevel = getNextLevel(roundLevel);
    const previousLevel = getPreviousLevel(roundLevel);

    // compute the user's new current level (snapshot) for recording
    let newCurrent = currentLevel;
    if (finalScore >= PASS_THRESHOLD) {
      if (nextLevel) newCurrent = nextLevel;
    } else if (finalScore <= DROP_THRESHOLD && previousLevel) {
      newCurrent = previousLevel;
    }

    if (finalScore >= PASS_THRESHOLD) {
      setCompleted((prev) => {
        const next = new Set(prev);
        next.add(roundLevel);
        return next;
      });
      if (nextLevel) {
        setUnlocked((prevUnlocked) => {
          const currentUnlockedIdx = LEVEL_ORDER.indexOf(prevUnlocked);
          const nextIdx = LEVEL_ORDER.indexOf(nextLevel);
          return nextIdx > currentUnlockedIdx ? nextLevel : prevUnlocked;
        });
        setCurrentLevel(nextLevel);
      }
    } else if (finalScore <= DROP_THRESHOLD && previousLevel) {
      setCurrentLevel(previousLevel);
      setCompleted((prevSet) => {
        const ns = new Set(prevSet);
        ns.delete(roundLevel);
        return ns;
      });
    }

    // Record this round to the DB for leaderboard aggregation
    if (user?.id) {
      const supabase = createClient();
      void supabase.from("user_rounds").insert({
        user_id: user.id,
        played_level: roundLevel,
        current_level: newCurrent,
        correct: finalScore,
        total: questions.length,
      }).then(({ error }) => {
        if (error) console.error("Failed to record round:", error.message);
      });
    }

    setStage("results");
  };

  const finishOutcome = useMemo(() => {
    if (stage !== "results") return null;
    if (score >= PASS_THRESHOLD) {
      if (getNextLevel(currentLevel)) {
        return { type: "advance" as const, nextLevel: currentLevel };
      }
      return { type: "mastered" as const, nextLevel: currentLevel };
    }
    if (score <= DROP_THRESHOLD && roundLevel !== currentLevel) {
      return { type: "drop" as const, nextLevel: currentLevel };
    }
    if (score <= DROP_THRESHOLD) return { type: "retry" as const, nextLevel: currentLevel };
    return { type: "stay" as const, nextLevel: currentLevel };
  }, [stage, score, currentLevel, roundLevel]);

  // ---------- PICK CHARACTER ----------
  if (stage === "pick-character") {
    return (
      <main className="min-h-screen bg-gradient-sky">
        <div className="container max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <header className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-extrabold text-xl tracking-tight">Lingo Fox</span>
            </div>
          </header>
          <CharacterPicker
            selected={pickedId}
            onSelect={setPickedId}
            onConfirm={() => {
              if (!pickedId) return;
              setCharacterId(pickedId);
              setStage("pick-age-group");
              toast.success(`${getCharacter(pickedId).name} is ready to teach!`);
            }}
          />
        </div>
      </main>
    );
  }

  // ---------- AGE GROUP ----------
  if (stage === "pick-age-group") {
    return (
      <main className="min-h-screen bg-gradient-sky">
        <div className="container max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <header className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-extrabold text-xl tracking-tight">Lingo Fox</span>
            </div>
          </header>
          <AgeGroupPicker
            selected={ageGroup}
            onSelect={setAgeGroup}
            onConfirm={() => {
              if (!ageGroup) return;
              void startRound(currentLevel);
            }}
          />
        </div>
      </main>
    );
  }

  // ---------- HOME ----------
  if (stage === "home") {
    const ageGroupInfo = getAgeGroup(ageGroup);
    return (
      <main className="min-h-screen bg-gradient-sky">
        <div className="container max-w-5xl mx-auto px-4 py-8 sm:py-12 pb-32">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-extrabold text-xl tracking-tight">Lingo Fox</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStage("pick-character")}
                className="flex items-center gap-1.5 bg-card rounded-full px-3 py-1.5 shadow-card border-2 border-border hover:border-primary transition-bounce"
                title="Change character"
              >
                <img src={character.image} alt={character.name} className="w-6 h-6 object-contain" />
                <span className="text-sm font-bold">{character.name}</span>
                <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <Button size="sm" variant="outline" onClick={() => navigate('/leaderboard')}>
                Leaderboard
              </Button>
              {ageGroupInfo && (
                <div className="hidden sm:flex items-center gap-1.5 bg-card rounded-full px-3 py-1.5 shadow-card">
                  <span className="text-sm font-bold">{ageGroupInfo.label}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-card rounded-full px-3 py-1.5 shadow-card">
                <Heart className="w-4 h-4 text-destructive fill-destructive" />
                <span className="text-sm font-bold">5</span>
              </div>
            </div>
          </header>

          <section className="text-center mb-10">
            <Mascot character={character} mood="wave" size="lg" />
            <h1 className="text-4xl sm:text-5xl font-black mt-6 mb-3 text-gradient-hero leading-tight">
              Your Spanish journey starts at A1
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              5 questions per round. All 5 right? You level up. 3 or fewer? We step back to strengthen the basics.
            </p>
          </section>

          <div className="flex justify-center mb-6">
            <Button
              size="lg"
              onClick={() => startRound(currentLevel)}
              className="rounded-full font-extrabold px-8 shadow-pop bg-gradient-hero text-primary-foreground border-0 hover:opacity-90"
            >
              {`Continue ${currentLevel} →`}
            </Button>
          </div>

          <LevelMap unlocked={unlocked} current={currentLevel} completed={completed} onPick={(lvl) => startRound(lvl)} />

          <footer className="mt-10 text-center text-sm text-muted-foreground">
            {isRoundLoading ? "Loading words from database..." : "Tip: tap your highest unlocked level to keep climbing."}
          </footer>

          {/* Mascot strolls along the bottom */}
          <div className="fixed inset-x-0 bottom-0 pointer-events-none px-4 pb-2 z-10">
            <div className="container max-w-5xl mx-auto">
              <WalkingMascot character={character} size={72} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ---------- QUIZ ----------
  if (stage === "quiz") {
    const q = questions[qIndex];
    return (
      <main className="min-h-screen bg-gradient-sky">
        <div className="container max-w-3xl mx-auto px-4 py-6 sm:py-10 pb-28">
          <header className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setStage("home")} className="rounded-full font-bold">
              <ArrowLeft className="w-4 h-4 mr-1" /> Exit
            </Button>
            <div className="flex items-center gap-2 rounded-full px-4 py-2 font-bold text-sm bg-gradient-hero text-primary-foreground shadow-pop">
              <span>{roundLevel}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-card rounded-full px-3 py-1.5 shadow-card">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-bold">{streak}</span>
            </div>
          </header>

          <div className="mb-6">
            <ProgressDots total={questions.length} current={qIndex} results={results} />
          </div>

          <div className="flex flex-col items-center gap-6">
            <QuizCard
              question={q}
              selected={selected}
              revealed={revealed}
              onSelect={handleSelect}
              questionNumber={qIndex + 1}
              total={questions.length}
            />

            {revealed && (
              <div className="flex flex-col items-center gap-4 animate-fade-in w-full">
                {/* Explanation panel */}
                <div
                  className={`w-full max-w-2xl rounded-3xl border-2 p-5 sm:p-6 shadow-card flex gap-4 items-start animate-scale-in ${
                    selected === q.correct ? "border-success bg-success/10" : "border-destructive bg-destructive/10"
                  }`}
                >
                  <div className="shrink-0">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain animate-bounce-in drop-shadow"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      {selected === q.correct ? (
                        <span className="inline-flex items-center gap-1 text-success font-extrabold">
                          <Check className="w-4 h-4" /> ¡Correcto!
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-destructive font-extrabold">
                          <X className="w-4 h-4" /> Not quite
                        </span>
                      )}
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                        {character.name} explains
                      </span>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-foreground">
                      {buildExplanation(q, selected)}
                    </p>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleNext}
                  className="rounded-full font-extrabold px-10 shadow-pop bg-gradient-hero hover:opacity-90 text-primary-foreground border-0"
                >
                  {qIndex + 1 < questions.length ? "Next question →" : "See results 🎉"}
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* Walking mascot during quiz — pauses while reading the explanation */}
        <div className="fixed inset-x-0 bottom-0 pointer-events-none px-4 pb-2 z-10">
          <div className="container max-w-3xl mx-auto">
            <WalkingMascot character={character} size={64} paused={revealed} />
          </div>
        </div>
      </main>
    );
  }

  // ---------- RESULTS ----------
  const o = finishOutcome!;
  const headlines: Record<typeof o.type, string> = {
    advance: "¡Felicidades! Level up!",
    mastered: "¡Maestro! C2 conquered!",
    drop: "Let's strengthen the basics",
    retry: "Almost there — try again!",
    stay: "Good effort — keep practicing!",
  };
  const subtext: Record<typeof o.type, string> = {
    advance: `You aced it! Moving up to ${o.nextLevel}.`,
    mastered: "You completed the highest level. Truly impressive!",
    drop: `We've stepped back to ${o.nextLevel} to rebuild confidence.`,
    retry: `Let's run through ${roundLevel} once more.`,
    stay: `You passed enough to stay on ${roundLevel}. Try once more for a perfect 5/5.`,
  };
  const isWin = o.type === "advance" || o.type === "mastered";

  return (
    <main className="min-h-screen bg-gradient-sky">
      <div className="container max-w-2xl mx-auto px-4 py-10 sm:py-16">
        <div className="bg-gradient-card rounded-3xl shadow-pop border-2 border-border p-8 sm:p-10 text-center animate-bounce-in">
          <div
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
              isWin ? "bg-gradient-success" : "bg-secondary"
            }`}
          >
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-2">{headlines[o.type]}</h1>
          <p className="text-muted-foreground text-lg mb-6">{subtext[o.type]}</p>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="text-6xl font-black text-gradient-hero">{score}</div>
            <div className="text-2xl font-bold text-muted-foreground">/ {questions.length}</div>
          </div>

          <div className="flex justify-center mb-8">
            <Mascot
              character={character}
              mood={isWin ? "cheer" : "sad"}
              size="md"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => startRound(o.nextLevel)}
              className="rounded-full font-extrabold px-8 shadow-pop bg-gradient-hero text-primary-foreground border-0 hover:opacity-90"
            >
              {o.type === "advance"
                ? `Start ${o.nextLevel} →`
                : o.type === "mastered"
                ? `Replay ${o.nextLevel}`
                : `Try ${o.nextLevel} again`}
            </Button>
            <Button size="lg" variant="outline" onClick={() => setStage("home")} className="rounded-full font-bold">
              <RotateCcw className="w-4 h-4 mr-2" /> Level map
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
