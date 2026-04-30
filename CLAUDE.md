# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Run tests once (Vitest)
npm run test:watch   # Run tests in watch mode
```

## Environment

Create `.env.local` with:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Architecture

**Lingo Fox** is a Spanish-learning quiz app (A1–C2 CEFR levels) built with React 18 + TypeScript + Vite. All vocabulary lives in Supabase, not in code.

### Database

Single table: `public.questions` with columns `difficulty_level` (stage-level values like `"A1"`, `"A2"`), `spanish_word`, `english_word`, `category` (e.g. `"greetings"`, `"food"`), `created_at`. RLS is enabled — only authenticated users can read. Migrations live in `supabase/migrations/` and must be run in filename order via the Supabase SQL Editor.

The `category` column was added in migration `20260430000100`. The stage-level migration is `20260430000300_seed_stage_vocab.sql`; apply it after the earlier seed files. The quiz now starts at `A1` for new users, advances one stage at a time on a perfect round, and uses the remaining rows in the current stage as distractors.

### Quiz flow (all in `src/pages/Index.tsx`)

The app is a single-page state machine with five stages:

1. **pick-character** — first-time users choose a mascot (fox/panda/cat/owl)
2. **pick-age-group** — users choose an age group after picking a mascot
3. **home** — `LevelMap` shows the six stage levels (`A1` through `C2`); user taps one to start
4. **quiz** — 5 questions, one at a time; answer is revealed immediately with an explanation from `src/lib/explain.ts`
5. **results** — score determines outcome: 5/5 → advance + unlock next level; ≤3/5 → drop back one stage; 4/5 → stay

Progress is persisted to `localStorage` keyed by `lingo-fox-state-v1:{userId}` so each Supabase user account has independent progress. New users always start at `A1`.

### Data layer

- `src/data/questions.ts` — `pickQuestions(level, n)` fetches from Supabase, builds 4-option multiple-choice questions (1 correct + 3 random distractors from the same stage pool), and returns `Question[]`. Also exports `LEVEL_ORDER` (the canonical six-stage array) and `STAGE_INFO`/`LEVEL_INFO` used by the UI.
- `src/data/characters.ts` — defines the 4 mascots with mood-based dialogue strings.
- `src/data/profile.ts` — defines the selectable age groups shown during onboarding.
- `src/utils/supabase/client.ts` — singleton `createClient()` using `@supabase/ssr`.
- `src/hooks/useAuth.tsx` — React context wrapping Supabase email/password auth (`signIn`, `signUp`, `signOut`).

### Key conventions

- Path alias `@/` maps to `src/`.
- UI primitives are all shadcn/ui components in `src/components/ui/` — don't rewrite them, extend via Tailwind variants.
- Tailwind custom utilities (`bg-gradient-sky`, `shadow-pop`, `text-gradient-hero`, etc.) are defined in `src/index.css`.
- `src/pages/SupabaseTodos.tsx` is a leftover scaffold page — it is not part of the app product.
