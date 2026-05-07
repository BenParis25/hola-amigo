import { createClient } from "@/utils/supabase/client";

export type Question = {
  prompt: string;
  answers: string[];
  correct: number;
  category?: string;
  germanWord?: string;
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
  german_word?: string;
};

type SupabaseWordRow = {
  spanish_word?: string;
  english_word?: string;
  category?: string;
  german_word?: string;
};

const shuffle = <T,>(arr: T[]): T[] => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const normalizeDbWord = (row: DbWordRow): { spanish_word: string; english_word: string; category: string; german_word?: string } | null => {
  if (typeof row.spanish_word !== "string" || typeof row.english_word !== "string") return null;
  const spanishWord = row.spanish_word.trim();
  const englishWord = row.english_word.trim();
  if (!spanishWord || !englishWord) return null;
  return { 
    spanish_word: spanishWord, 
    english_word: englishWord, 
    category: row.category?.trim() ?? "general",
    german_word: row.german_word?.trim()
  };
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
    .select(includeCategory ? "spanish_word, english_word, category, german_word" : "spanish_word, english_word, german_word");

  const { data, error } = levelPattern.endsWith("%")
    ? await query.like("difficulty_level", levelPattern)
    : await query.eq("difficulty_level", levelPattern);

  if (!error) {
    return (data ?? []) as SupabaseWordRow[];
  }

  if (!/column questions\.(category|german_word) does not exist/i.test(error.message || "")) {
    throw new Error(error.message || "Failed to load questions from the database.");
  }

  // Fallback query without new columns
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
    .filter((q): q is { spanish_word: string; english_word: string; category: string; german_word?: string } => q !== null);

  if (pool.length < n) {
    throw new Error(`Not enough questions in DB for ${level}. Need ${n}, found ${pool.length}.`);
  }

  const allEnglishOptions = [...new Set(pool.map((w) => w.english_word))];
  if (allEnglishOptions.length < 4) {
    throw new Error(`Need at least 4 unique English words in DB for ${level}. Found ${allEnglishOptions.length}.`);
  }

  return shuffle(pool).slice(0, n).map(({ spanish_word, english_word, category, german_word }) => {
    const wrongAnswers = shuffle(allEnglishOptions.filter((w) => w !== english_word)).slice(0, 3);
    if (wrongAnswers.length < 3) {
      throw new Error(`Not enough distractor words in DB for ${level}.`);
    }
    const answers = shuffle([english_word, ...wrongAnswers]);
    const correct = answers.indexOf(english_word);
    return { prompt: spanish_word, answers, correct, category, germanWord: german_word };
  });
}

export type TranslationProgress = {
  level: Level;
  total: number;
  translated: number;
  percentage: number;
};

export async function getTranslationProgress(): Promise<TranslationProgress[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("questions")
    .select("difficulty_level, german_word");

  if (error) throw error;

  return LEVEL_ORDER.map(level => {
    const levelRows = data.filter(r => r.difficulty_level === level || r.difficulty_level?.startsWith(`${level}.`));
    const total = levelRows.length;
    const translated = levelRows.filter(r => r.german_word !== null && r.german_word !== '').length;
    
    return {
      level,
      total,
      translated,
      percentage: total > 0 ? Math.round((translated / total) * 100) : 0
    };
  });
}
