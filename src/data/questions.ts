import { createClient } from "@/utils/supabase/client";

export type Question = {
  prompt: string;
  answers: string[];
  correct: number;
  category?: string;
};

export type Level =
  | "A1"
  | "A2"
  | "B1"
  | "B2"
  | "C1"
  | "C2";

export const LEVEL_ORDER: Level[] = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
];

export const STAGE_INFO: Record<Level, { title: string; emoji: string; tagline: string }> = {
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

export const getNextLevel = (level: Level): Level | null => {
  const index = LEVEL_ORDER.indexOf(level);
  return index >= 0 && index < LEVEL_ORDER.length - 1 ? LEVEL_ORDER[index + 1] : null;
};

export const getPreviousLevel = (level: Level): Level | null => {
  const index = LEVEL_ORDER.indexOf(level);
  return index > 0 ? LEVEL_ORDER[index - 1] : null;
};

type DbWordRow = {
  difficulty_level?: string;
  spanish_word?: string;
  english_word?: string;
  category?: string;
};

type SupabaseWordRow = {
  spanish_word?: string;
  english_word?: string;
  category?: string;
};

const shuffle = <T,>(arr: T[]): T[] => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const normalizeDbWord = (row: DbWordRow): { spanish_word: string; english_word: string; category: string } | null => {
  if (typeof row.spanish_word !== "string" || typeof row.english_word !== "string") return null;
  const spanishWord = row.spanish_word.trim();
  const englishWord = row.english_word.trim();
  if (!spanishWord || !englishWord) return null;
  return { spanish_word: spanishWord, english_word: englishWord, category: row.category?.trim() ?? "general" };
};

const mergeRows = (primary: SupabaseWordRow[], fallback: SupabaseWordRow[]): SupabaseWordRow[] => {
  const seen = new Set<string>();
  const merged: SupabaseWordRow[] = [];

  for (const row of [...primary, ...fallback]) {
    const key = `${row.spanish_word ?? ""}::${row.english_word ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(row);
  }

  return merged;
};

const loadRowsForPattern = async (levelPattern: string, includeCategory: boolean): Promise<SupabaseWordRow[]> => {
  const supabase = createClient();

  const query = supabase
    .from("questions")
    .select(includeCategory ? "spanish_word, english_word, category" : "spanish_word, english_word");

  const { data, error } = levelPattern.endsWith("%")
    ? await query.like("difficulty_level", levelPattern)
    : await query.eq("difficulty_level", levelPattern);

  if (!error) {
    return (data ?? []) as SupabaseWordRow[];
  }

  if (!/column questions\.category does not exist/i.test(error.message || "")) {
    throw new Error(error.message || "Failed to load questions from the database.");
  }

  const fallback = await supabase
    .from("questions")
    .select("spanish_word, english_word")
    .like("difficulty_level", levelPattern);

  if (fallback.error) {
    throw new Error(fallback.error.message || "Failed to load questions from the database.");
  }

  return (fallback.data ?? []) as SupabaseWordRow[];
};

export async function pickQuestions(level: Level, n = 5): Promise<Question[]> {
  if (n < 1) return [];

  const exactRows = await loadRowsForPattern(level, true);
  const sublevelRows = exactRows.length >= n ? [] : await loadRowsForPattern(`${level}.%`, true);
  const rows = exactRows.length >= n ? exactRows : mergeRows(exactRows, sublevelRows);

  const pool = rows
    .map((row) => normalizeDbWord(row as DbWordRow))
    .filter((q): q is { spanish_word: string; english_word: string; category: string } => q !== null);

  if (pool.length < n) {
    throw new Error(`Not enough questions in DB for ${level}. Need ${n}, found ${pool.length}.`);
  }

  const allEnglishOptions = [...new Set(pool.map((w) => w.english_word))];
  if (allEnglishOptions.length < 4) {
    throw new Error(`Need at least 4 unique English words in DB for ${level}. Found ${allEnglishOptions.length}.`);
  }

  return shuffle(pool).slice(0, n).map(({ spanish_word, english_word, category }) => {
    const wrongAnswers = shuffle(allEnglishOptions.filter((w) => w !== english_word)).slice(0, 3);
    if (wrongAnswers.length < 3) {
      throw new Error(`Not enough distractor words in DB for ${level}.`);
    }
    const answers = shuffle([english_word, ...wrongAnswers]);
    const correct = answers.indexOf(english_word);
    return { prompt: spanish_word, answers, correct, category };
  });
}
