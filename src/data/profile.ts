export type AgeGroupId = "kids" | "preteen" | "teen" | "adult";

export type AgeGroupOption = {
  id: AgeGroupId;
  label: string;
  description: string;
  emoji: string;
};

export const AGE_GROUPS: AgeGroupOption[] = [
  { id: "kids", label: "Kids", description: "Ages 5–8", emoji: "🧸" },
  { id: "preteen", label: "Pre-teens", description: "Ages 9–12", emoji: "⚡" },
  { id: "teen", label: "Teens", description: "Ages 13–17", emoji: "🎧" },
  { id: "adult", label: "Adults", description: "18+", emoji: "☕" },
];

export const getAgeGroup = (id: AgeGroupId | null | undefined) =>
  AGE_GROUPS.find((group) => group.id === id) ?? null;