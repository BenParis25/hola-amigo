import { Question } from "@/data/questions";

// If a question doesn't have a hand-written explanation, build a friendly one.
export function buildExplanation(q: Question, picked: number | null): string {
  const correctText = q.answers[q.correct];
  const isRight = picked === q.correct;

  // Strip surrounding quotes from the prompt for readability
  const cleanPrompt = q.prompt.replace(/^["']|["']$/g, "").trim();

  if (isRight) {
    return `¡Exacto! "${correctText}" is the right way to say ${cleanPrompt}. Notice the structure — try saying it out loud!`;
  }
  if (picked == null) {
    return `The correct answer is "${correctText}". For ${cleanPrompt}, this is the natural Spanish form.`;
  }
  const pickedText = q.answers[picked];
  return `Not quite — "${pickedText}" doesn't fit. The correct answer is "${correctText}". Tip: match the tense, gender, and verb form to ${cleanPrompt}.`;
}
