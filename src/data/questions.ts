import { createClient } from "@/utils/supabase/client";

export type Question = {
  prompt: string;
  answers: string[];
  correct: number;
};

export type Level =
  | "A1.1" | "A1.2" | "A1.3"
  | "A2.1" | "A2.2" | "A2.3"
  | "B1.1" | "B1.2" | "B1.3"
  | "B2.1" | "B2.2" | "B2.3"
  | "C1.1" | "C1.2" | "C1.3"
  | "C2.1" | "C2.2" | "C2.3";

export const LEVEL_ORDER: Level[] = [
  "A1.1","A1.2","A1.3",
  "A2.1","A2.2","A2.3",
  "B1.1","B1.2","B1.3",
  "B2.1","B2.2","B2.3",
  "C1.1","C1.2","C1.3",
  "C2.1","C2.2","C2.3",
];

export const STAGE_INFO: Record<string, { title: string; emoji: string; tagline: string }> = {
  A1: { title: "Beginner",        emoji: "🌱", tagline: "First words & greetings" },
  A2: { title: "Elementary",      emoji: "🌿", tagline: "Daily life & simple chats" },
  B1: { title: "Intermediate",    emoji: "🌳", tagline: "Opinions & travel" },
  B2: { title: "Upper Int.",      emoji: "🏔️", tagline: "Fluent ideas & nuance" },
  C1: { title: "Advanced",        emoji: "🚀", tagline: "Complex topics" },
  C2: { title: "Mastery",         emoji: "👑", tagline: "Native-like fluency" },
};

export const LEVEL_INFO: Record<Level, { title: string; subtitle: string; emoji: string }> = LEVEL_ORDER.reduce(
  (acc, lvl) => {
    const stage = lvl.slice(0, 2) as keyof typeof STAGE_INFO;
    acc[lvl] = {
      title: STAGE_INFO[stage].title,
      subtitle: STAGE_INFO[stage].tagline,
      emoji: STAGE_INFO[stage].emoji,
    };
    return acc;
  },
  {} as Record<Level, { title: string; subtitle: string; emoji: string }>,
);

type DbWordRow = {
  difficulty_level?: string;
  spanish_word?: string;
  english_word?: string;
};

const shuffle = <T,>(arr: T[]): T[] => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const normalizeDbWord = (row: DbWordRow): { spanish_word: string; english_word: string } | null => {
  if (typeof row.spanish_word !== "string" || typeof row.english_word !== "string") return null;
  const spanishWord = row.spanish_word.trim();
  const englishWord = row.english_word.trim();
  if (!spanishWord || !englishWord) return null;
  return { spanish_word: spanishWord, english_word: englishWord };
};

export async function pickQuestions(level: Level, n = 5): Promise<Question[]> {
  if (n < 1) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("questions")
    .select("spanish_word, english_word")
    .eq("difficulty_level", level);

  if (error) {
    throw new Error(error.message || "Failed to load questions from the database.");
  }

  const pool = (data ?? [])
    .map((row) => normalizeDbWord(row as DbWordRow))
    .filter((q): q is { spanish_word: string; english_word: string } => q !== null);

  if (pool.length < n) {
    throw new Error(`Not enough questions in DB for ${level}. Need ${n}, found ${pool.length}.`);
  }

  const allEnglishOptions = [...new Set(pool.map((w) => w.english_word))];
  if (allEnglishOptions.length < 4) {
    throw new Error(`Need at least 4 unique English words in DB for ${level}. Found ${allEnglishOptions.length}.`);
  }

  return shuffle(pool).slice(0, n).map(({ spanish_word, english_word }) => {
    const wrongAnswers = shuffle(allEnglishOptions.filter((w) => w !== english_word)).slice(0, 3);
    if (wrongAnswers.length < 3) {
      throw new Error(`Not enough distractor words in DB for ${level}.`);
    }
    const answers = shuffle([english_word, ...wrongAnswers]);
    const correct = answers.indexOf(english_word);
    return { prompt: spanish_word, answers, correct };
  });
}
