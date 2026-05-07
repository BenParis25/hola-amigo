/**
 * Debug helper to diagnose German bonus and image loading issues
 * Usage: Add this to Index.tsx temporarily to see debug info
 */

import { useEffect } from "react";
import { pickQuestions } from "@/data/questions";

export const DebugHelper = () => {
  useEffect(() => {
    const debug = async () => {
      console.log("=== GERMAN BONUS DEBUG ===");

      try {
        // Test fetching questions
        console.log("Fetching A1 questions...");
        const questions = await pickQuestions("A1", 2);
        
        console.log("✅ Questions fetched:", questions.length);
        questions.forEach((q, i) => {
          console.log(`Q${i + 1}: ${q.prompt}`);
          console.log(`  English: ${q.answers[q.correct]}`);
          console.log(`  German: ${q.germanWord || "❌ MISSING"}`);
          console.log(`  Category: ${q.category}`);
        });

        // Check if german_word appears in any question
        const hasGerman = questions.some((q) => q.germanWord);
        if (!hasGerman) {
          console.error(
            "❌ No German words found in questions!",
            "The database column might not exist or data wasn't seeded."
          );
          console.error("Fix: Run 'supabase db push' to apply migrations");
        } else {
          console.log("✅ German words are being loaded correctly!");
        }
      } catch (error) {
        console.error("❌ Error fetching questions:", error);
      }

      console.log("\n=== IMAGE LOADING DEBUG ===");

      // Check if mascot images are loaded
      const images = document.querySelectorAll("img[src*='mascot']");
      console.log(`Found ${images.length} mascot images in DOM`);

      images.forEach((img, i) => {
        const src = img.getAttribute("src");
        console.log(`Image ${i + 1}:`, src);
        
        // Check if image loaded successfully
        if ((img as HTMLImageElement).complete) {
          if ((img as HTMLImageElement).naturalHeight !== 0) {
            console.log(`  ✅ Loaded successfully`);
          } else {
            console.log(`  ❌ Failed to load (404 or CORS error)`);
          }
        } else {
          console.log(`  ⏳ Still loading...`);
        }
      });
    };

    const timer = setTimeout(debug, 2000);
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
};
