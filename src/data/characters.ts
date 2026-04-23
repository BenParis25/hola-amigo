import foxImg from "@/assets/mascot-fox.png";
import pandaImg from "@/assets/mascot-panda.png";
import catImg from "@/assets/mascot-cat.png";
import owlImg from "@/assets/mascot-owl.png";

export type CharacterId = "fox" | "panda" | "cat" | "owl";

export type CharacterMessages = {
  wave: string[];
  cheer: string[];
  sad: string[];
  happy: string[];
};

export type Character = {
  id: CharacterId;
  name: string;
  image: string;
  audience: string; // "Ages 5–10" etc.
  vibe: string;
  accent: string; // tailwind class for accent ring
  messages: CharacterMessages;
};

export const CHARACTERS: Character[] = [
  {
    id: "fox",
    name: "Lumi",
    image: foxImg,
    audience: "Ages 5–10",
    vibe: "Playful & sweet",
    accent: "ring-primary",
    messages: {
      wave: ["¡Hola amigo! I'm Lumi! 🦊", "Yay! Let's learn Spanish!", "I'm so happy you're here!"],
      cheer: ["¡Súper! You did it!", "Wooo! High five! 🙌", "Amazing job, friend!"],
      sad: ["¡No te preocupes! Try again!", "Mistakes are okay!", "We learn together!"],
      happy: ["¡Vamos! Let's gooo!", "You've got this!", "I believe in you!"],
    },
  },
  {
    id: "panda",
    name: "Bao",
    image: pandaImg,
    audience: "Ages 11–17",
    vibe: "Chill & fun",
    accent: "ring-accent",
    messages: {
      wave: ["¿Qué tal? I'm Bao 🐼", "Yo, ready to vibe in español?", "Let's lock in!"],
      cheer: ["¡Brutal! That was clean.", "Big W. Keep cooking 🔥", "No cap, you nailed that."],
      sad: ["No stress, we'll respawn.", "Bro, that one was tricky.", "Take a breath, retry."],
      happy: ["Let's run it.", "Tap in, español time.", "Streak loading…"],
    },
  },
  {
    id: "cat",
    name: "Mira",
    image: catImg,
    audience: "Young adult",
    vibe: "Calm & focused",
    accent: "ring-secondary",
    messages: {
      wave: ["Hola, soy Mira ☕", "Pull up a chair — let's study.", "Ready for a thoughtful round?"],
      cheer: ["Excellent — well reasoned.", "That's the one. ¡Muy bien!", "Beautifully done."],
      sad: ["Close — let's review the logic.", "No worries, we'll revisit.", "A small mistake, easily fixed."],
      happy: ["Let's begin, shall we?", "Focus mode: on.", "Take your time."],
    },
  },
  {
    id: "owl",
    name: "Don Hugo",
    image: owlImg,
    audience: "Adult / Pro",
    vibe: "Wise & sophisticated",
    accent: "ring-foreground",
    messages: {
      wave: ["Buenas, soy Don Hugo 🦉", "A pleasure. Shall we begin?", "Let us cultivate your Spanish."],
      cheer: ["Magnífico. ¡Excelente análisis!", "Precisely correct. Bravo.", "Impeccable command."],
      sad: ["A subtle pitfall — let us examine it.", "Worry not; nuance takes time.", "Close, but consider the form."],
      happy: ["Let us proceed with care.", "Reflect before you respond.", "Knowledge rewards patience."],
    },
  },
];

export const getCharacter = (id: CharacterId) => CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];
