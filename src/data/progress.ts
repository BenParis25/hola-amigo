import { createClient } from "@/utils/supabase/client";
import type { AgeGroupId } from "@/data/profile";
import type { CharacterId } from "@/data/characters";
import type { Level } from "@/data/questions";

export type UserProgress = {
  characterId: CharacterId;
  ageGroup: AgeGroupId | null;
  unlocked: Level;
  current: Level;
  completed: Level[];
  streak: number;
};

export type UserProgressRow = UserProgress & {
  user_id: string;
};

export const DEFAULT_PROGRESS: UserProgress = {
  characterId: "fox",
  ageGroup: null,
  unlocked: "A1",
  current: "A1",
  completed: [],
  streak: 0,
};

const normalizeProgress = (row: Partial<UserProgressRow> | null | undefined): UserProgress => ({
  characterId: row?.characterId ?? DEFAULT_PROGRESS.characterId,
  ageGroup: row?.ageGroup ?? DEFAULT_PROGRESS.ageGroup,
  unlocked: row?.unlocked ?? DEFAULT_PROGRESS.unlocked,
  current: row?.current ?? DEFAULT_PROGRESS.current,
  completed: row?.completed ?? DEFAULT_PROGRESS.completed,
  streak: row?.streak ?? DEFAULT_PROGRESS.streak,
});

export const loadUserProgress = async (userId: string): Promise<UserProgress | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .select("character_id, age_group, unlocked, current, completed, streak")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || "Failed to load saved progress.");
  }

  if (!data) {
    return null;
  }

  return normalizeProgress({
    characterId: data.character_id as CharacterId,
    ageGroup: (data.age_group as AgeGroupId | null) ?? null,
    unlocked: data.unlocked as Level,
    current: data.current as Level,
    completed: (data.completed as Level[] | null) ?? [],
    streak: data.streak ?? 0,
  });
};

export const saveUserProgress = async (userId: string, progress: UserProgress): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase.from("user_progress").upsert({
    user_id: userId,
    character_id: progress.characterId,
    age_group: progress.ageGroup,
    unlocked: progress.unlocked,
    current: progress.current,
    completed: progress.completed,
    streak: progress.streak,
  });

  if (error) {
    throw new Error(error.message || "Failed to save progress.");
  }
};
