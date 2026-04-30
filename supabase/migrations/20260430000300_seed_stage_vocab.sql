-- Stage-level vocabulary seed.
-- This maps the existing sublevel rows into A1..C2 stage rows, then adds
-- categorized supplemental word banks so each stage has a much larger pool.

create index if not exists questions_category_idx on public.questions (category);

create or replace function public.seed_stage_word_bank(
  p_level text,
  p_category text,
  p_spanish_nouns text[],
  p_english_nouns text[],
  p_spanish_modifiers text[],
  p_english_modifiers text[]
) returns void
language plpgsql
as $$
begin
  insert into public.questions (difficulty_level, category, spanish_word, english_word)
  select
    p_level,
    p_category,
    noun_pair.spanish_noun || ' ' || modifier_pair.spanish_modifier,
    modifier_pair.english_modifier || ' ' || noun_pair.english_noun
  from unnest(p_spanish_nouns, p_english_nouns) as noun_pair(spanish_noun, english_noun)
  cross join unnest(p_spanish_modifiers, p_english_modifiers) as modifier_pair(spanish_modifier, english_modifier)
  on conflict (difficulty_level, spanish_word)
  do update set
    english_word = excluded.english_word,
    category = excluded.category;
end;
$$;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select 'A1', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'A1.%'
on conflict (difficulty_level, spanish_word)
do update set
  english_word = excluded.english_word,
  category = excluded.category;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select 'A2', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'A2.%'
on conflict (difficulty_level, spanish_word)
do update set
  english_word = excluded.english_word,
  category = excluded.category;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select 'B1', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'B1.%'
on conflict (difficulty_level, spanish_word)
do update set
  english_word = excluded.english_word,
  category = excluded.category;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select 'B2', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'B2.%'
on conflict (difficulty_level, spanish_word)
do update set
  english_word = excluded.english_word,
  category = excluded.category;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select 'C1', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'C1.%'
on conflict (difficulty_level, spanish_word)
do update set
  english_word = excluded.english_word,
  category = excluded.category;

insert into public.questions (difficulty_level, category, spanish_word, english_word)
select 'C2', coalesce(category, 'general'), spanish_word, english_word
from public.questions
where difficulty_level like 'C2.%'
on conflict (difficulty_level, spanish_word)
do update set
  english_word = excluded.english_word,
  category = excluded.category;

select public.seed_stage_word_bank(
  'A1',
  'greetings',
  array['saludo', 'mensaje', 'abrazo', 'sonrisa', 'bienvenida'],
  array['greeting', 'message', 'hug', 'smile', 'welcome'],
  array['amable', 'alegre', 'breve', 'cálido', 'sencillo', 'amistoso', 'sincero', 'suave', 'rápido', 'cordial'],
  array['kind', 'cheerful', 'brief', 'warm', 'simple', 'friendly', 'sincere', 'gentle', 'quick', 'cordial']
);

select public.seed_stage_word_bank(
  'A1',
  'food',
  array['manzana', 'sopa', 'pan', 'queso', 'fruta'],
  array['apple', 'soup', 'bread', 'cheese', 'fruit'],
  array['fresca', 'dulce', 'salada', 'casera', 'ligera', 'rica', 'caliente', 'fría', 'picante', 'simple'],
  array['fresh', 'sweet', 'savory', 'homemade', 'light', 'tasty', 'hot', 'cold', 'spicy', 'simple']
);

select public.seed_stage_word_bank(
  'A1',
  'home',
  array['casa', 'mesa', 'cama', 'puerta', 'ventana'],
  array['house', 'table', 'bed', 'door', 'window'],
  array['grande', 'pequeña', 'limpia', 'nueva', 'cómoda', 'alta', 'baja', 'abierta', 'cerrada', 'bonita'],
  array['big', 'small', 'clean', 'new', 'comfortable', 'tall', 'low', 'open', 'closed', 'pretty']
);

select public.seed_stage_word_bank(
  'A1',
  'family',
  array['madre', 'padre', 'hermano', 'hermana', 'abuelo'],
  array['mother', 'father', 'brother', 'sister', 'grandfather'],
  array['cariñosa', 'paciente', 'fuerte', 'amable', 'joven', 'mayor', 'cercana', 'feliz', 'tranquila', 'unida'],
  array['loving', 'patient', 'strong', 'kind', 'young', 'older', 'close', 'happy', 'calm', 'united']
);

select public.seed_stage_word_bank(
  'A2',
  'travel',
  array['viaje', 'tren', 'bus', 'aeropuerto', 'hotel'],
  array['trip', 'train', 'bus', 'airport', 'hotel'],
  array['corto', 'largo', 'cómodo', 'barato', 'rápido', 'seguro', 'tranquilo', 'directo', 'turístico', 'local'],
  array['short', 'long', 'comfortable', 'cheap', 'fast', 'safe', 'calm', 'direct', 'touristy', 'local']
);

select public.seed_stage_word_bank(
  'A2',
  'weather',
  array['lluvia', 'sol', 'viento', 'nieve', 'nube'],
  array['rain', 'sun', 'wind', 'snow', 'cloud'],
  array['fuerte', 'suave', 'frío', 'cálido', 'seco', 'húmedo', 'nublado', 'despejado', 'cambiante', 'extremo'],
  array['strong', 'gentle', 'cold', 'warm', 'dry', 'humid', 'cloudy', 'clear', 'changing', 'extreme']
);

select public.seed_stage_word_bank(
  'A2',
  'routine',
  array['desayuno', 'almuerzo', 'cena', 'siesta', 'descanso'],
  array['breakfast', 'lunch', 'dinner', 'nap', 'rest'],
  array['temprano', 'tarde', 'rápido', 'ligero', 'saludable', 'tranquilo', 'diario', 'nocturno', 'largo', 'corto'],
  array['early', 'late', 'quick', 'light', 'healthy', 'calm', 'daily', 'nightly', 'long', 'short']
);

select public.seed_stage_word_bank(
  'A2',
  'school',
  array['clase', 'examen', 'tarea', 'libro', 'mochila'],
  array['class', 'exam', 'homework', 'book', 'backpack'],
  array['fácil', 'difícil', 'importante', 'nuevo', 'viejo', 'largo', 'corto', 'útil', 'rápido', 'serio'],
  array['easy', 'difficult', 'important', 'new', 'old', 'long', 'short', 'useful', 'quick', 'serious']
);

select public.seed_stage_word_bank(
  'B1',
  'work',
  array['trabajo', 'oficina', 'reunión', 'proyecto', 'horario'],
  array['work', 'office', 'meeting', 'project', 'schedule'],
  array['ocupado', 'flexible', 'remoto', 'creativo', 'urgente', 'serio', 'colaborativo', 'técnico', 'moderno', 'complejo'],
  array['busy', 'flexible', 'remote', 'creative', 'urgent', 'serious', 'collaborative', 'technical', 'modern', 'complex']
);

select public.seed_stage_word_bank(
  'B1',
  'health',
  array['salud', 'médico', 'visita', 'vacuna', 'descanso'],
  array['health', 'doctor', 'visit', 'vaccine', 'rest'],
  array['mental', 'física', 'preventiva', 'urgente', 'regular', 'necesaria', 'estable', 'delicada', 'activa', 'tranquila'],
  array['mental', 'physical', 'preventive', 'urgent', 'regular', 'necessary', 'stable', 'delicate', 'active', 'calm']
);

select public.seed_stage_word_bank(
  'B1',
  'feelings',
  array['alegría', 'miedo', 'duda', 'orgullo', 'calma'],
  array['joy', 'fear', 'doubt', 'pride', 'calm'],
  array['profunda', 'sincera', 'repentina', 'creciente', 'intensa', 'leve', 'extraña', 'positiva', 'negativa', 'diaria'],
  array['deep', 'sincere', 'sudden', 'growing', 'intense', 'slight', 'strange', 'positive', 'negative', 'daily']
);

select public.seed_stage_word_bank(
  'B1',
  'technology',
  array['móvil', 'pantalla', 'mensaje', 'red', 'aplicación'],
  array['phone', 'screen', 'message', 'network', 'app'],
  array['digital', 'rápido', 'seguro', 'inteligente', 'nuevo', 'útil', 'interactivo', 'moderno', 'práctico', 'silencioso'],
  array['digital', 'fast', 'secure', 'smart', 'new', 'useful', 'interactive', 'modern', 'practical', 'silent']
);

select public.seed_stage_word_bank(
  'B2',
  'society',
  array['sociedad', 'cultura', 'comunidad', 'gobierno', 'debate'],
  array['society', 'culture', 'community', 'government', 'debate'],
  array['local', 'global', 'moderna', 'diversa', 'compleja', 'justa', 'sensible', 'política', 'social', 'amplia'],
  array['local', 'global', 'modern', 'diverse', 'complex', 'fair', 'sensitive', 'political', 'social', 'broad']
);

select public.seed_stage_word_bank(
  'B2',
  'communication',
  array['diálogo', 'argumento', 'discurso', 'respuesta', 'conversación'],
  array['dialogue', 'argument', 'speech', 'answer', 'conversation'],
  array['claro', 'convincente', 'breve', 'formal', 'informal', 'directo', 'amable', 'preciso', 'fluido', 'persuasivo'],
  array['clear', 'convincing', 'brief', 'formal', 'informal', 'direct', 'kind', 'precise', 'fluent', 'persuasive']
);

select public.seed_stage_word_bank(
  'B2',
  'environment',
  array['clima', 'energía', 'bosque', 'río', 'reciclaje'],
  array['climate', 'energy', 'forest', 'river', 'recycling'],
  array['sostenible', 'limpia', 'renovable', 'natural', 'protegido', 'frágil', 'verde', 'seca', 'urbana', 'rural'],
  array['sustainable', 'clean', 'renewable', 'natural', 'protected', 'fragile', 'green', 'dry', 'urban', 'rural']
);

select public.seed_stage_word_bank(
  'B2',
  'finance',
  array['dinero', 'ahorro', 'cuenta', 'precio', 'inversión'],
  array['money', 'savings', 'account', 'price', 'investment'],
  array['estable', 'alto', 'bajo', 'razonable', 'seguro', 'variable', 'mensual', 'anual', 'privado', 'público'],
  array['stable', 'high', 'low', 'reasonable', 'safe', 'variable', 'monthly', 'yearly', 'private', 'public']
);

select public.seed_stage_word_bank(
  'C1',
  'politics',
  array['política', 'elección', 'ley', 'nación', 'poder'],
  array['politics', 'election', 'law', 'nation', 'power'],
  array['nacional', 'internacional', 'democrática', 'legítima', 'estratégica', 'pública', 'privada', 'compleja', 'histórica', 'simbólica'],
  array['national', 'international', 'democratic', 'legitimate', 'strategic', 'public', 'private', 'complex', 'historical', 'symbolic']
);

select public.seed_stage_word_bank(
  'C1',
  'literature',
  array['novela', 'poema', 'autor', 'metáfora', 'narrador'],
  array['novel', 'poem', 'author', 'metaphor', 'narrator'],
  array['clásico', 'moderno', 'lírico', 'simbólico', 'profundo', 'crítico', 'breve', 'extenso', 'original', 'ambiguo'],
  array['classic', 'modern', 'lyrical', 'symbolic', 'deep', 'critical', 'brief', 'extensive', 'original', 'ambiguous']
);

select public.seed_stage_word_bank(
  'C1',
  'science',
  array['experimento', 'hipótesis', 'teoría', 'evidencia', 'observación'],
  array['experiment', 'hypothesis', 'theory', 'evidence', 'observation'],
  array['científica', 'sólida', 'provisional', 'verificable', 'empírica', 'rigurosa', 'precisa', 'abstracta', 'cuantitativa', 'cualitativa'],
  array['scientific', 'solid', 'provisional', 'verifiable', 'empirical', 'rigorous', 'precise', 'abstract', 'quantitative', 'qualitative']
);

select public.seed_stage_word_bank(
  'C1',
  'business',
  array['empresa', 'cliente', 'estrategia', 'mercado', 'negociación'],
  array['company', 'client', 'strategy', 'market', 'negotiation'],
  array['rentable', 'global', 'competitiva', 'flexible', 'innovadora', 'eficiente', 'sólida', 'sostenible', 'digital', 'dinámica'],
  array['profitable', 'global', 'competitive', 'flexible', 'innovative', 'efficient', 'solid', 'sustainable', 'digital', 'dynamic']
);

select public.seed_stage_word_bank(
  'C2',
  'idioms',
  array['expresión', 'giro', 'matiz', 'ironía', 'refrán'],
  array['expression', 'turn', 'nuance', 'irony', 'proverb'],
  array['sutil', 'idiomática', 'brillante', 'corrosiva', 'popular', 'clásica', 'oculta', 'cultural', 'histórica', 'memorable'],
  array['subtle', 'idiomatic', 'brilliant', 'corrosive', 'popular', 'classic', 'hidden', 'cultural', 'historical', 'memorable']
);

select public.seed_stage_word_bank(
  'C2',
  'philosophy',
  array['concepto', 'ser', 'ética', 'conciencia', 'verdad'],
  array['concept', 'being', 'ethics', 'conscience', 'truth'],
  array['abstracto', 'fundamental', 'moral', 'existencial', 'universal', 'profundo', 'complejo', 'cuestionado', 'radical', 'discutido'],
  array['abstract', 'fundamental', 'moral', 'existential', 'universal', 'deep', 'complex', 'questioned', 'radical', 'debated']
);

select public.seed_stage_word_bank(
  'C2',
  'media',
  array['opinión', 'titular', 'noticia', 'audiencia', 'reportaje'],
  array['opinion', 'headline', 'news', 'audience', 'report'],
  array['pública', 'viral', 'inmediata', 'objetiva', 'subjetiva', 'crítica', 'digital', 'impresa', 'global', 'local'],
  array['public', 'viral', 'immediate', 'objective', 'subjective', 'critical', 'digital', 'print', 'global', 'local']
);

select public.seed_stage_word_bank(
  'C2',
  'law',
  array['contrato', 'juicio', 'norma', 'derecho', 'testimonio'],
  array['contract', 'trial', 'rule', 'right', 'testimony'],
  array['legal', 'vinculante', 'justo', 'estricto', 'formal', 'civil', 'penal', 'constitucional', 'probado', 'discutido'],
  array['legal', 'binding', 'fair', 'strict', 'formal', 'civil', 'criminal', 'constitutional', 'proven', 'debated']
);
