# Troubleshooting Guide: German Bonus & Images

## Issue 1: German Equivalent Not Showing

### What Was Changed
- Added `german_word` column to the `questions` table
- Seeded German translations for ~100 common Spanish words
- Updated the quiz card to display German bonus after answering

### Troubleshooting Steps

**Step 1: Verify Database Migration**
```bash
# Make sure you've pushed the latest migrations
supabase db push
```

**Step 2: Check the Supabase Dashboard**
1. Go to your Supabase project
2. Open SQL Editor
3. Run this query to verify the column exists:
```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name='questions' AND column_name='german_word';
```

**Step 3: Check if German Data Was Seeded**
```sql
SELECT spanish_word, english_word, german_word 
FROM public.questions 
WHERE german_word IS NOT NULL 
LIMIT 10;
```

**Step 4: Test with Network Tab**
1. Open DevTools (F12 → Network tab)
2. Start a quiz
3. Look for API calls to `questions` table
4. Check the response JSON to see if `german_word` is included

### Common Issues

| Issue | Solution |
|-------|----------|
| Column doesn't exist | Run `supabase db push` again |
| No German words returned | Check migration `20260507160100_seed_german_words.sql` ran successfully |
| German words showing as `null` | Verify seed UPDATE statements matched the Spanish words |
| Animation not visible | Check if the QuizCard parent div height is constrained |

---

## Issue 2: Images Not Working

### What You Should See
- Mascot images (fox, panda, cat, owl) should display in:
  - Character picker (onboarding)
  - Home screen header
  - Quiz screen header
  - Bottom walking animation

### Troubleshooting Steps

**Step 1: Check DevTools**
1. Open DevTools (F12)
2. Go to Console tab
3. Look for any 404 errors related to images
4. Go to Network tab → filter by "mascot"
5. Check if image files are being requested and loaded

**Step 2: Build and Check**
```bash
# Build production version
npm run build

# Serve the dist folder locally to test
npx serve dist
```

**Step 3: Check if Images Exist**
```bash
# Verify image files are in src/assets/
ls -la src/assets/mascot-*.png
```

### Image Path Locations
- **Development**: Images are imported as ES modules in:
  - `src/data/characters.ts` - mascot imports
  - Used in: CharacterPicker, Mascot, WalkingMascot components
  - Vite handles the resolution

- **Production**: Images are bundled into `dist/assets/`

### Common Issues

| Issue | Solution |
|-------|----------|
| Images 404 in dev | Restart dev server: `npm run dev` |
| Images 404 in production | Run `npm run build` to verify bundling |
| Images blurry/distorted | Check if correct format (PNG) and dimensions |
| Images loading slowly | Normal - they're large PNG files (~300-500KB each) |

---

## Testing the Features

### To Test German Bonus
1. Start the app: `npm run dev`
2. Go through onboarding (pick character & age group)
3. Select a level (A1 recommended - has most translations)
4. Answer a question
5. Look for amber/gold box with "🇩🇪 Bonus: German" after answering

### To Test Images
1. Character Picker: Should show 4 animal mascots
2. Home Screen: Should show selected mascot in top-right
3. Quiz Screen: Should show level badge and streak counter (may not have images in these)
4. Bottom: Should show walking mascot animation

---

## Quick Fixes to Try

1. **Clear cache and rebuild**
   ```bash
   rm -rf .next node_modules dist
   npm install
   npm run build
   ```

2. **Restart Supabase**
   ```bash
   supabase stop
   supabase start
   supabase db push
   ```

3. **Check environment variables**
   ```bash
   cat .env.local | grep VITE_SUPABASE
   ```

4. **Restart dev server**
   ```bash
   npm run dev
   ```

---

## Still Having Issues?

Check these files to verify implementation:
- `/src/data/questions.ts` - should fetch `german_word`
- `/src/components/QuizCard.tsx` - should display German bonus box
- `/supabase/migrations/20260507160000_add_german_word.sql` - column schema
- `/supabase/migrations/20260507160100_seed_german_words.sql` - German translations
