# Quick Fixes for German Bonus & Images Issues

## For German Bonus Not Showing

### Immediate Actions:
1. **Push migrations again** (even though you already did this):
   ```bash
   supabase db push
   ```

2. **Clear local cache and restart**:
   ```bash
   npm run dev
   ```
   Then close and reopen the browser (Ctrl+Shift+R to hard refresh)

3. **Enable debug logging** (temporary):
   - Open `src/pages/Index.tsx`
   - Near the top of the file, after imports, add:
   ```typescript
   import { DebugHelper } from "@/components/DebugHelper";
   ```
   - Inside the `Index` component JSX, add this anywhere (it won't render):
   ```jsx
   <DebugHelper />
   ```
   - Open browser DevTools console (F12)
   - Answer a question to trigger the debug output
   - Share the console output in logs

### What the Debug Helper Shows:
- Whether German words are being fetched from the database
- Which German words are null/missing
- Any query errors

### Why German Might Not Show:
1. **Migration not applied**: Column doesn't exist
   - Fix: `supabase db push` then check Supabase dashboard SQL editor

2. **Data not seeded**: Column exists but is empty
   - Fix: Manually run the seed in Supabase SQL editor:
   ```sql
   update public.questions set german_word = 'Hallo' 
   where spanish_word = 'Hola' and difficulty_level like 'A1%';
   ```

3. **Query not fetching the column**: 
   - Already fixed in the latest code
   - Make sure you have the latest `src/data/questions.ts`

---

## For Images Not Working

### Immediate Actions:
1. **Restart dev server**:
   ```bash
   npm run dev
   ```

2. **Hard refresh browser**:
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)

3. **Check DevTools Network tab**:
   - Open DevTools (F12) → Network tab
   - Reload page
   - Filter for "mascot"
   - You should see 4 PNG files loading
   - Check if they're 200 OK or 404 errors

### If Images Show "404 Not Found":
```bash
# Rebuild assets
npm run build

# Test production build
npx serve dist

# Then open http://localhost:3000
```

### If Images Are Very Slow to Load:
- This is normal - they're large files (300-500KB each)
- Network tab should show them completing eventually

---

## Code Changes Made

| File | Change | Status |
|------|--------|--------|
| `supabase/migrations/20260507160000_add_german_word.sql` | Added column | ✅ Applied |
| `supabase/migrations/20260507160100_seed_german_words.sql` | Seeded data | ✅ Applied |
| `src/data/questions.ts` | Updated to fetch German | ✅ Ready |
| `src/components/QuizCard.tsx` | Display German bonus | ✅ Ready |
| `src/components/DebugHelper.tsx` | Debug tool | ✅ New |

---

## Step-by-Step Testing

### Test 1: German Bonus
1. Start app: `npm run dev`
2. Create/login account
3. Pick character and age group
4. Select A1 level
5. Answer first question **completely** (click an answer)
6. **Wait 2 seconds** for German bonus animation
7. Look for amber/gold box with 🇩🇪 icon below the answer buttons

### Test 2: Images
1. Start app: `npm run dev`  
2. You should see 4 mascots on character picker screen
3. Pick one → should see it in top-right of home screen
4. Each mascot should have a cute animation at bottom of screen
5. Build: `npm run build`
6. Serve build: `npx serve dist`
7. Images should still appear

---

## Still Issues? Check These:

### German Not Showing:
```bash
# Check if column exists
# In Supabase SQL editor:
SELECT column_name FROM information_schema.columns 
WHERE table_name='questions' AND column_name='german_word';

# Check if data exists
SELECT COUNT(*) FROM public.questions 
WHERE german_word IS NOT NULL;
```

### Images Not Working:
```bash
# Check if images exist
ls -la src/assets/mascot-*.png

# Rebuild and clear cache
rm -rf dist node_modules/.vite
npm run build
npm run dev
```

---

## Questions?

Check the detailed troubleshooting guide: `TROUBLESHOOTING.md`
