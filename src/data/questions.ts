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

// --- Question bank: fake data, will be replaced by a database. ---
export const QUESTION_BANK: Record<Level, Question[]> = {
  // ============ A1 ============
  "A1.1": [
    { prompt: '"Hello"', answers: ["Hola","Adiós","Gracias","Por favor"], correct: 0 },
    { prompt: '"Goodbye"', answers: ["Hola","Adiós","Buenos días","Sí"], correct: 1 },
    { prompt: '"Thank you"', answers: ["Lo siento","Gracias","De nada","Hola"], correct: 1 },
    { prompt: '"Yes"', answers: ["No","Tal vez","Sí","Quizás"], correct: 2 },
    { prompt: '"No"', answers: ["Sí","No","Nunca","Siempre"], correct: 1 },
    { prompt: '"Please"', answers: ["Gracias","Por favor","Lo siento","Salud"], correct: 1 },
    { prompt: '"Good morning"', answers: ["Buenas noches","Buenas tardes","Buenos días","Hasta luego"], correct: 2 },
    { prompt: '"Water"', answers: ["Pan","Leche","Vino","Agua"], correct: 3 },
    { prompt: '"One"', answers: ["Dos","Tres","Uno","Cuatro"], correct: 2 },
    { prompt: '"Friend (male)"', answers: ["Amiga","Amigo","Hermano","Padre"], correct: 1 },
    { prompt: '"Cat"', answers: ["Perro","Gato","Pájaro","Pez"], correct: 1 },
    { prompt: '"Dog"', answers: ["Gato","Caballo","Perro","Conejo"], correct: 2 },
  ],
  "A1.2": [
    { prompt: '"Good night"', answers: ["Buenos días","Buenas noches","Buenas tardes","Hola"], correct: 1 },
    { prompt: '"Excuse me"', answers: ["Perdón","Gracias","Adiós","Bien"], correct: 0 },
    { prompt: '"My name is Ana"', answers: ["Me llamo Ana","Tengo Ana","Soy de Ana","Tú eres Ana"], correct: 0 },
    { prompt: '"How are you?" (informal)', answers: ["¿Qué hora es?","¿Cómo estás?","¿De dónde eres?","¿Cuántos años?"], correct: 1 },
    { prompt: '"I am fine"', answers: ["Estoy bien","Soy bien","Tengo bien","Hay bien"], correct: 0 },
    { prompt: '"Two"', answers: ["Uno","Dos","Tres","Diez"], correct: 1 },
    { prompt: '"Red"', answers: ["Azul","Verde","Rojo","Negro"], correct: 2 },
    { prompt: '"House"', answers: ["Coche","Casa","Calle","Cama"], correct: 1 },
    { prompt: '"Book"', answers: ["Mesa","Silla","Libro","Lápiz"], correct: 2 },
    { prompt: '"Mother"', answers: ["Padre","Madre","Hermana","Abuela"], correct: 1 },
    { prompt: '"Father"', answers: ["Madre","Padre","Tío","Hijo"], correct: 1 },
    { prompt: '"I am from Mexico"', answers: ["Voy a México","Soy de México","Estoy México","Tengo México"], correct: 1 },
  ],
  "A1.3": [
    { prompt: '"I have two brothers"', answers: ["Soy dos hermanos","Hay dos hermanos","Tengo dos hermanos","Estoy dos hermanos"], correct: 2 },
    { prompt: '"The house is big"', answers: ["La casa es grande","El casa es grande","La casa está grande","Una casa grande"], correct: 0 },
    { prompt: '"I speak a little Spanish"', answers: ["Hablo mucho español","Hablo poco español","Hablo español bien","No hablo español"], correct: 1 },
    { prompt: '"What time is it?"', answers: ["¿Qué día es?","¿Cuándo es?","¿Qué hora es?","¿Dónde está?"], correct: 2 },
    { prompt: '"I like coffee"', answers: ["Yo café","Quiero el café","Me gusta el café","Tengo café"], correct: 2 },
    { prompt: '"Where is the bathroom?"', answers: ["¿Dónde está el baño?","¿Qué es el baño?","¿Cómo es el baño?","¿Cuándo el baño?"], correct: 0 },
    { prompt: '"I am hungry"', answers: ["Estoy hambre","Tengo hambre","Soy hambre","Hay hambre"], correct: 1 },
    { prompt: '"Today is Monday"', answers: ["Hoy es lunes","Mañana es lunes","Ayer es lunes","Hoy lunes está"], correct: 0 },
    { prompt: '"She is my sister"', answers: ["Él es mi hermana","Ella es mi hermana","Ella está mi hermana","Ella es mi hermano"], correct: 1 },
    { prompt: '"How old are you?"', answers: ["¿Cómo te llamas?","¿Cuántos años tienes?","¿Dónde vives?","¿Qué haces?"], correct: 1 },
    { prompt: '"I live in a small apartment"', answers: ["Vivo en un apartamento pequeño","Soy en apartamento pequeño","Tengo apartamento pequeño","Estoy apartamento pequeño"], correct: 0 },
    { prompt: '"It is cold today"', answers: ["Hace frío hoy","Es frío hoy","Está frío hoy","Tiene frío hoy"], correct: 0 },
  ],

  // ============ A2 ============
  "A2.1": [
    { prompt: '"I usually wake up at 7"', answers: ["Normalmente me despierto a las 7","Normalmente despierto a las 7","Soy despierto a las 7","Estoy despierto las 7"], correct: 0 },
    { prompt: '"She works in a hospital"', answers: ["Ella trabaja en un hospital","Ella trabajo el hospital","Ella es trabajar hospital","Ella está hospital"], correct: 0 },
    { prompt: '"We never eat meat"', answers: ["Nosotros nunca comemos carne","Nosotros no comer carne","Nosotros nunca come carne","Nosotros no carne comemos"], correct: 0 },
    { prompt: '"Do you like to dance?"', answers: ["¿Te gusta bailar?","¿Tú gusta bailas?","¿Bailas gusta?","¿Te gustas bailar?"], correct: 0 },
    { prompt: '"I have to study tonight"', answers: ["Tengo que estudiar esta noche","Tengo estudiar esta noche","Debo de estudiando","Voy estudio esta noche"], correct: 0 },
    { prompt: '"There are many people"', answers: ["Hay muchas personas","Son muchas personas","Están muchas personas","Tienen muchas personas"], correct: 0 },
    { prompt: '"I can swim"', answers: ["Puedo nadar","Puedo nado","Sé nadando","Soy nadar"], correct: 0 },
    { prompt: '"My birthday is in May"', answers: ["Mi cumpleaños es en mayo","Mi cumpleaños está mayo","Mi cumpleaños tiene mayo","Mi cumpleaños hay mayo"], correct: 0 },
    { prompt: '"This shirt is more expensive"', answers: ["Esta camisa es más cara","Esta camisa es muy cara","Esta camisa más cara","Esta es camisa más cara"], correct: 0 },
    { prompt: '"I am going to the park"', answers: ["Voy al parque","Voy a el parque","Vengo al parque","Estoy parque"], correct: 0 },
  ],
  "A2.2": [
    { prompt: '"I went to the cinema yesterday"', answers: ["Fui al cine ayer","Voy al cine ayer","Iré al cine ayer","Estoy al cine ayer"], correct: 0 },
    { prompt: '"She ate a lot"', answers: ["Ella comió mucho","Ella come mucho","Ella ha come mucho","Ella comer mucho"], correct: 0 },
    { prompt: '"We bought a new car"', answers: ["Compramos un coche nuevo","Compramos coche nuevo","Hemos compramos un coche","Compraremos un coche"], correct: 0 },
    { prompt: '"They lived in Spain"', answers: ["Vivieron en España","Vivían en España (used-to)","Han vivido en España","Vivirán en España"], correct: 0 },
    { prompt: '"What did you do?"', answers: ["¿Qué hiciste?","¿Qué haces?","¿Qué harás?","¿Qué hacer?"], correct: 0 },
    { prompt: '"I haven\'t eaten yet"', answers: ["Todavía no he comido","Todavía no comer","No comí todavía nunca","Nunca como todavía"], correct: 0 },
    { prompt: '"It was raining"', answers: ["Estaba lloviendo","Está lloviendo","Llovió mucho","Lloverá"], correct: 0 },
    { prompt: '"I used to play football"', answers: ["Jugaba al fútbol","Jugué al fútbol","Juego al fútbol","Jugaré al fútbol"], correct: 0 },
    { prompt: '"He arrived at 8"', answers: ["Llegó a las 8","Llega a las 8","Llegará a las 8","Llegaba a las 8 (often)"], correct: 0 },
    { prompt: '"We have visited Madrid"', answers: ["Hemos visitado Madrid","Visitamos Madrid (last week)","Visitábamos Madrid","Visitaremos Madrid"], correct: 0 },
  ],
  "A2.3": [
    { prompt: '"Tomorrow I will travel"', answers: ["Mañana viajaré","Mañana viajé","Mañana viajaba","Mañana viajo (right now)"], correct: 0 },
    { prompt: '"I would like a coffee"', answers: ["Quisiera un café","Quiero un café (rude)","Querré un café","Querría un café"], correct: 0 },
    { prompt: '"If it rains, I\'ll stay home"', answers: ["Si llueve, me quedaré en casa","Si lloverá, me quedo en casa","Si llovería, me quedaría","Si lluevo, me quedo"], correct: 0 },
    { prompt: '"Give me the book, please"', answers: ["Dame el libro, por favor","Da me libro, por favor","Me da el libro","Me das libro"], correct: 0 },
    { prompt: '"I gave it to him"', answers: ["Se lo di","Le lo di","Lo le di","Yo di a él"], correct: 0 },
    { prompt: '"Don\'t worry"', answers: ["No te preocupes","No te preocupas","No preocupar","No te preocupar"], correct: 0 },
    { prompt: '"We must leave now"', answers: ["Debemos salir ahora","Debemos salimos ahora","Tenemos salir ahora","Hay que salimos"], correct: 0 },
    { prompt: '"He was reading when I called"', answers: ["Estaba leyendo cuando llamé","Leyó cuando llamé","Lee cuando llamé","Leerá cuando llamé"], correct: 0 },
    { prompt: '"This restaurant is the best"', answers: ["Este restaurante es el mejor","Este restaurante es más bueno","Este restaurante el mejor es","Este restaurante es mucho bueno"], correct: 0 },
    { prompt: '"I have known her for years"', answers: ["La conozco desde hace años","La conocí desde años","La conocía desde años","La conoceré desde años"], correct: 0 },
  ],

  // ============ B1 ============
  "B1.1": [
    { prompt: '"I want you to come"', answers: ["Quiero que vengas","Quiero que vienes","Quiero tú vienes","Te quiero venir"], correct: 0 },
    { prompt: '"It\'s important that we listen"', answers: ["Es importante que escuchemos","Es importante que escuchamos","Es importante escuchamos","Es importante escuchen"], correct: 0 },
    { prompt: '"I doubt that he knows"', answers: ["Dudo que sepa","Dudo que sabe","Dudo él sabe","No sé que duda"], correct: 0 },
    { prompt: '"When I arrive, I\'ll call"', answers: ["Cuando llegue, llamaré","Cuando llego, llamaré","Cuando llegaré, llamo","Cuando llegando, llamo"], correct: 0 },
    { prompt: '"I hope you feel better"', answers: ["Espero que te sientas mejor","Espero que te sientes mejor","Espero te sientas mejor","Esperando te mejor"], correct: 0 },
    { prompt: '"Don\'t open the door"', answers: ["No abras la puerta","No abres la puerta","No abrir la puerta","No abrirás puerta"], correct: 0 },
    { prompt: '"Maybe she\'ll come"', answers: ["Quizá venga","Quizá viene (certain)","Quizá vendrá (less subj.)","Quizá vino"], correct: 0 },
    { prompt: '"It\'s strange that he isn\'t here"', answers: ["Es extraño que no esté aquí","Es extraño que no está aquí","Es extraño no estar aquí","Es extraño no es aquí"], correct: 0 },
    { prompt: '"I look for someone who speaks English"', answers: ["Busco a alguien que hable inglés","Busco a alguien que habla inglés","Busco alguien hablar inglés","Busco a alguien hablando inglés"], correct: 0 },
    { prompt: '"Before you leave, eat something"', answers: ["Antes de que te vayas, come algo","Antes de que te vas, come algo","Antes te vas, come","Antes irse, come algo"], correct: 0 },
  ],
  "B1.2": [
    { prompt: '"I would travel if I had money"', answers: ["Viajaría si tuviera dinero","Viajaré si tendría dinero","Viajo si tenía dinero","Viajara si tendría dinero"], correct: 0 },
    { prompt: '"He told me he was tired"', answers: ["Me dijo que estaba cansado","Me dijo que está cansado","Me dice que estaba cansado","Me dirá que está cansado"], correct: 0 },
    { prompt: '"By tomorrow I will have finished"', answers: ["Para mañana habré terminado","Mañana terminé","Mañana termino","Mañana voy a terminar"], correct: 0 },
    { prompt: '"It has been raining all day"', answers: ["Ha estado lloviendo todo el día","Llueve todo el día","Llovió todo el día","Lloverá todo el día"], correct: 0 },
    { prompt: '"She asked me where I lived"', answers: ["Me preguntó dónde vivía","Me preguntó dónde vivo","Me pregunta dónde vivía","Me preguntó donde vive yo"], correct: 0 },
    { prompt: '"The book that I read"', answers: ["El libro que leí","El libro quien leí","El libro cual leí","El libro de leí"], correct: 0 },
    { prompt: '"I had already eaten"', answers: ["Ya había comido","Ya comí","Ya he comido","Ya comía"], correct: 0 },
    { prompt: '"It\'s the best film I have seen"', answers: ["Es la mejor película que he visto","Es la mejor película que vi","Es la película más buena vi","Es la película mejor que veía"], correct: 0 },
    { prompt: '"I asked him to help"', answers: ["Le pedí que ayudara","Le pedí que ayuda","Le pedí ayuda él","Le pregunté ayudar"], correct: 0 },
    { prompt: '"Although he\'s rich, he isn\'t happy"', answers: ["Aunque es rico, no es feliz","Aunque sea rico, no es feliz (less neutral)","Mientras es rico, no es feliz","Pero es rico, no es feliz"], correct: 0 },
  ],
  "B1.3": [
    { prompt: '"It\'s necessary to act now"', answers: ["Es necesario actuar ya","Es necesario actuamos ya","Es necesario que actuamos","Hay actuar ya"], correct: 0 },
    { prompt: '"I wish I could fly"', answers: ["Ojalá pudiera volar","Ojalá puedo volar","Ojalá podré volar","Ojalá podía volar"], correct: 0 },
    { prompt: '"As soon as he arrives, we\'ll eat"', answers: ["En cuanto llegue, comeremos","En cuanto llega, comemos","En cuanto llegará, comeremos","Tan pronto llega, comeremos"], correct: 0 },
    { prompt: '"They got married last summer"', answers: ["Se casaron el verano pasado","Se casan el verano pasado","Se han casado el verano pasado","Se casaban el verano pasado"], correct: 0 },
    { prompt: '"I make her laugh"', answers: ["La hago reír","Le hago reír (LatAm ok)","Hago la reír","Hago a ella reír"], correct: 0 },
    { prompt: '"I\'m getting used to the city"', answers: ["Me estoy acostumbrando a la ciudad","Estoy acostumbrar la ciudad","Acostumbro me la ciudad","Me acostumbro la ciudad de"], correct: 0 },
    { prompt: '"They were going to call but didn\'t"', answers: ["Iban a llamar pero no lo hicieron","Van a llamar pero no hicieron","Fueron llamar pero no","Habían llamar pero no"], correct: 0 },
    { prompt: '"The film made me cry"', answers: ["La película me hizo llorar","La película me hace llorando","La película hizo llorar a mí","La película llorar a mí hizo"], correct: 0 },
    { prompt: '"I wonder where he is"', answers: ["Me pregunto dónde estará","Me pregunto dónde es","Pregunto donde está","Yo pregunto donde es él"], correct: 0 },
    { prompt: '"You should have called me"', answers: ["Deberías haberme llamado","Debes haber llamado a mí","Debiste llamar a yo","Tendrías llamarme"], correct: 0 },
  ],

  // ============ B2 ============
  "B2.1": [
    { prompt: '"The car was bought by Juan"', answers: ["El coche fue comprado por Juan","El coche compra Juan","El coche es comprado de Juan","Juan es comprado el coche"], correct: 0 },
    { prompt: '"It is said that he is rich"', answers: ["Se dice que es rico","Está dicho que es rico","Es dicho que es rico","Dice que es rico"], correct: 0 },
    { prompt: '"Had I known, I would have come"', answers: ["Si hubiera sabido, habría venido","Si sabía, vine","Si sabré, vendría","Si supe, había venido"], correct: 0 },
    { prompt: '"Whatever you say"', answers: ["Lo que digas","Cualquier que dices","Como quiera dices","Qué digas"], correct: 0 },
    { prompt: '"It\'s high time we left"', answers: ["Ya va siendo hora de que nos vayamos","Es hora de que nos vamos","Hace tiempo nos vamos","Es la hora nos íbamos"], correct: 0 },
    { prompt: '"Despite the rain, we went out"', answers: ["A pesar de la lluvia, salimos","Aunque la lluvia, salimos","Pese la lluvia, salimos","Por la lluvia, salimos"], correct: 0 },
    { prompt: '"I made him do it"', answers: ["Le hice hacerlo","Le hice que lo hace","Lo hice hacer él","Hice él hacerlo"], correct: 0 },
    { prompt: '"He must have left already"', answers: ["Debe de haberse ido ya","Debe ido ya","Debe se ir ya","Debe haberse va ya"], correct: 0 },
    { prompt: '"We managed to finish"', answers: ["Conseguimos terminar","Logramos terminamos","Pudimos terminado","Hicimos terminar"], correct: 0 },
    { prompt: '"It\'s worth seeing"', answers: ["Vale la pena verlo","Vale pena ver","Es valor verlo","Vale ver lo pena"], correct: 0 },
  ],
  "B2.2": [
    { prompt: '"No matter how hard he tries"', answers: ["Por mucho que lo intente","Aunque mucho intenta","Cuán mucho intente","Cuanto más intenta"], correct: 0 },
    { prompt: '"He acts as if he were rich"', answers: ["Actúa como si fuera rico","Actúa como si es rico","Actúa como si sea rico","Actúa como sería rico"], correct: 0 },
    { prompt: '"It would be best to wait"', answers: ["Lo mejor sería esperar","Es mejor esperando","Lo mejor es esperaríamos","Mejor sea esperar"], correct: 0 },
    { prompt: '"I had it fixed"', answers: ["Lo hice arreglar","Lo arreglé hacer","Tuve arreglarlo","Lo había arreglado yo"], correct: 0 },
    { prompt: '"What surprises me is the silence"', answers: ["Lo que me sorprende es el silencio","Que me sorprende es silencio","La sorprende es silencio","El que sorprende silencio"], correct: 0 },
    { prompt: '"He denies having said it"', answers: ["Niega haberlo dicho","Niega que dice","Niega lo dijo","Niega que dijo"], correct: 0 },
    { prompt: '"Provided that you study"', answers: ["Con tal de que estudies","Con tal de que estudias","Si tal estudias","Tal de que estudias"], correct: 0 },
    { prompt: '"I look forward to seeing you"', answers: ["Tengo muchas ganas de verte","Espero adelante verte","Mira hacia adelante verte","Adelante verte deseo"], correct: 0 },
    { prompt: '"It\'s not that I don\'t like it"', answers: ["No es que no me guste","No es que no me gusta","No es no me guste","No que me gusta no"], correct: 0 },
    { prompt: '"She got me to talk"', answers: ["Logró que hablara","Logró yo hablo","Hizo que hablo","Consiguió hablo yo"], correct: 0 },
  ],
  "B2.3": [
    { prompt: '"Were it not for you, I\'d be lost"', answers: ["De no ser por ti, estaría perdido","Si no eres tú, estoy perdido","Sin ser tú, perdería","No por ti, estaría pierdo"], correct: 0 },
    { prompt: '"He is said to be a genius"', answers: ["Se dice que es un genio","Está dicho un genio es","Le dicen un genio","Es dicho como genio"], correct: 0 },
    { prompt: '"I can\'t help laughing"', answers: ["No puedo evitar reírme","No puedo ayudar reír","No puedo no reír","No puedo dejarlo reír"], correct: 0 },
    { prompt: '"As soon as he had finished"', answers: ["En cuanto hubo terminado","En cuanto había terminar","Tan pronto terminaba","Apenas hubiera terminar"], correct: 0 },
    { prompt: '"Whoever wins gets the prize"', answers: ["Quien gane se lleva el premio","Quien gana lleva premio","Cualquiera ganar lleva premio","Si gana cualquier lleva premio"], correct: 0 },
    { prompt: '"It\'s about time you knew the truth"', answers: ["Ya es hora de que sepas la verdad","Es tiempo que sabes verdad","Hora ya sabes verdad","Es de hora sabes la verdad"], correct: 0 },
    { prompt: '"He insists on paying"', answers: ["Insiste en pagar","Insiste de pagar","Insiste a pagar","Insiste por pagar"], correct: 0 },
    { prompt: '"Hardly had I arrived when…"', answers: ["Apenas había llegado cuando…","Apenas llegaba que…","No bien llego cuando","Casi llegué cuando"], correct: 0 },
    { prompt: '"He pretends not to understand"', answers: ["Hace como que no entiende","Pretende no entender (false friend)","Es pretendiendo no entiende","Aparenta no entiende"], correct: 0 },
    { prompt: '"It seems unlikely she\'ll come"', answers: ["Parece poco probable que venga","Parece poco probable que viene","Parece improbable viene","Parece dudoso vendrá"], correct: 0 },
  ],

  // ============ C1 ============
  "C1.1": [
    { prompt: '"Lest you forget"', answers: ["No sea que se te olvide","Para que no olvidas","Salvo que olvides","Excepto olvidaras"], correct: 0 },
    { prompt: '"Far be it from me to criticize"', answers: ["Lejos de mí criticar","Lejano de mí criticar","Sea lejos criticar","Lejos sea criticar"], correct: 0 },
    { prompt: '"Come what may"', answers: ["Pase lo que pase","Pasa lo que pasa","Sea lo pasa","Cualquier pasa"], correct: 0 },
    { prompt: '"It backfired on him"', answers: ["Le salió el tiro por la culata","Le falló la espalda","Le salió detrás","Le golpeó atrás"], correct: 0 },
    { prompt: '"To beat about the bush"', answers: ["Andarse por las ramas","Pegar al arbusto","Caminar por hojas","Saltar el matorral"], correct: 0 },
    { prompt: '"In the blink of an eye"', answers: ["En un abrir y cerrar de ojos","En un parpadeo del ojo","En un guiño","En blink ojos"], correct: 0 },
    { prompt: '"The straw that broke the camel\'s back"', answers: ["La gota que colmó el vaso","La paja que rompió el camello","El último camello","La gota del vaso roto"], correct: 0 },
    { prompt: '"He bit the dust"', answers: ["Mordió el polvo","Comió polvo","Mordisqueó tierra","Probó la arena"], correct: 0 },
    { prompt: '"Once in a blue moon"', answers: ["De Pascuas a Ramos","Cada luna azul","Una vez azul","Cada blue luna"], correct: 0 },
    { prompt: '"To take with a grain of salt"', answers: ["Tomar con pinzas","Tomar con sal","Coger con grano","Sazonar con duda"], correct: 0 },
  ],
  "C1.2": [
    { prompt: '"He was about to leave"', answers: ["Estaba a punto de irse","Estaba sobre irse","Iba para salir casi","Estaba acerca irse"], correct: 0 },
    { prompt: '"On second thought"', answers: ["Pensándolo bien","En segundo pensar","Otra pensada","Pensar segundo"], correct: 0 },
    { prompt: '"I take it back"', answers: ["Me retracto","Lo tomo atrás","Lo regreso","Devuelvo dicho"], correct: 0 },
    { prompt: '"Off the top of my head"', answers: ["Así de pronto","Sobre mi cabeza","De cima cabeza","Al tope cabeza"], correct: 0 },
    { prompt: '"Worth its weight in gold"', answers: ["Vale su peso en oro","Vale en oro pesa","Pesado como oro","Pesa oro vale"], correct: 0 },
    { prompt: '"To put one\'s foot in it"', answers: ["Meter la pata","Poner el pie en eso","Pisar dentro","Hundir el pie"], correct: 0 },
    { prompt: '"At the drop of a hat"', answers: ["A la mínima","Al caer sombrero","Cuando cae gorra","En segundo de gorro"], correct: 0 },
    { prompt: '"Easier said than done"', answers: ["Del dicho al hecho hay mucho trecho","Más fácil decir que hacer","Decir es hacer fácil","Hacer es decir más"], correct: 0 },
    { prompt: '"To rain cats and dogs"', answers: ["Llover a cántaros","Llover gatos y perros","Lluvia bestias","Caer mascotas"], correct: 0 },
    { prompt: '"To get cold feet"', answers: ["Echarse atrás","Tener pies fríos","Enfriarse pies","Helar pies"], correct: 0 },
  ],
  "C1.3": [
    { prompt: '"To turn a blind eye"', answers: ["Hacer la vista gorda","Cerrar ciego ojo","Ojo ciego dar","Voltear ciego"], correct: 0 },
    { prompt: '"To kill two birds with one stone"', answers: ["Matar dos pájaros de un tiro","Matar dos aves con piedra","Tirar piedra dos pájaros","Cazar dos con uno"], correct: 0 },
    { prompt: '"It\'s a piece of cake"', answers: ["Es pan comido","Es trozo torta","Pastel hecho","Comer torta"], correct: 0 },
    { prompt: '"Speak of the devil"', answers: ["Hablando del rey de Roma","Hablar del diablo","Cuando demonio nombras","Diablo aparecer"], correct: 0 },
    { prompt: '"To be on cloud nine"', answers: ["Estar en el séptimo cielo","Estar nube nueve","En cielo nueve","Sobre nube alta"], correct: 0 },
    { prompt: '"To cost an arm and a leg"', answers: ["Costar un ojo de la cara","Costar brazo pierna","Pagar miembros","Vale brazo"], correct: 0 },
    { prompt: '"To spill the beans"', answers: ["Irse de la lengua","Derramar frijoles","Botar habas","Soltar judías"], correct: 0 },
    { prompt: '"Bite the bullet"', answers: ["Apretar los dientes","Morder bala","Tragar plomo","Aceptar bala"], correct: 0 },
    { prompt: '"Hit the nail on the head"', answers: ["Dar en el clavo","Pegar al clavo cabeza","Acertar tornillo","Golpear punto"], correct: 0 },
    { prompt: '"Burning the midnight oil"', answers: ["Quemarse las pestañas","Quemar aceite noche","Velando aceite","Trasnochar aceite"], correct: 0 },
  ],

  // ============ C2 ============
  "C2.1": [
    { prompt: '"To throw in the towel"', answers: ["Tirar la toalla","Echar la toalla dentro","Lanzar pañuelo","Botar trapo"], correct: 0 },
    { prompt: '"To pull someone\'s leg"', answers: ["Tomar el pelo","Tirar pierna","Estirar el muslo","Bromear pierna"], correct: 0 },
    { prompt: '"To sleep on it"', answers: ["Consultarlo con la almohada","Dormir encima","Reposar sobre","Pensar dormido"], correct: 0 },
    { prompt: '"A blessing in disguise"', answers: ["No hay mal que por bien no venga","Bendición disfrazada","Suerte oculta","Gracia escondida"], correct: 0 },
    { prompt: '"By the skin of one\'s teeth"', answers: ["Por los pelos","Por piel dientes","Apenas diente","Por raíz dental"], correct: 0 },
    { prompt: '"To bend over backwards"', answers: ["Hacer lo imposible","Doblarse atrás","Girar espalda","Inclinarse para"], correct: 0 },
    { prompt: '"To call a spade a spade"', answers: ["Al pan, pan y al vino, vino","Llamar pala pala","Decir como es pala","Nombrar herramientas"], correct: 0 },
    { prompt: '"To get something off one\'s chest"', answers: ["Desahogarse","Quitarse del pecho","Sacar del pecho","Aliviar pecho"], correct: 0 },
    { prompt: '"In the heat of the moment"', answers: ["En el calor del momento","Bajo calor instante","En momento caliente","Por calor del rato"], correct: 0 },
    { prompt: '"To bury the hatchet"', answers: ["Enterrar el hacha de guerra","Cavar hacha","Esconder cuchillo","Romper hacha"], correct: 0 },
  ],
  "C2.2": [
    { prompt: '"To play devil\'s advocate"', answers: ["Hacer de abogado del diablo","Jugar diablo abogado","Defender demonio","Hacer rol diablo"], correct: 0 },
    { prompt: '"A storm in a teacup"', answers: ["Una tormenta en un vaso de agua","Tempestad en taza","Lluvia en taza","Borrasca en café"], correct: 0 },
    { prompt: '"To wear one\'s heart on one\'s sleeve"', answers: ["Llevar el corazón en la mano","Vestir corazón manga","Tener corazón fuera","Llorar a diario"], correct: 0 },
    { prompt: '"To rest on one\'s laurels"', answers: ["Dormirse en los laureles","Descansar laureles","Recostarse laurel","Sentarse en gloria"], correct: 0 },
    { prompt: '"Take the bull by the horns"', answers: ["Coger el toro por los cuernos","Tomar toro cuerno","Atrapar bestia","Sostener cuernos"], correct: 0 },
    { prompt: '"To add insult to injury"', answers: ["Para colmo de males","Sumar insulto a herida","Insultar herido","Empeorar herida"], correct: 0 },
    { prompt: '"A wolf in sheep\'s clothing"', answers: ["Un lobo con piel de cordero","Lobo con ropa oveja","Cordero feroz","Oveja lobuna"], correct: 0 },
    { prompt: '"To go down a rabbit hole"', answers: ["Meterse en un laberinto sin fin","Bajar madriguera","Caer hueco conejo","Entrar túnel"], correct: 0 },
    { prompt: '"The pot calling the kettle black"', answers: ["Le dijo la sartén al cazo","Olla llama negro a tetera","Llamar negro pote","Cocina pelea"], correct: 0 },
    { prompt: '"To paint the town red"', answers: ["Irse de juerga","Pintar pueblo rojo","Colorear ciudad","Salir rojizo"], correct: 0 },
  ],
  "C2.3": [
    { prompt: '"A leopard cannot change its spots"', answers: ["Genio y figura hasta la sepultura","Leopardo cambiar manchas","No mudar piel","Manchas eternas"], correct: 0 },
    { prompt: '"To cut the Gordian knot"', answers: ["Cortar por lo sano","Romper nudo gordiano lit.","Atar gordo","Soltar nudo"], correct: 0 },
    { prompt: '"To meet one\'s Waterloo"', answers: ["Encontrar la horma de su zapato","Su Waterloo encontrar","Ser derrotado lit.","Topar muro"], correct: 0 },
    { prompt: '"To gild the lily"', answers: ["No hay quinto malo (sobrar adornos)","Dorar lirio","Pintar flor","Adornar planta"], correct: 0 },
    { prompt: '"A Pyrrhic victory"', answers: ["Una victoria pírrica","Victoria perdida","Triunfo barato","Ganar perdiendo lit."], correct: 0 },
    { prompt: '"To cast pearls before swine"', answers: ["Echar margaritas a los cerdos","Tirar perlas cerdos lit.","Dar joyas chanchos","Regalar puercos"], correct: 0 },
    { prompt: '"Schadenfreude"', answers: ["Regodearse en la desgracia ajena","Alegría falsa","Pena disfrazada","Tristeza ajena"], correct: 0 },
    { prompt: '"To split hairs"', answers: ["Hilar muy fino","Partir cabellos","Cortar pelo lit.","Separar hebra"], correct: 0 },
    { prompt: '"Like a fish out of water"', answers: ["Como pez fuera del agua","Pescado seco","Agua sin pez","Acuático perdido"], correct: 0 },
    { prompt: '"To go the extra mile"', answers: ["Hacer un esfuerzo adicional","Ir milla extra lit.","Caminar más lejos","Recorrer extras"], correct: 0 },
  ],
};

export function pickQuestions(level: Level, n = 5): Question[] {
  const pool = [...QUESTION_BANK[level]];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  // Shuffle answers per question while keeping correct index aligned
  return pool.slice(0, n).map((q) => {
    const indices = q.answers.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const answers = indices.map((i) => q.answers[i]);
    const correct = indices.indexOf(q.correct);
    return { ...q, answers, correct };
  });
}
