import { Question } from "@/data/questions";

// Friendly explanation built from the Spanish prompt + correct English meaning.
export function buildExplanation(q: Question, picked: number | null): string {
  const correctText = q.answers[q.correct];
  const isRight = picked === q.correct;
  const spanish = q.prompt.replace(/^["']|["']$/g, "").trim();

  if (isRight) {
    return `¡Exacto! "${spanish}" means "${correctText}" in English. Try saying it out loud to lock it in!`;
  }
  if (picked == null) {
    return `"${spanish}" means "${correctText}" in English. Take a moment to picture the meaning.`;
  }
  const pickedText = q.answers[picked];
  return `Not quite — "${spanish}" doesn't mean "${pickedText}". The correct meaning is "${correctText}". Tip: watch for tense, gender, and common Spanish idioms.`;
}
