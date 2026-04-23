import { createClient } from "@/utils/supabase/client";

export type Question = {
  prompt: string; // Spanish word/phrase to translate
  answers: string[]; // English options
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
    const stage = lvl.slice(0, 2);
    acc[lvl] = {
      title: STAGE_INFO[stage].title,
      subtitle: STAGE_INFO[stage].tagline,
      emoji: STAGE_INFO[stage].emoji,
    };
    return acc;
  },
  {} as Record<Level, { title: string; subtitle: string; emoji: string }>,
);

// Spanish prompt → guess the English meaning. Replace with DB later.
export const QUESTION_BANK: Record<Level, Question[]> = {
  // ============ A1 ============
  "A1.1": [
    { prompt: "Hola", answers: ["Hello", "Goodbye", "Thank you", "Please"], correct: 0 },
    { prompt: "Adiós", answers: ["Hello", "Goodbye", "Good morning", "Yes"], correct: 1 },
    { prompt: "Gracias", answers: ["Sorry", "Thank you", "You're welcome", "Hello"], correct: 1 },
    { prompt: "Sí", answers: ["No", "Maybe", "Yes", "Perhaps"], correct: 2 },
    { prompt: "No", answers: ["Yes", "No", "Never", "Always"], correct: 1 },
    { prompt: "Por favor", answers: ["Thank you", "Please", "Sorry", "Cheers"], correct: 1 },
    { prompt: "Buenos días", answers: ["Good night", "Good afternoon", "Good morning", "See you later"], correct: 2 },
    { prompt: "Agua", answers: ["Bread", "Milk", "Wine", "Water"], correct: 3 },
    { prompt: "Uno", answers: ["Two", "Three", "One", "Four"], correct: 2 },
    { prompt: "Amigo", answers: ["Friend (female)", "Friend (male)", "Brother", "Father"], correct: 1 },
    { prompt: "Gato", answers: ["Dog", "Cat", "Bird", "Fish"], correct: 1 },
    { prompt: "Perro", answers: ["Cat", "Horse", "Dog", "Rabbit"], correct: 2 },
  ],
  "A1.2": [
    { prompt: "Buenas noches", answers: ["Good morning", "Good night", "Good afternoon", "Hello"], correct: 1 },
    { prompt: "Perdón", answers: ["Excuse me / Sorry", "Thank you", "Goodbye", "Fine"], correct: 0 },
    { prompt: "Me llamo Ana", answers: ["My name is Ana", "I have Ana", "I'm from Ana", "You are Ana"], correct: 0 },
    { prompt: "¿Cómo estás?", answers: ["What time is it?", "How are you?", "Where are you from?", "How old are you?"], correct: 1 },
    { prompt: "Estoy bien", answers: ["I am fine", "I have fine", "I'm here", "I go fine"], correct: 0 },
    { prompt: "Dos", answers: ["One", "Two", "Three", "Ten"], correct: 1 },
    { prompt: "Rojo", answers: ["Blue", "Green", "Red", "Black"], correct: 2 },
    { prompt: "Casa", answers: ["Car", "House", "Street", "Bed"], correct: 1 },
    { prompt: "Libro", answers: ["Table", "Chair", "Book", "Pencil"], correct: 2 },
    { prompt: "Madre", answers: ["Father", "Mother", "Sister", "Grandmother"], correct: 1 },
    { prompt: "Padre", answers: ["Mother", "Father", "Uncle", "Son"], correct: 1 },
    { prompt: "Soy de México", answers: ["I'm going to Mexico", "I'm from Mexico", "I have Mexico", "I am Mexico"], correct: 1 },
  ],
  "A1.3": [
    { prompt: "Tengo dos hermanos", answers: ["I am two brothers", "There are two brothers", "I have two brothers", "I'm staying two brothers"], correct: 2 },
    { prompt: "La casa es grande", answers: ["The house is big", "The house is small", "The house is here", "A big house"], correct: 0 },
    { prompt: "Hablo poco español", answers: ["I speak a lot of Spanish", "I speak a little Spanish", "I speak Spanish well", "I don't speak Spanish"], correct: 1 },
    { prompt: "¿Qué hora es?", answers: ["What day is it?", "When is it?", "What time is it?", "Where is it?"], correct: 2 },
    { prompt: "Me gusta el café", answers: ["I want coffee", "I make coffee", "I like coffee", "I have coffee"], correct: 2 },
    { prompt: "¿Dónde está el baño?", answers: ["Where is the bathroom?", "What is the bathroom?", "How is the bathroom?", "When the bathroom?"], correct: 0 },
    { prompt: "Tengo hambre", answers: ["I am thirsty", "I am hungry", "I am tired", "I am hot"], correct: 1 },
    { prompt: "Hoy es lunes", answers: ["Today is Monday", "Tomorrow is Monday", "Yesterday was Monday", "Today is Sunday"], correct: 0 },
    { prompt: "Ella es mi hermana", answers: ["He is my sister", "She is my sister", "She is my mom", "She is my brother"], correct: 1 },
    { prompt: "¿Cuántos años tienes?", answers: ["What's your name?", "How old are you?", "Where do you live?", "What do you do?"], correct: 1 },
    { prompt: "Vivo en un apartamento pequeño", answers: ["I live in a big apartment", "I live in a small apartment", "I have a small apartment", "I'm at a small apartment"], correct: 1 },
    { prompt: "Hace frío hoy", answers: ["It is cold today", "It is hot today", "It is windy today", "It rains today"], correct: 0 },
  ],

  // ============ A2 ============
  "A2.1": [
    { prompt: "Normalmente me despierto a las 7", answers: ["I'm awake at 7", "I usually wake up at 7", "I wake up only at 7", "I'll wake up at 7"], correct: 1 },
    { prompt: "Ella trabaja en un hospital", answers: ["She works in a hospital", "She worked at a hospital", "She is a hospital", "She visits a hospital"], correct: 0 },
    { prompt: "Nosotros nunca comemos carne", answers: ["We sometimes eat meat", "We never eat meat", "We always eat meat", "We don't eat meat tonight"], correct: 1 },
    { prompt: "¿Te gusta bailar?", answers: ["Do you like to dance?", "Are you dancing?", "Do you dance well?", "Did you dance?"], correct: 0 },
    { prompt: "Tengo que estudiar esta noche", answers: ["I want to study tonight", "I have to study tonight", "I should study tomorrow", "I'll study later"], correct: 1 },
    { prompt: "Hay muchas personas", answers: ["There are many people", "They are many people", "We are many people", "It has many people"], correct: 0 },
    { prompt: "Puedo nadar", answers: ["I want to swim", "I will swim", "I can swim", "I am swimming"], correct: 2 },
    { prompt: "Mi cumpleaños es en mayo", answers: ["My birthday is in May", "My birthday was in May", "I'm going to May", "My party is May"], correct: 0 },
    { prompt: "Esta camisa es más cara", answers: ["This shirt is cheaper", "This shirt is more expensive", "This shirt is very nice", "This is the shirt"], correct: 1 },
    { prompt: "Voy al parque", answers: ["I'm going to the park", "I came from the park", "I live near the park", "I want a park"], correct: 0 },
  ],
  "A2.2": [
    { prompt: "Fui al cine ayer", answers: ["I went to the cinema yesterday", "I go to the cinema today", "I'll go to the cinema", "I'm at the cinema"], correct: 0 },
    { prompt: "Ella comió mucho", answers: ["She eats a lot", "She ate a lot", "She is eating", "She will eat"], correct: 1 },
    { prompt: "Compramos un coche nuevo", answers: ["We sold a new car", "We bought a new car", "We rent a new car", "We need a new car"], correct: 1 },
    { prompt: "Vivieron en España", answers: ["They live in Spain", "They lived in Spain", "They will live in Spain", "They visit Spain"], correct: 1 },
    { prompt: "¿Qué hiciste?", answers: ["What did you do?", "What are you doing?", "What will you do?", "What to do?"], correct: 0 },
    { prompt: "Todavía no he comido", answers: ["I haven't eaten yet", "I never eat", "I won't eat today", "I just ate"], correct: 0 },
    { prompt: "Estaba lloviendo", answers: ["It is raining", "It was raining", "It rained once", "It will rain"], correct: 1 },
    { prompt: "Jugaba al fútbol", answers: ["I played football (used to)", "I played football (once)", "I play football", "I will play football"], correct: 0 },
    { prompt: "Llegó a las 8", answers: ["He arrives at 8", "He arrived at 8", "He'll arrive at 8", "He used to arrive at 8"], correct: 1 },
    { prompt: "Hemos visitado Madrid", answers: ["We have visited Madrid", "We visited Madrid last week", "We used to visit Madrid", "We will visit Madrid"], correct: 0 },
  ],
  "A2.3": [
    { prompt: "Mañana viajaré", answers: ["Tomorrow I will travel", "Tomorrow I traveled", "Tomorrow I used to travel", "I'm traveling now"], correct: 0 },
    { prompt: "Quisiera un café", answers: ["I want coffee (rude)", "I would like a coffee", "I will want a coffee", "I'd want a coffee"], correct: 1 },
    { prompt: "Si llueve, me quedaré en casa", answers: ["If it rains, I'll stay home", "If it will rain, I stay home", "If it rained, I'd stay home", "I rain home"], correct: 0 },
    { prompt: "Dame el libro, por favor", answers: ["Give me the book, please", "Give the book to me", "Hand him the book", "Take the book"], correct: 0 },
    { prompt: "Se lo di", answers: ["I gave it to him/her", "He gave it to me", "I told it", "I gave him"], correct: 0 },
    { prompt: "No te preocupes", answers: ["Don't worry", "Don't bother me", "Don't ask", "You don't worry me"], correct: 0 },
    { prompt: "Debemos salir ahora", answers: ["We must leave now", "We should leave later", "We can leave now", "We left already"], correct: 0 },
    { prompt: "Estaba leyendo cuando llamé", answers: ["He was reading when I called", "He read when I called", "He reads when I call", "He'll read when I call"], correct: 0 },
    { prompt: "Este restaurante es el mejor", answers: ["This restaurant is the best", "This restaurant is good", "This is a great restaurant", "This restaurant is better"], correct: 0 },
    { prompt: "La conozco desde hace años", answers: ["I have known her for years", "I met her years ago", "I knew her for years", "I will know her"], correct: 0 },
  ],

  // ============ B1 ============
  "B1.1": [
    { prompt: "Quiero que vengas", answers: ["I want you to come", "I want to come", "I'll come with you", "Want me to come?"], correct: 0 },
    { prompt: "Es importante que escuchemos", answers: ["It's important we listen", "It's important to be heard", "Listening is important sometimes", "We're listening"], correct: 0 },
    { prompt: "Dudo que sepa", answers: ["I doubt that he knows", "I doubt that he knew", "I know that he doubts", "I'm sure he knows"], correct: 0 },
    { prompt: "Cuando llegue, llamaré", answers: ["When I arrive, I'll call", "When I arrived, I called", "When I'm calling, I arrive", "I called when arriving"], correct: 0 },
    { prompt: "Espero que te sientas mejor", answers: ["I hope you feel better", "I hope you sit better", "I wait for you to feel", "I'll feel better"], correct: 0 },
    { prompt: "No abras la puerta", answers: ["Don't open the door", "Don't close the door", "Open the door", "The door is open"], correct: 0 },
    { prompt: "Quizá venga", answers: ["Maybe she'll come", "She is coming", "She came already", "She won't come"], correct: 0 },
    { prompt: "Es extraño que no esté aquí", answers: ["It's strange he isn't here", "It's strange to be here", "He is strange here", "It's not strange"], correct: 0 },
    { prompt: "Busco a alguien que hable inglés", answers: ["I'm looking for someone who speaks English", "I found someone who speaks English", "I speak English", "Someone is looking for English"], correct: 0 },
    { prompt: "Antes de que te vayas, come algo", answers: ["Before you leave, eat something", "After you leave, eat something", "Before eating, leave", "Don't eat before leaving"], correct: 0 },
  ],
  "B1.2": [
    { prompt: "Viajaría si tuviera dinero", answers: ["I would travel if I had money", "I will travel if I have money", "I travel because I have money", "I traveled with money"], correct: 0 },
    { prompt: "Me dijo que estaba cansado", answers: ["He told me he was tired", "He told me he is tired", "He'll tell me he's tired", "He tells me he was tired"], correct: 0 },
    { prompt: "Para mañana habré terminado", answers: ["By tomorrow I will have finished", "Tomorrow I finished", "I'll finish tomorrow", "I finish for tomorrow"], correct: 0 },
    { prompt: "Ha estado lloviendo todo el día", answers: ["It has been raining all day", "It rains all day", "It rained today", "It will rain all day"], correct: 0 },
    { prompt: "Me preguntó dónde vivía", answers: ["She asked me where I lived", "She asked me where I live", "She asks where I lived", "She told me where she lived"], correct: 0 },
    { prompt: "El libro que leí", answers: ["The book that I read", "The book I'm reading", "Whose book I read", "The book to read"], correct: 0 },
    { prompt: "Ya había comido", answers: ["I had already eaten", "I have already eaten", "I already eat", "I'll already eat"], correct: 0 },
    { prompt: "Es la mejor película que he visto", answers: ["It's the best film I have seen", "It's a good film I saw", "It's the film I will see", "It's a film I see"], correct: 0 },
    { prompt: "Le pedí que ayudara", answers: ["I asked him to help", "I helped him", "I asked for help", "He asked me to help"], correct: 0 },
    { prompt: "Aunque es rico, no es feliz", answers: ["Although he's rich, he isn't happy", "Because he's rich, he is happy", "Maybe he's rich and happy", "He's rich but tired"], correct: 0 },
  ],
  "B1.3": [
    { prompt: "Es necesario actuar ya", answers: ["It's necessary to act now", "It's necessary to wait", "We are necessary actors", "Act if necessary"], correct: 0 },
    { prompt: "Ojalá pudiera volar", answers: ["I wish I could fly", "I hope you can fly", "I'll fly tomorrow", "I used to fly"], correct: 0 },
    { prompt: "En cuanto llegue, comeremos", answers: ["As soon as he arrives, we'll eat", "When he arrives we ate", "When I arrive we'll eat", "Whenever he arrives, eat"], correct: 0 },
    { prompt: "Se casaron el verano pasado", answers: ["They got married last summer", "They marry next summer", "They get married in summer", "They were marrying"], correct: 0 },
    { prompt: "La hago reír", answers: ["I make her laugh", "I made her laugh", "She makes me laugh", "I let her laugh"], correct: 0 },
    { prompt: "Me estoy acostumbrando a la ciudad", answers: ["I'm getting used to the city", "I am used to the city", "I will get used to the city", "I have used the city"], correct: 0 },
    { prompt: "Iban a llamar pero no lo hicieron", answers: ["They were going to call but didn't", "They called and left", "They will call later", "They didn't want to call"], correct: 0 },
    { prompt: "La película me hizo llorar", answers: ["The film made me cry", "The film made me laugh", "I made the film cry", "The film I cried"], correct: 0 },
    { prompt: "Me pregunto dónde estará", answers: ["I wonder where he is", "I ask where he was", "I'm asking him where", "Where am I?"], correct: 0 },
    { prompt: "Deberías haberme llamado", answers: ["You should have called me", "You should call me", "You called me already", "You will call me"], correct: 0 },
  ],

  // ============ B2 ============
  "B2.1": [
    { prompt: "El coche fue comprado por Juan", answers: ["The car was bought by Juan", "Juan bought the car", "Juan is buying the car", "Juan was the car"], correct: 0 },
    { prompt: "Se dice que es rico", answers: ["It is said that he is rich", "He says he is rich", "They told him he's rich", "He's saying he's rich"], correct: 0 },
    { prompt: "Si hubiera sabido, habría venido", answers: ["Had I known, I would have come", "If I know, I'll come", "I knew, so I came", "If I came, I would know"], correct: 0 },
    { prompt: "Lo que digas", answers: ["Whatever you say", "What did you say?", "Whatever I say", "Whoever says it"], correct: 0 },
    { prompt: "Ya va siendo hora de que nos vayamos", answers: ["It's high time we left", "It's time we are going", "Now we leave", "Time goes by"], correct: 0 },
    { prompt: "A pesar de la lluvia, salimos", answers: ["Despite the rain, we went out", "Because of the rain, we went out", "We went out for the rain", "We can't go out"], correct: 0 },
    { prompt: "Le hice hacerlo", answers: ["I made him do it", "I helped him do it", "I let him do it", "I did it for him"], correct: 0 },
    { prompt: "Debe de haberse ido ya", answers: ["He must have left already", "He should leave now", "He had to leave", "He won't leave"], correct: 0 },
    { prompt: "Conseguimos terminar", answers: ["We managed to finish", "We need to finish", "We start to finish", "We almost finished"], correct: 0 },
    { prompt: "Vale la pena verlo", answers: ["It's worth seeing", "It's worth more", "It costs to see", "It's painful to see"], correct: 0 },
  ],
  "B2.2": [
    { prompt: "Por mucho que lo intente", answers: ["No matter how hard he tries", "He tried a lot", "He tries much more", "However he tries it"], correct: 0 },
    { prompt: "Actúa como si fuera rico", answers: ["He acts as if he were rich", "He acts because he is rich", "He's acting rich already", "He's a rich actor"], correct: 0 },
    { prompt: "Lo mejor sería esperar", answers: ["It would be best to wait", "Waiting is not the best", "Waiting is the worst", "It's good to leave"], correct: 0 },
    { prompt: "Lo hice arreglar", answers: ["I had it fixed", "I fixed it myself", "I tried to fix it", "I'll fix it later"], correct: 0 },
    { prompt: "Lo que me sorprende es el silencio", answers: ["What surprises me is the silence", "I'm surprised by noise", "Silence surprises me sometimes", "I want silence"], correct: 0 },
    { prompt: "Niega haberlo dicho", answers: ["He denies having said it", "He says it again", "He denies the truth", "He won't say it"], correct: 0 },
    { prompt: "Con tal de que estudies", answers: ["Provided that you study", "Because you study", "While you study", "Even if you don't study"], correct: 0 },
    { prompt: "Tengo muchas ganas de verte", answers: ["I look forward to seeing you", "I have wanted to see you", "I wish I saw you", "I miss seeing you"], correct: 0 },
    { prompt: "No es que no me guste", answers: ["It's not that I don't like it", "I really don't like it", "I might like it", "I don't really like it"], correct: 0 },
    { prompt: "Logró que hablara", answers: ["She got me to talk", "She talked to me", "She let me talk", "She wanted to talk"], correct: 0 },
  ],
  "B2.3": [
    { prompt: "De no ser por ti, estaría perdido", answers: ["Were it not for you, I'd be lost", "If you hadn't, I'm lost", "Without you, I lost", "You and I are lost"], correct: 0 },
    { prompt: "Se dice que es un genio", answers: ["He is said to be a genius", "He says he's a genius", "He is a genius", "We call him a genius"], correct: 0 },
    { prompt: "No puedo evitar reírme", answers: ["I can't help laughing", "I can't stop laughing now", "I won't laugh anymore", "I am laughing"], correct: 0 },
    { prompt: "En cuanto hubo terminado", answers: ["As soon as he had finished", "Whenever he finishes", "Once he's done", "He almost finished"], correct: 0 },
    { prompt: "Quien gane se lleva el premio", answers: ["Whoever wins gets the prize", "The winner had the prize", "Whoever lost the prize", "The prize is won"], correct: 0 },
    { prompt: "Ya es hora de que sepas la verdad", answers: ["It's about time you knew the truth", "Now you know the truth", "You'll know the truth", "Knowing is the truth"], correct: 0 },
    { prompt: "Insiste en pagar", answers: ["He insists on paying", "He refuses to pay", "He pretends to pay", "He's about to pay"], correct: 0 },
    { prompt: "Apenas había llegado cuando…", answers: ["Hardly had I arrived when…", "I almost arrived", "I arrived later when…", "I just arrived now"], correct: 0 },
    { prompt: "Hace como que no entiende", answers: ["He pretends not to understand", "He doesn't understand", "He acts smart", "He explains it"], correct: 0 },
    { prompt: "Parece poco probable que venga", answers: ["It seems unlikely she'll come", "It seems she's coming", "She probably came", "She'll likely come"], correct: 0 },
  ],

  // ============ C1 ============
  "C1.1": [
    { prompt: "No sea que se te olvide", answers: ["Lest you forget", "In case you remember", "So that you remember it", "Don't ever forget"], correct: 0 },
    { prompt: "Lejos de mí criticar", answers: ["Far be it from me to criticize", "I'm far from criticism", "I never criticize anyone", "Don't criticize me"], correct: 0 },
    { prompt: "Pase lo que pase", answers: ["Come what may", "What happened, happened", "It will pass", "Whatever passes by"], correct: 0 },
    { prompt: "Le salió el tiro por la culata", answers: ["It backfired on him", "He shot the target", "He missed the shot", "He hit the back"], correct: 0 },
    { prompt: "Andarse por las ramas", answers: ["To beat about the bush", "To climb a tree", "To take a walk", "To explain plainly"], correct: 0 },
    { prompt: "En un abrir y cerrar de ojos", answers: ["In the blink of an eye", "Right before sleep", "When you blink", "Quick as a wink"], correct: 0 },
    { prompt: "La gota que colmó el vaso", answers: ["The straw that broke the camel's back", "A drop in the bucket", "The last sip", "Filling the glass"], correct: 0 },
    { prompt: "Mordió el polvo", answers: ["He bit the dust", "He breathed dust", "He fell asleep", "He coughed loudly"], correct: 0 },
    { prompt: "De Pascuas a Ramos", answers: ["Once in a blue moon", "Easter to Christmas", "Holiday to holiday", "Every season"], correct: 0 },
    { prompt: "Tomar con pinzas", answers: ["To take with a grain of salt", "To handle with care", "To pick gently", "To grab with tongs literally"], correct: 0 },
  ],
  "C1.2": [
    { prompt: "Estaba a punto de irse", answers: ["He was about to leave", "He was leaving slowly", "He just left", "He'll leave soon"], correct: 0 },
    { prompt: "Pensándolo bien", answers: ["On second thought", "Thinking properly", "Good thinking!", "Thoughtfully done"], correct: 0 },
    { prompt: "Me retracto", answers: ["I take it back", "I move backwards", "I'll retract later", "I withdraw money"], correct: 0 },
    { prompt: "Así de pronto", answers: ["Off the top of my head", "Right away", "Like that suddenly", "Soon enough"], correct: 0 },
    { prompt: "Vale su peso en oro", answers: ["Worth its weight in gold", "Costs gold to weigh", "Weighs as much as gold", "Gold is heavy"], correct: 0 },
    { prompt: "Meter la pata", answers: ["To put one's foot in it", "To kick the ball", "To stomp angrily", "To trip"], correct: 0 },
    { prompt: "A la mínima", answers: ["At the drop of a hat", "At the minimum cost", "At least once", "Hardly ever"], correct: 0 },
    { prompt: "Del dicho al hecho hay mucho trecho", answers: ["Easier said than done", "Saying is doing", "From word to deed is short", "Speak then act"], correct: 0 },
    { prompt: "Llover a cántaros", answers: ["To rain cats and dogs", "To pour into jars", "To drizzle softly", "To rain on parade"], correct: 0 },
    { prompt: "Echarse atrás", answers: ["To get cold feet", "To lean back", "To go backwards", "To rest"], correct: 0 },
  ],
  "C1.3": [
    { prompt: "Hacer la vista gorda", answers: ["To turn a blind eye", "To stare hard", "To gain weight", "To make eye contact"], correct: 0 },
    { prompt: "Matar dos pájaros de un tiro", answers: ["To kill two birds with one stone", "To shoot a bird twice", "To hunt two birds", "To aim and miss"], correct: 0 },
    { prompt: "Es pan comido", answers: ["It's a piece of cake", "It's already eaten", "Bread is gone", "It's tasty"], correct: 0 },
    { prompt: "Hablando del rey de Roma", answers: ["Speak of the devil", "Talking about the king", "Roman royalty speaks", "Mentioning royalty"], correct: 0 },
    { prompt: "Estar en el séptimo cielo", answers: ["To be on cloud nine", "To be in the 7th seat", "To be very high up", "To pray to heaven"], correct: 0 },
    { prompt: "Costar un ojo de la cara", answers: ["To cost an arm and a leg", "To cost an eye", "To be priceless gift", "To be cheap"], correct: 0 },
    { prompt: "Irse de la lengua", answers: ["To spill the beans", "To slip on the tongue", "To bite one's tongue", "To talk fast"], correct: 0 },
    { prompt: "Apretar los dientes", answers: ["To bite the bullet", "To smile widely", "To clench fists", "To hold breath"], correct: 0 },
    { prompt: "Dar en el clavo", answers: ["To hit the nail on the head", "To give a nail", "To miss the point", "To strike blindly"], correct: 0 },
    { prompt: "Quemarse las pestañas", answers: ["To burn the midnight oil", "To burn one's eyelashes", "To stay up briefly", "To get sunburned"], correct: 0 },
  ],

  // ============ C2 ============
  "C2.1": [
    { prompt: "Tirar la toalla", answers: ["To throw in the towel", "To wash the towel", "To dry off", "To throw a party"], correct: 0 },
    { prompt: "Tomar el pelo", answers: ["To pull someone's leg", "To grab the hair", "To get a haircut", "To take seriously"], correct: 0 },
    { prompt: "Consultarlo con la almohada", answers: ["To sleep on it", "To talk to a pillow", "To dream about it", "To rest the head"], correct: 0 },
    { prompt: "No hay mal que por bien no venga", answers: ["A blessing in disguise", "There is no evil", "Bad never comes good", "Good follows bad fast"], correct: 0 },
    { prompt: "Por los pelos", answers: ["By the skin of one's teeth", "By the hair", "By inches", "Just barely missed"], correct: 0 },
    { prompt: "Hacer lo imposible", answers: ["To bend over backwards", "To do the impossible literally", "To try sometimes", "To work overtime"], correct: 0 },
    { prompt: "Al pan, pan y al vino, vino", answers: ["To call a spade a spade", "Bread and wine for all", "Eat bread, drink wine", "Name your food"], correct: 0 },
    { prompt: "Desahogarse", answers: ["To get something off one's chest", "To unwind", "To breathe deeply", "To complain a lot"], correct: 0 },
    { prompt: "En el calor del momento", answers: ["In the heat of the moment", "When it's hot outside", "In a warm second", "During the day"], correct: 0 },
    { prompt: "Enterrar el hacha de guerra", answers: ["To bury the hatchet", "To dig up an axe", "To go to war", "To hide a weapon"], correct: 0 },
  ],
  "C2.2": [
    { prompt: "Hacer de abogado del diablo", answers: ["To play devil's advocate", "To defend the devil", "To be a tricky lawyer", "To act as an actor"], correct: 0 },
    { prompt: "Una tormenta en un vaso de agua", answers: ["A storm in a teacup", "A real disaster", "Rain in the cup", "A tempest brewing"], correct: 0 },
    { prompt: "Llevar el corazón en la mano", answers: ["To wear one's heart on one's sleeve", "To hold the heart literally", "To be heartless", "To carry love"], correct: 0 },
    { prompt: "Dormirse en los laureles", answers: ["To rest on one's laurels", "To take a nap", "To dream of glory", "To win and stop"], correct: 0 },
    { prompt: "Coger el toro por los cuernos", answers: ["Take the bull by the horns", "Run from the bull", "Hold the bull's tail", "Avoid problems"], correct: 0 },
    { prompt: "Para colmo de males", answers: ["To add insult to injury", "On top of bad things only", "All evils gathered", "Just one more thing"], correct: 0 },
    { prompt: "Un lobo con piel de cordero", answers: ["A wolf in sheep's clothing", "A wolfish lamb", "A scary sheep", "A sheep with fangs"], correct: 0 },
    { prompt: "Meterse en un laberinto sin fin", answers: ["To go down a rabbit hole", "To be lost forever literally", "To enter a maze", "To explore endlessly"], correct: 0 },
    { prompt: "Le dijo la sartén al cazo", answers: ["The pot calling the kettle black", "The pan and pot talked", "Kitchen tools fight", "An old saying"], correct: 0 },
    { prompt: "Irse de juerga", answers: ["To paint the town red", "To leave a party", "To run from fun", "To sneak out"], correct: 0 },
  ],
  "C2.3": [
    { prompt: "Genio y figura hasta la sepultura", answers: ["A leopard cannot change its spots", "Genius lasts forever", "Talent endures life", "Once a star, always"], correct: 0 },
    { prompt: "Cortar por lo sano", answers: ["To cut the Gordian knot", "To slice cleanly", "To stay healthy", "To act decisively only"], correct: 0 },
    { prompt: "Encontrar la horma de su zapato", answers: ["To meet one's Waterloo", "To find the right shoe literally", "To find one's match", "To outsmart someone"], correct: 0 },
    { prompt: "Sobrar adornos", answers: ["To gild the lily", "To overdecorate a tree", "To add too much", "To run out of decoration"], correct: 0 },
    { prompt: "Una victoria pírrica", answers: ["A Pyrrhic victory", "A small win", "A great triumph", "An expected loss"], correct: 0 },
    { prompt: "Echar margaritas a los cerdos", answers: ["To cast pearls before swine", "To feed pigs flowers", "To waste daisies", "To throw pearls away"], correct: 0 },
    { prompt: "Regodearse en la desgracia ajena", answers: ["Schadenfreude", "True empathy", "Helping the unlucky", "Quiet sadness"], correct: 0 },
    { prompt: "Hilar muy fino", answers: ["To split hairs", "To weave thread", "To work delicately", "To miss details"], correct: 0 },
    { prompt: "Como pez fuera del agua", answers: ["Like a fish out of water", "Drying off literally", "Swimming alone", "Caught off guard"], correct: 0 },
    { prompt: "Hacer un esfuerzo adicional", answers: ["To go the extra mile", "To do extra work literally", "To try a bit more", "To run faster"], correct: 0 },
  ],
};

type DbQuestionRow = {
  prompt: string;
  answers: unknown;
  correct: number;
};

const shuffle = <T,>(arr: T[]): T[] => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const normalizeDbQuestion = (row: DbQuestionRow): Question | null => {
  if (!Array.isArray(row.answers)) return null;
  const answers = row.answers.filter((a): a is string => typeof a === "string");
  if (answers.length !== row.answers.length || answers.length === 0) return null;
  if (!Number.isInteger(row.correct) || row.correct < 0 || row.correct >= answers.length) return null;
  return { prompt: row.prompt, answers, correct: row.correct };
};

export async function pickQuestions(level: Level, n = 5): Promise<Question[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("questions")
    .select("prompt, answers, correct")
    .eq("level", level);

  if (error) {
    throw new Error(error.message || "Failed to load questions from the database.");
  }

  const pool = (data ?? [])
    .map((row) => normalizeDbQuestion(row as DbQuestionRow))
    .filter((q): q is Question => q !== null);

  if (pool.length < n) {
    throw new Error(`Not enough questions in DB for ${level}. Need ${n}, found ${pool.length}.`);
  }

  return shuffle(pool).slice(0, n).map((q) => {
    const indices = shuffle(q.answers.map((_, i) => i));
    const answers = indices.map((i) => q.answers[i]);
    const correct = indices.indexOf(q.correct);
    return { ...q, answers, correct };
  });
}
