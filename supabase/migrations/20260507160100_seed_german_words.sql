-- Seed German translations for existing vocabulary
-- This updates the german_word column with German translations

update public.questions set german_word = 'Hallo' where spanish_word = 'Hola' and difficulty_level like 'A1%';
update public.questions set german_word = 'Auf Wiedersehen' where spanish_word = 'Adiós' and difficulty_level like 'A1%';
update public.questions set german_word = 'Guten Morgen' where spanish_word = 'Buenos días' and difficulty_level like 'A1%';
update public.questions set german_word = 'Guten Nachmittag' where spanish_word = 'Buenas tardes' and difficulty_level like 'A1%';
update public.questions set german_word = 'Guten Abend' where spanish_word = 'Buenas noches' and difficulty_level like 'A1%';
update public.questions set german_word = 'Bis später' where spanish_word = 'Hasta luego' and difficulty_level like 'A1%';
update public.questions set german_word = 'Bitte' where spanish_word = 'Por favor' and difficulty_level like 'A1%';
update public.questions set german_word = 'Danke' where spanish_word = 'Gracias' and difficulty_level like 'A1%';
update public.questions set german_word = 'Gerne' where spanish_word = 'De nada' and difficulty_level like 'A1%';
update public.questions set german_word = 'Entschuldigung' where spanish_word = 'Perdón' and difficulty_level like 'A1%';
update public.questions set german_word = 'Es tut mir leid' where spanish_word = 'Lo siento' and difficulty_level like 'A1%';
update public.questions set german_word = 'Freut mich' where spanish_word = 'Mucho gusto' and difficulty_level like 'A1%';
update public.questions set german_word = 'Bis morgen' where spanish_word = 'Hasta mañana' and difficulty_level like 'A1%';
update public.questions set german_word = 'Ja' where spanish_word = 'Sí' and difficulty_level like 'A1%';
update public.questions set german_word = 'Nein' where spanish_word = 'No' and difficulty_level like 'A1%';
update public.questions set german_word = 'Willkommen' where spanish_word = 'Bienvenido' and difficulty_level like 'A1%';
update public.questions set german_word = 'Natürlich' where spanish_word = 'Por supuesto' and difficulty_level like 'A1%';
update public.questions set german_word = 'Angenehm' where spanish_word = 'Encantado' and difficulty_level like 'A1%';
update public.questions set german_word = 'Wie geht es dir?' where spanish_word = '¿Cómo estás?' and difficulty_level like 'A1%';
update public.questions set german_word = 'Mir geht es gut' where spanish_word = 'Estoy bien' and difficulty_level like 'A1%';

-- Numbers
update public.questions set german_word = 'Eins' where spanish_word = 'Uno' and difficulty_level like 'A1%';
update public.questions set german_word = 'Zwei' where spanish_word = 'Dos' and difficulty_level like 'A1%';
update public.questions set german_word = 'Drei' where spanish_word = 'Tres' and difficulty_level like 'A1%';
update public.questions set german_word = 'Vier' where spanish_word = 'Cuatro' and difficulty_level like 'A1%';
update public.questions set german_word = 'Fünf' where spanish_word = 'Cinco' and difficulty_level like 'A1%';
update public.questions set german_word = 'Sechs' where spanish_word = 'Seis' and difficulty_level like 'A1%';
update public.questions set german_word = 'Sieben' where spanish_word = 'Siete' and difficulty_level like 'A1%';
update public.questions set german_word = 'Acht' where spanish_word = 'Ocho' and difficulty_level like 'A1%';
update public.questions set german_word = 'Neun' where spanish_word = 'Nueve' and difficulty_level like 'A1%';
update public.questions set german_word = 'Zehn' where spanish_word = 'Diez' and difficulty_level like 'A1%';
update public.questions set german_word = 'Elf' where spanish_word = 'Once' and difficulty_level like 'A1%';
update public.questions set german_word = 'Zwölf' where spanish_word = 'Doce' and difficulty_level like 'A1%';
update public.questions set german_word = 'Fünfzehn' where spanish_word = 'Quince' and difficulty_level like 'A1%';
update public.questions set german_word = 'Zwanzig' where spanish_word = 'Veinte' and difficulty_level like 'A1%';
update public.questions set german_word = 'Dreißig' where spanish_word = 'Treinta' and difficulty_level like 'A1%';
update public.questions set german_word = 'Hundert' where spanish_word = 'Cien' and difficulty_level like 'A1%';
update public.questions set german_word = 'Null' where spanish_word = 'Cero' and difficulty_level like 'A1%';
update public.questions set german_word = 'Erste' where spanish_word = 'Primero' and difficulty_level like 'A1%';
update public.questions set german_word = 'Zweite' where spanish_word = 'Segundo' and difficulty_level like 'A1%';
update public.questions set german_word = 'Dritte' where spanish_word = 'Tercero' and difficulty_level like 'A1%';

-- Colors
update public.questions set german_word = 'Rot' where spanish_word = 'Rojo' and difficulty_level like 'A1%';
update public.questions set german_word = 'Blau' where spanish_word = 'Azul' and difficulty_level like 'A1%';
update public.questions set german_word = 'Grün' where spanish_word = 'Verde' and difficulty_level like 'A1%';
update public.questions set german_word = 'Gelb' where spanish_word = 'Amarillo' and difficulty_level like 'A1%';
update public.questions set german_word = 'Weiß' where spanish_word = 'Blanco' and difficulty_level like 'A1%';
update public.questions set german_word = 'Schwarz' where spanish_word = 'Negro' and difficulty_level like 'A1%';
update public.questions set german_word = 'Rosa' where spanish_word = 'Rosa' and difficulty_level like 'A1%';
update public.questions set german_word = 'Orange' where spanish_word = 'Naranja' and difficulty_level like 'A1%';
update public.questions set german_word = 'Lila' where spanish_word = 'Morado' and difficulty_level like 'A1%';
update public.questions set german_word = 'Braun' where spanish_word = 'Marrón' and difficulty_level like 'A1%';
update public.questions set german_word = 'Grau' where spanish_word = 'Gris' and difficulty_level like 'A1%';
update public.questions set german_word = 'Golden' where spanish_word = 'Dorado' and difficulty_level like 'A1%';
update public.questions set german_word = 'Silbern' where spanish_word = 'Plateado' and difficulty_level like 'A1%';
update public.questions set german_word = 'Beige' where spanish_word = 'Beige' and difficulty_level like 'A1%';
update public.questions set german_word = 'Hellblau' where spanish_word = 'Celeste' and difficulty_level like 'A1%';

-- Animals
update public.questions set german_word = 'Katze' where spanish_word = 'Gato' and difficulty_level like 'A1%';
update public.questions set german_word = 'Hund' where spanish_word = 'Perro' and difficulty_level like 'A1%';
update public.questions set german_word = 'Vogel' where spanish_word = 'Pájaro' and difficulty_level like 'A1%';
update public.questions set german_word = 'Fisch' where spanish_word = 'Pez' and difficulty_level like 'A1%';
update public.questions set german_word = 'Pferd' where spanish_word = 'Caballo' and difficulty_level like 'A1%';
update public.questions set german_word = 'Kuh' where spanish_word = 'Vaca' and difficulty_level like 'A1%';
update public.questions set german_word = 'Schwein' where spanish_word = 'Cerdo' and difficulty_level like 'A1%';
update public.questions set german_word = 'Schaf' where spanish_word = 'Oveja' and difficulty_level like 'A1%';
update public.questions set german_word = 'Kaninchen' where spanish_word = 'Conejo' and difficulty_level like 'A1%';
update public.questions set german_word = 'Maus' where spanish_word = 'Ratón' and difficulty_level like 'A1%';
update public.questions set german_word = 'Löwe' where spanish_word = 'León' and difficulty_level like 'A1%';
update public.questions set german_word = 'Tiger' where spanish_word = 'Tigre' and difficulty_level like 'A1%';
update public.questions set german_word = 'Elefant' where spanish_word = 'Elefante' and difficulty_level like 'A1%';
update public.questions set german_word = 'Affe' where spanish_word = 'Mono' and difficulty_level like 'A1%';
update public.questions set german_word = 'Bär' where spanish_word = 'Oso' and difficulty_level like 'A1%';
update public.questions set german_word = 'Schlange' where spanish_word = 'Serpiente' and difficulty_level like 'A1%';
update public.questions set german_word = 'Schildkröte' where spanish_word = 'Tortuga' and difficulty_level like 'A1%';
update public.questions set german_word = 'Papagei' where spanish_word = 'Loro' and difficulty_level like 'A1%';
update public.questions set german_word = 'Schmetterling' where spanish_word = 'Mariposa' and difficulty_level like 'A1%';
update public.questions set german_word = 'Delfin' where spanish_word = 'Delfín' and difficulty_level like 'A1%';

-- Basic Objects
update public.questions set german_word = 'Wasser' where spanish_word = 'Agua' and difficulty_level like 'A1%';
update public.questions set german_word = 'Buch' where spanish_word = 'Libro' and difficulty_level like 'A1%';
update public.questions set german_word = 'Haus' where spanish_word = 'Casa' and difficulty_level like 'A1%';
update public.questions set german_word = 'Tisch' where spanish_word = 'Mesa' and difficulty_level like 'A1%';
update public.questions set german_word = 'Stuhl' where spanish_word = 'Silla' and difficulty_level like 'A1%';
update public.questions set german_word = 'Tür' where spanish_word = 'Puerta' and difficulty_level like 'A1%';
update public.questions set german_word = 'Fenster' where spanish_word = 'Ventana' and difficulty_level like 'A1%';
update public.questions set german_word = 'Auto' where spanish_word = 'Coche' and difficulty_level like 'A1%';
update public.questions set german_word = 'Telefon' where spanish_word = 'Teléfono' and difficulty_level like 'A1%';
update public.questions set german_word = 'Bleistift' where spanish_word = 'Lápiz' and difficulty_level like 'A1%';
update public.questions set german_word = 'Papier' where spanish_word = 'Papel' and difficulty_level like 'A1%';
update public.questions set german_word = 'Kugelschreiber' where spanish_word = 'Bolígrafo' and difficulty_level like 'A1%';
update public.questions set german_word = 'Tasche' where spanish_word = 'Bolsa' and difficulty_level like 'A1%';

-- Body parts and common objects for A1/A2
update public.questions set german_word = 'Kopf' where spanish_word = 'Cabeza' and difficulty_level like 'A%';
update public.questions set german_word = 'Auge' where spanish_word = 'Ojo' and difficulty_level like 'A%';
update public.questions set german_word = 'Ohr' where spanish_word = 'Oreja' and difficulty_level like 'A%';
update public.questions set german_word = 'Nase' where spanish_word = 'Nariz' and difficulty_level like 'A%';
update public.questions set german_word = 'Mund' where spanish_word = 'Boca' and difficulty_level like 'A%';
update public.questions set german_word = 'Hand' where spanish_word = 'Mano' and difficulty_level like 'A%';
update public.questions set german_word = 'Fuß' where spanish_word = 'Pie' and difficulty_level like 'A%';
update public.questions set german_word = 'Arm' where spanish_word = 'Brazo' and difficulty_level like 'A%';
update public.questions set german_word = 'Bein' where spanish_word = 'Pierna' and difficulty_level like 'A%';
update public.questions set german_word = 'Herz' where spanish_word = 'Corazón' and difficulty_level like 'A%';

-- Food & Drinks (A1/A2)
update public.questions set german_word = 'Apfel' where spanish_word = 'Manzana' and difficulty_level like 'A%';
update public.questions set german_word = 'Banane' where spanish_word = 'Plátano' and difficulty_level like 'A%';
update public.questions set german_word = 'Orange' where spanish_word = 'Naranja' and difficulty_level like 'A%';
update public.questions set german_word = 'Erdbeere' where spanish_word = 'Fresa' and difficulty_level like 'A%';
update public.questions set german_word = 'Brot' where spanish_word = 'Pan' and difficulty_level like 'A%';
update public.questions set german_word = 'Käse' where spanish_word = 'Queso' and difficulty_level like 'A%';
update public.questions set german_word = 'Milch' where spanish_word = 'Leche' and difficulty_level like 'A%';
update public.questions set german_word = 'Kaffee' where spanish_word = 'Café' and difficulty_level like 'A%';
update public.questions set german_word = 'Tee' where spanish_word = 'Té' and difficulty_level like 'A%';
update public.questions set german_word = 'Fleisch' where spanish_word = 'Carne' and difficulty_level like 'A%';

-- Common verbs
update public.questions set german_word = 'Sein' where spanish_word = 'Ser' and difficulty_level like 'A%';
update public.questions set german_word = 'Haben' where spanish_word = 'Tener' and difficulty_level like 'A%';
update public.questions set german_word = 'Gehen' where spanish_word = 'Ir' and difficulty_level like 'A%';
update public.questions set german_word = 'Machen' where spanish_word = 'Hacer' and difficulty_level like 'A%';
update public.questions set german_word = 'Sagen' where spanish_word = 'Decir' and difficulty_level like 'A%';
update public.questions set german_word = 'Kommen' where spanish_word = 'Venir' and difficulty_level like 'A%';

-- Days and time
update public.questions set german_word = 'Montag' where spanish_word = 'Lunes' and difficulty_level like 'A%';
update public.questions set german_word = 'Dienstag' where spanish_word = 'Martes' and difficulty_level like 'A%';
update public.questions set german_word = 'Mittwoch' where spanish_word = 'Miércoles' and difficulty_level like 'A%';
update public.questions set german_word = 'Donnerstag' where spanish_word = 'Jueves' and difficulty_level like 'A%';
update public.questions set german_word = 'Freitag' where spanish_word = 'Viernes' and difficulty_level like 'A%';
update public.questions set german_word = 'Samstag' where spanish_word = 'Sábado' and difficulty_level like 'A%';
update public.questions set german_word = 'Sonntag' where spanish_word = 'Domingo' and difficulty_level like 'A%';
update public.questions set german_word = 'Januar' where spanish_word = 'Enero' and difficulty_level like 'A%';
update public.questions set german_word = 'Februar' where spanish_word = 'Febrero' and difficulty_level like 'A%';
update public.questions set german_word = 'März' where spanish_word = 'Marzo' and difficulty_level like 'A%';
update public.questions set german_word = 'April' where spanish_word = 'Abril' and difficulty_level like 'A%';
update public.questions set german_word = 'Mai' where spanish_word = 'Mayo' and difficulty_level like 'A%';
update public.questions set german_word = 'Juni' where spanish_word = 'Junio' and difficulty_level like 'A%';
update public.questions set german_word = 'Juli' where spanish_word = 'Julio' and difficulty_level like 'A%';
update public.questions set german_word = 'August' where spanish_word = 'Agosto' and difficulty_level like 'A%';
update public.questions set german_word = 'September' where spanish_word = 'Septiembre' and difficulty_level like 'A%';
update public.questions set german_word = 'Oktober' where spanish_word = 'Octubre' and difficulty_level like 'A%';
update public.questions set german_word = 'November' where spanish_word = 'Noviembre' and difficulty_level like 'A%';
update public.questions set german_word = 'Dezember' where spanish_word = 'Diciembre' and difficulty_level like 'A%';
