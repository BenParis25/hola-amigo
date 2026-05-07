-- Stage-level vocabulary seed.
-- This maps the existing sublevel rows into A1..C2 stage rows, then adds
-- categorized supplemental word banks so each stage has a much larger pool.

create index if not exists questions_category_idx on public.questions (category);

create or replace function public.seed_stage_word_bank(
  p_level text,
  p_category text,
  p_spanish_nouns text[],
  p_english_nouns text[],
  p_german_nouns text[],
  p_spanish_modifiers text[],
  p_english_modifiers text[],
  p_german_modifiers text[]
) returns void
language plpgsql
as $$
begin
  insert into public.questions (difficulty_level, category, spanish_word, english_word, german_word)
  select
    p_level,
    p_category,
    noun_pair.spanish_noun || ' ' || modifier_pair.spanish_modifier,
    modifier_pair.english_modifier || ' ' || noun_pair.english_noun,
    modifier_pair.german_modifier || ' ' || noun_pair.german_noun
  from unnest(p_spanish_nouns, p_english_nouns, p_german_nouns) as noun_pair(spanish_noun, english_noun, german_noun)
  cross join unnest(p_spanish_modifiers, p_english_modifiers, p_german_modifiers) as modifier_pair(spanish_modifier, english_modifier, german_modifier)
  on conflict (difficulty_level, spanish_word)
  do update set
    english_word = excluded.english_word,
    german_word = excluded.german_word,
    category = excluded.category;
end;
$$;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select distinct 'A1', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'A1.%'
on conflict (difficulty_level, spanish_word)
do nothing;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select distinct 'A2', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'A2.%'
on conflict (difficulty_level, spanish_word)
do nothing;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select distinct 'B1', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'B1.%'
on conflict (difficulty_level, spanish_word)
do nothing;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select distinct 'B2', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'B2.%'
on conflict (difficulty_level, spanish_word)
do nothing;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select distinct 'C1', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'C1.%'
on conflict (difficulty_level, spanish_word)
do nothing;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select distinct 'C2', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'C2.%'
on conflict (difficulty_level, spanish_word)
do nothing;

select public.seed_stage_word_bank(
  'A1',
  'greetings',
  array['saludo', 'mensaje', 'abrazo', 'sonrisa', 'bienvenida'],
  array['greeting', 'message', 'hug', 'smile', 'welcome'],
  array['Gruß', 'Nachricht', 'Umarmung', 'Lächeln', 'Willkommen'],
  array['amable', 'alegre', 'breve', 'cálido', 'sencillo', 'amistoso', 'sincero', 'suave', 'rápido', 'cordial'],
  array['kind', 'cheerful', 'brief', 'warm', 'simple', 'friendly', 'sincere', 'gentle', 'quick', 'cordial'],
  array['freundlich', 'fröhlich', 'kurz', 'warm', 'einfach', 'freundlich', 'aufrichtig', 'sanft', 'schnell', 'herzlich']
);

select public.seed_stage_word_bank(
  'A1',
  'food',
  array['manzana', 'sopa', 'pan', 'queso', 'fruta'],
  array['apple', 'soup', 'bread', 'cheese', 'fruit'],
  array['frisch', 'süß', 'salzig', 'hausgemacht', 'leicht', 'lecker', 'heiß', 'kalt', 'scharf', 'einfach'],
  array['fresca', 'dulce', 'salada', 'casera', 'ligera', 'rica', 'caliente', 'fría', 'picante', 'simple'],
  array['fresh', 'sweet', 'savory', 'homemade', 'light', 'tasty', 'hot', 'cold', 'spicy', 'simple'],
  array['frisch', 'süß', 'salzig', 'hausgemacht', 'leicht', 'lecker', 'heiß', 'kalt', 'scharf', 'einfach']
);

select public.seed_stage_word_bank(
  'A1',
  'home',
  array['casa', 'mesa', 'cama', 'puerta', 'ventana'],
  array['house', 'table', 'bed', 'door', 'window'],
  array['groß', 'klein', 'sauber', 'neu', 'bequem', 'hoch', 'niedrig', 'offen', 'geschlossen', 'schön'],
  array['grande', 'pequeña', 'limpia', 'nueva', 'cómoda', 'alta', 'baja', 'abierta', 'cerrada', 'bonita'],
  array['big', 'small', 'clean', 'new', 'comfortable', 'tall', 'low', 'open', 'closed', 'pretty'],
  array['groß', 'klein', 'sauber', 'neu', 'bequem', 'hoch', 'niedrig', 'offen', 'geschlossen', 'schön']
);

select public.seed_stage_word_bank(
  'A1',
  'family',
  array['madre', 'padre', 'hermano', 'hermana', 'abuelo'],
  array['mother', 'father', 'brother', 'sister', 'grandfather'],
  array['liebevoll', 'geduldig', 'stark', 'freundlich', 'jung', 'älter', 'nah', 'glücklich', 'ruhig', 'vereint'],
  array['cariñosa', 'paciente', 'fuerte', 'amable', 'joven', 'mayor', 'cercana', 'feliz', 'tranquila', 'unida'],
  array['loving', 'patient', 'strong', 'kind', 'young', 'older', 'close', 'happy', 'calm', 'united'],
  array['liebevoll', 'geduldig', 'stark', 'freundlich', 'jung', 'älter', 'nah', 'glücklich', 'ruhig', 'vereint']
);

select public.seed_stage_word_bank(
  'A2',
  'travel',
  array['viaje', 'tren', 'bus', 'aeropuerto', 'hotel'],
  array['trip', 'train', 'bus', 'airport', 'hotel'],
  array['kurz', 'lang', 'bequem', 'billig', 'schnell', 'sicher', 'ruhig', 'direkt', 'touristisch', 'lokal'],
  array['corto', 'largo', 'cómodo', 'barato', 'rápido', 'seguro', 'tranquilo', 'directo', 'turístico', 'local'],
  array['short', 'long', 'comfortable', 'cheap', 'fast', 'safe', 'calm', 'direct', 'touristy', 'local'],
  array['kurz', 'lang', 'bequem', 'billig', 'schnell', 'sicher', 'ruhig', 'direkt', 'touristisch', 'lokal']
);

select public.seed_stage_word_bank(
  'A2',
  'weather',
  array['lluvia', 'sol', 'viento', 'nieve', 'nube'],
  array['rain', 'sun', 'wind', 'snow', 'cloud'],
  array['stark', 'sanft', 'kalt', 'warm', 'trocken', 'feucht', 'bewölkt', 'klar', 'wechselhaft', 'extrem'],
  array['fuerte', 'suave', 'frío', 'cálido', 'seco', 'húmedo', 'nublado', 'despejado', 'cambiante', 'extremo'],
  array['strong', 'gentle', 'cold', 'warm', 'dry', 'humid', 'cloudy', 'clear', 'changing', 'extreme'],
  array['stark', 'sanft', 'kalt', 'warm', 'trocken', 'feucht', 'bewölkt', 'klar', 'wechselhaft', 'extrem']
);

select public.seed_stage_word_bank(
  'A2',
  'routine',
  array['desayuno', 'almuerzo', 'cena', 'siesta', 'descanso'],
  array['breakfast', 'lunch', 'dinner', 'nap', 'rest'],
  array['früh', 'spät', 'schnell', 'leicht', 'gesund', 'ruhig', 'täglich', 'nächtlich', 'lang', 'kurz'],
  array['temprano', 'tarde', 'rápido', 'ligero', 'saludable', 'tranquilo', 'diario', 'nocturno', 'largo', 'corto'],
  array['early', 'late', 'quick', 'light', 'healthy', 'calm', 'daily', 'nightly', 'long', 'short'],
  array['früh', 'spät', 'schnell', 'leicht', 'gesund', 'ruhig', 'täglich', 'nächtlich', 'lang', 'kurz']
);

select public.seed_stage_word_bank(
  'A2',
  'school',
  array['clase', 'examen', 'tarea', 'libro', 'mochila'],
  array['class', 'exam', 'homework', 'book', 'backpack'],
  array['einfach', 'schwierig', 'wichtig', 'neu', 'alt', 'lang', 'kurz', 'nützlich', 'schnell', 'ernst'],
  array['fácil', 'difícil', 'importante', 'nuevo', 'viejo', 'largo', 'corto', 'útil', 'rápido', 'serio'],
  array['easy', 'difficult', 'important', 'new', 'old', 'long', 'short', 'useful', 'quick', 'serious'],
  array['einfach', 'schwierig', 'wichtig', 'neu', 'alt', 'lang', 'kurz', 'nützlich', 'schnell', 'ernst']
);

select public.seed_stage_word_bank(
  'B1',
  'work',
  array['trabajo', 'oficina', 'reunión', 'proyecto', 'horario'],
  array['work', 'office', 'meeting', 'project', 'schedule'],
  array['beschäftigt', 'flexibel', 'fern', 'kreativ', 'dringend', 'ernst', 'kollaborativ', 'technisch', 'modern', 'komplex'],
  array['ocupado', 'flexible', 'remoto', 'creativo', 'urgente', 'serio', 'colaborativo', 'técnico', 'moderno', 'complejo'],
  array['busy', 'flexible', 'remote', 'creative', 'urgent', 'serious', 'collaborative', 'technical', 'modern', 'complex'],
  array['beschäftigt', 'flexibel', 'fern', 'kreativ', 'dringend', 'ernst', 'kollaborativ', 'technisch', 'modern', 'komplex']
);

select public.seed_stage_word_bank(
  'B1',
  'health',
  array['salud', 'médico', 'visita', 'vacuna', 'descanso'],
  array['health', 'doctor', 'visit', 'vaccine', 'rest'],
  array['geistig', 'körperlich', 'präventiv', 'dringend', 'regelmäßig', 'notwendig', 'stabil', 'delikat', 'aktiv', 'ruhig'],
  array['mental', 'física', 'preventiva', 'urgente', 'regular', 'necesaria', 'estable', 'delicada', 'activa', 'tranquila'],
  array['mental', 'physical', 'preventive', 'urgent', 'regular', 'necessary', 'stable', 'delicate', 'active', 'calm'],
  array['geistig', 'körperlich', 'präventiv', 'dringend', 'regelmäßig', 'notwendig', 'stabil', 'delikat', 'aktiv', 'ruhig']
);

select public.seed_stage_word_bank(
  'B1',
  'feelings',
  array['alegría', 'miedo', 'duda', 'orgullo', 'calma'],
  array['joy', 'fear', 'doubt', 'pride', 'calm'],
  array['tief', 'aufrichtig', 'plötzlich', 'wachsend', 'intensiv', 'leicht', 'seltsam', 'positiv', 'negativ', 'täglich'],
  array['profunda', 'sincera', 'repentina', 'creciente', 'intensa', 'leve', 'extraña', 'positiva', 'negativa', 'diaria'],
  array['deep', 'sincere', 'sudden', 'growing', 'intense', 'slight', 'strange', 'positive', 'negative', 'daily'],
  array['tief', 'aufrichtig', 'plötzlich', 'wachsend', 'intensiv', 'leicht', 'seltsam', 'positiv', 'negativ', 'täglich']
);

select public.seed_stage_word_bank(
  'B1',
  'technology',
  array['móvil', 'pantalla', 'mensaje', 'red', 'aplicación'],
  array['phone', 'screen', 'message', 'network', 'app'],
  array['digital', 'schnell', 'sicher', 'intelligent', 'neu', 'nützlich', 'interaktiv', 'modern', 'praktisch', 'leise'],
  array['digital', 'rápido', 'seguro', 'inteligente', 'nuevo', 'útil', 'interactivo', 'moderno', 'práctico', 'silencioso'],
  array['digital', 'fast', 'secure', 'smart', 'new', 'useful', 'interactive', 'modern', 'practical', 'silent'],
  array['digital', 'schnell', 'sicher', 'intelligent', 'neu', 'nützlich', 'interaktiv', 'modern', 'praktisch', 'leise']
);

select public.seed_stage_word_bank(
  'B2',
  'society',
  array['sociedad', 'cultura', 'comunidad', 'gobierno', 'debate'],
  array['society', 'culture', 'community', 'government', 'debate'],
  array['lokal', 'global', 'modern', 'vielfältig', 'komplex', 'gerecht', 'sensibel', 'politisch', 'sozial', 'breit'],
  array['local', 'global', 'moderna', 'diversa', 'compleja', 'justa', 'sensible', 'política', 'social', 'amplia'],
  array['local', 'global', 'modern', 'diverse', 'complex', 'fair', 'sensitive', 'political', 'social', 'broad'],
  array['lokal', 'global', 'modern', 'vielfältig', 'komplex', 'gerecht', 'sensibel', 'politisch', 'sozial', 'breit']
);

select public.seed_stage_word_bank(
  'B2',
  'communication',
  array['diálogo', 'argumento', 'discurso', 'respuesta', 'conversación'],
  array['dialogue', 'argument', 'speech', 'answer', 'conversation'],
  array['klar', 'überzeugend', 'kurz', 'formell', 'informell', 'direkt', 'freundlich', 'präzise', 'fließend', 'überzeugend'],
  array['claro', 'convincente', 'breve', 'formal', 'informal', 'directo', 'amable', 'preciso', 'fluido', 'persuasivo'],
  array['clear', 'convincing', 'brief', 'formal', 'informal', 'direct', 'kind', 'precise', 'fluent', 'persuasive'],
  array['klar', 'überzeugend', 'kurz', 'formell', 'informell', 'direkt', 'freundlich', 'präzise', 'fließend', 'überzeugend']
);

select public.seed_stage_word_bank(
  'B2',
  'environment',
  array['clima', 'energía', 'bosque', 'río', 'reciclaje'],
  array['climate', 'energy', 'forest', 'river', 'recycling'],
  array['nachhaltig', 'sauber', 'erneuerbar', 'natürlich', 'geschützt', 'zerbrechlich', 'grün', 'trocken', 'städtisch', 'ländlich'],
  array['sostenible', 'limpia', 'renovable', 'natural', 'protegido', 'frágil', 'verde', 'seca', 'urbana', 'rural'],
  array['sustainable', 'clean', 'renewable', 'natural', 'protected', 'fragile', 'green', 'dry', 'urban', 'rural'],
  array['nachhaltig', 'sauber', 'erneuerbar', 'natürlich', 'geschützt', 'zerbrechlich', 'grün', 'trocken', 'städtisch', 'ländlich']
);

select public.seed_stage_word_bank(
  'B2',
  'finance',
  array['dinero', 'ahorro', 'cuenta', 'precio', 'inversión'],
  array['money', 'savings', 'account', 'price', 'investment'],
  array['stabil', 'hoch', 'niedrig', 'angemessen', 'sicher', 'variabel', 'monatlich', 'jährlich', 'privat', 'öffentlich'],
  array['estable', 'alto', 'bajo', 'razonable', 'seguro', 'variable', 'mensual', 'anual', 'privado', 'público'],
  array['stable', 'high', 'low', 'reasonable', 'safe', 'variable', 'monthly', 'yearly', 'private', 'public'],
  array['stabil', 'hoch', 'niedrig', 'angemessen', 'sicher', 'variabel', 'monatlich', 'jährlich', 'privat', 'öffentlich']
);

select public.seed_stage_word_bank(
  'C1',
  'politics',
  array['política', 'elección', 'ley', 'nación', 'poder'],
  array['politics', 'election', 'law', 'nation', 'power'],
  array['national', 'international', 'demokratisch', 'legitim', 'strategisch', 'öffentlich', 'privat', 'komplex', 'historisch', 'symbolisch'],
  array['nacional', 'internacional', 'democrática', 'legítima', 'estratégica', 'pública', 'privada', 'compleja', 'histórica', 'simbólica'],
  array['national', 'international', 'democratic', 'legitimate', 'strategic', 'public', 'private', 'complex', 'historical', 'symbolic'],
  array['national', 'international', 'demokratisch', 'legitim', 'strategisch', 'öffentlich', 'privat', 'komplex', 'historisch', 'symbolisch']
);

select public.seed_stage_word_bank(
  'C1',
  'literature',
  array['novela', 'poema', 'autor', 'metáfora', 'narrador'],
  array['novel', 'poem', 'author', 'metaphor', 'narrator'],
  array['klassisch', 'modern', 'lyrisch', 'symbolisch', 'tiefgründig', 'kritisch', 'kurz', 'umfangreich', 'originell', 'zweideutig'],
  array['clásico', 'moderno', 'lírico', 'simbólico', 'profundo', 'crítico', 'breve', 'extenso', 'original', 'ambiguo'],
  array['classic', 'modern', 'lyrical', 'symbolic', 'deep', 'critical', 'brief', 'extensive', 'original', 'ambiguous'],
  array['klassisch', 'modern', 'lyrisch', 'symbolisch', 'tiefgründig', 'kritisch', 'kurz', 'umfangreich', 'originell', 'zweideutig']
);

select public.seed_stage_word_bank(
  'C1',
  'science',
  array['experimento', 'hipótesis', 'teoría', 'evidencia', 'observación'],
  array['experiment', 'hypothesis', 'theory', 'evidence', 'observation'],
  array['wissenschaftlich', 'solide', 'provisorisch', 'überprüfbar', 'empirisch', 'rigoros', 'präzise', 'abstrakt', 'quantitativ', 'qualitativ'],
  array['científica', 'sólida', 'provisional', 'verificable', 'empírica', 'rigurosa', 'precisa', 'abstracta', 'cuantitativa', 'cualitativa'],
  array['scientific', 'solid', 'provisional', 'verifiable', 'empirical', 'rigorous', 'precise', 'abstract', 'quantitative', 'qualitative'],
  array['wissenschaftlich', 'solide', 'provisorisch', 'überprüfbar', 'empirisch', 'rigoros', 'präzise', 'abstrakt', 'quantitativ', 'qualitativ']
);

select public.seed_stage_word_bank(
  'C1',
  'business',
  array['empresa', 'cliente', 'estrategia', 'mercado', 'negociación'],
  array['company', 'client', 'strategy', 'market', 'negotiation'],
  array['rentabel', 'global', 'wettbewerbsfähig', 'flexibel', 'innovativ', 'effizient', 'solide', 'nachhaltig', 'digital', 'dynamisch'],
  array['rentable', 'global', 'competitiva', 'flexible', 'innovadora', 'eficiente', 'sólida', 'sostenible', 'digital', 'dinámica'],
  array['profitable', 'global', 'competitive', 'flexible', 'innovative', 'efficient', 'solid', 'sustainable', 'digital', 'dynamic'],
  array['rentabel', 'global', 'wettbewerbsfähig', 'flexibel', 'innovativ', 'effizient', 'solide', 'nachhaltig', 'digital', 'dynamisch']
);

select public.seed_stage_word_bank(
  'C2',
  'idioms',
  array['expresión', 'giro', 'matiz', 'ironía', 'refrán'],
  array['expression', 'turn', 'nuance', 'irony', 'proverb'],
  array['subtil', 'idiomatisch', 'brillant', 'korrosiv', 'populär', 'klassisch', 'versteckt', 'kulturell', 'historisch', 'denkwürdig'],
  array['sutil', 'idiomática', 'brillante', 'corrosiva', 'popular', 'clásica', 'oculta', 'cultural', 'histórica', 'memorable'],
  array['subtle', 'idiomatic', 'brilliant', 'corrosive', 'popular', 'classic', 'hidden', 'cultural', 'historical', 'memorable'],
  array['subtil', 'idiomatisch', 'brillant', 'korrosiv', 'populär', 'klassisch', 'versteckt', 'kulturell', 'historisch', 'denkwürdig']
);

select public.seed_stage_word_bank(
  'C2',
  'philosophy',
  array['concepto', 'ser', 'ética', 'conciencia', 'verdad'],
  array['concept', 'being', 'ethics', 'conscience', 'truth'],
  array['abstrakt', 'fundamental', 'moralisch', 'existentiell', 'universell', 'tiefgründig', 'komplex', 'hinterfragt', 'radikal', 'diskutiert'],
  array['abstracto', 'fundamental', 'moral', 'existencial', 'universal', 'profundo', 'complejo', 'cuestionado', 'radical', 'discutido'],
  array['abstract', 'fundamental', 'moral', 'existential', 'universal', 'deep', 'complex', 'questioned', 'radical', 'debated'],
  array['abstrakt', 'fundamental', 'moralisch', 'existentiell', 'universell', 'tiefgründig', 'komplex', 'hinterfragt', 'radikal', 'diskutiert']
);

select public.seed_stage_word_bank(
  'C2',
  'media',
  array['opinión', 'titular', 'noticia', 'audiencia', 'reportaje'],
  array['opinion', 'headline', 'news', 'audience', 'report'],
  array['öffentlich', 'viral', 'unmittelbar', 'objektiv', 'subjektiv', 'kritisch', 'digital', 'gedruckt', 'global', 'lokal'],
  array['pública', 'viral', 'inmediata', 'objetiva', 'subjetiva', 'crítica', 'digital', 'impresa', 'global', 'local'],
  array['public', 'viral', 'immediate', 'objective', 'subjective', 'critical', 'digital', 'print', 'global', 'local'],
  array['öffentlich', 'viral', 'unmittelbar', 'objektiv', 'subjektiv', 'kritisch', 'digital', 'gedruckt', 'global', 'lokal']
);

select public.seed_stage_word_bank(
  'C2',
  'law',
  array['contrato', 'juicio', 'norma', 'derecho', 'testimonio'],
  array['contract', 'trial', 'rule', 'right', 'testimony'],
  array['rechtlich', 'bindend', 'gerecht', 'streng', 'formell', 'zivil', 'strafrechtlich', 'verfassungsrechtlich', 'bewiesen', 'diskutiert'],
  array['contrato', 'juicio', 'norma', 'derecho', 'testimonio'],
  array['contract', 'trial', 'rule', 'right', 'testimony'],
  array['legal', 'binding', 'fair', 'strict', 'formal', 'civil', 'criminal', 'constitutional', 'proven', 'debated'],
  array['rechtlich', 'bindend', 'gerecht', 'streng', 'formell', 'zivil', 'strafrechtlich', 'verfassungsrechtlich', 'bewiesen', 'diskutiert']
);
