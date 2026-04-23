export type Question = {
  prompt: string; // English
  answers: string[]; // Spanish options
  correct: number; // index
  hint?: string;
};

export type Level = "A1.1" | "A1.2" | "A1.3";

// Fake data for now — will be replaced by database fetch.
export const QUESTION_BANK: Record<Level, Question[]> = {
  "A1.1": [
    { prompt: 'How do you say "Hello"?', answers: ["Hola", "Adiós", "Gracias", "Por favor"], correct: 0 },
    { prompt: 'How do you say "Goodbye"?', answers: ["Hola", "Adiós", "Buenos días", "Sí"], correct: 1 },
    { prompt: 'How do you say "Thank you"?', answers: ["Lo siento", "Gracias", "De nada", "Hola"], correct: 1 },
    { prompt: 'How do you say "Yes"?', answers: ["No", "Tal vez", "Sí", "Quizás"], correct: 2 },
    { prompt: 'How do you say "No"?', answers: ["Sí", "No", "Nunca", "Siempre"], correct: 1 },
    { prompt: 'How do you say "Please"?', answers: ["Gracias", "Por favor", "Lo siento", "Salud"], correct: 1 },
    { prompt: 'How do you say "Good morning"?', answers: ["Buenas noches", "Buenas tardes", "Buenos días", "Hasta luego"], correct: 2 },
    { prompt: 'How do you say "Water"?', answers: ["Pan", "Leche", "Vino", "Agua"], correct: 3 },
    { prompt: 'How do you say "One"?', answers: ["Dos", "Tres", "Uno", "Cuatro"], correct: 2 },
    { prompt: 'How do you say "Friend" (male)?', answers: ["Amiga", "Amigo", "Hermano", "Padre"], correct: 1 },
    { prompt: 'How do you say "Cat"?', answers: ["Perro", "Gato", "Pájaro", "Pez"], correct: 1 },
    { prompt: 'How do you say "Dog"?', answers: ["Gato", "Caballo", "Perro", "Conejo"], correct: 2 },
  ],
  "A1.2": [
    { prompt: '"My name is Ana" — translate.', answers: ["Me llamo Ana", "Tengo Ana", "Soy de Ana", "Tú eres Ana"], correct: 0 },
    { prompt: '"I am from Mexico" — translate.', answers: ["Voy a México", "Soy de México", "Estoy México", "Tengo México"], correct: 1 },
    { prompt: '"How are you?" (informal)', answers: ["¿Qué hora es?", "¿Cómo estás?", "¿De dónde eres?", "¿Cuántos años?"], correct: 1 },
    { prompt: '"I have two brothers"', answers: ["Soy dos hermanos", "Hay dos hermanos", "Tengo dos hermanos", "Estoy dos hermanos"], correct: 2 },
    { prompt: '"The house is big"', answers: ["La casa es grande", "El casa es grande", "La casa está grande", "Una casa grande"], correct: 0 },
    { prompt: '"I speak a little Spanish"', answers: ["Hablo mucho español", "Hablo poco español", "Hablo español bien", "No hablo español"], correct: 1 },
    { prompt: '"What time is it?"', answers: ["¿Qué día es?", "¿Cuándo es?", "¿Qué hora es?", "¿Dónde está?"], correct: 2 },
    { prompt: '"I like coffee"', answers: ["Yo café", "Quiero el café", "Me gusta el café", "Tengo café"], correct: 2 },
    { prompt: '"Where is the bathroom?"', answers: ["¿Dónde está el baño?", "¿Qué es el baño?", "¿Cómo es el baño?", "¿Cuándo el baño?"], correct: 0 },
    { prompt: '"I am hungry"', answers: ["Estoy hambre", "Tengo hambre", "Soy hambre", "Hay hambre"], correct: 1 },
    { prompt: '"Today is Monday"', answers: ["Hoy es lunes", "Mañana es lunes", "Ayer es lunes", "Hoy lunes está"], correct: 0 },
    { prompt: '"She is my sister"', answers: ["Él es mi hermana", "Ella es mi hermana", "Ella está mi hermana", "Ella es mi hermano"], correct: 1 },
  ],
  "A1.3": [
    { prompt: '"I went to the store yesterday"', answers: ["Voy a la tienda ayer", "Fui a la tienda ayer", "Iré a la tienda ayer", "Estoy en la tienda ayer"], correct: 1 },
    { prompt: '"We are going to eat"', answers: ["Vamos a comer", "Comemos vamos", "Vamos comido", "Iremos comer"], correct: 0 },
    { prompt: '"She has been studying"', answers: ["Ella estudia", "Ella ha estudiado", "Ella estudió", "Ella va a estudiar"], correct: 1 },
    { prompt: '"If I had time, I would travel"', answers: ["Si tengo tiempo, viajo", "Si tuviera tiempo, viajaría", "Si tuve tiempo, viajé", "Cuando tengo tiempo viajo"], correct: 1 },
    { prompt: '"The book that I read"', answers: ["El libro que leí", "El libro quien leí", "El libro cual leí", "El libro de leí"], correct: 0 },
    { prompt: '"I want you to come"', answers: ["Quiero que vienes", "Quiero que vengas", "Quiero tú vienes", "Te quiero venir"], correct: 1 },
    { prompt: '"It has been raining all day"', answers: ["Llueve todo el día", "Ha llovido todo el día", "Llovió todo el día", "Lloverá todo el día"], correct: 1 },
    { prompt: '"By tomorrow I will have finished"', answers: ["Mañana terminé", "Para mañana habré terminado", "Mañana termino", "Mañana voy a terminar"], correct: 1 },
    { prompt: '"He told me he was tired"', answers: ["Me dijo que está cansado", "Me dijo que estaba cansado", "Me dice que estaba cansado", "Me dirá que está cansado"], correct: 1 },
    { prompt: '"Don\'t open the door"', answers: ["No abres la puerta", "No abras la puerta", "No abrir la puerta", "No abrirás puerta"], correct: 1 },
    { prompt: '"I doubt that he knows"', answers: ["Dudo que sabe", "Dudo que sepa", "Dudo él sabe", "No sé que duda"], correct: 1 },
    { prompt: '"The car was bought by Juan"', answers: ["Juan compra el coche", "El coche fue comprado por Juan", "El coche compra Juan", "Juan es comprado el coche"], correct: 1 },
  ],
};

export const LEVEL_ORDER: Level[] = ["A1.1", "A1.2", "A1.3"];

export const LEVEL_INFO: Record<Level, { title: string; subtitle: string; emoji: string }> = {
  "A1.1": { title: "Beginner", subtitle: "First words & greetings", emoji: "🌱" },
  "A1.2": { title: "Explorer", subtitle: "Everyday phrases", emoji: "🌿" },
  "A1.3": { title: "Adventurer", subtitle: "Tenses & sentences", emoji: "🌳" },
};

export function pickQuestions(level: Level, n = 5): Question[] {
  const pool = [...QUESTION_BANK[level]];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}
