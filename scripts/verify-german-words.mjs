#!/usr/bin/env node
/**
 * Troubleshooting script to verify:
 * 1. german_word column exists in questions table
 * 2. German words have been seeded
 * 3. Questions can be fetched with German words
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

const main = async () => {
  try {
    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY environment variables");
      console.error("   Make sure .env.local is set up correctly");
      process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test 1: Check if german_word column exists
    console.log("🔍 Test 1: Checking if german_word column exists...");
    const { data: schemaData, error: schemaError } = await supabase
      .from("questions")
      .select("german_word")
      .limit(1);

    if (schemaError?.message?.includes("column")) {
      console.error("❌ german_word column does not exist!");
      console.error("   Run: supabase db push");
    } else {
      console.log("✅ german_word column exists");
    }

    // Test 2: Check how many rows have German words
    console.log("\n🔍 Test 2: Checking German word data...");
    const { data: countData, error: countError } = await supabase
      .from("questions")
      .select("spanish_word, english_word, german_word")
      .not("german_word", "is", null)
      .limit(5);

    if (countError) {
      console.error("❌ Error fetching German words:", countError.message);
    } else {
      console.log(`✅ Found ${countData?.length} rows with German words`);
      if (countData && countData.length > 0) {
        console.log("\n Sample German words:");
        countData.forEach((row, i) => {
          console.log(
            `   ${i + 1}. ${row.spanish_word} → ${row.english_word} (${row.german_word})`
          );
        });
      } else {
        console.error("❌ No German words found in database!");
        console.error("   Run: supabase db push");
      }
    }

    // Test 3: Check A1 level questions
    console.log("\n🔍 Test 3: Checking A1 level questions with German...");
    const { data: a1Data, error: a1Error } = await supabase
      .from("questions")
      .select("spanish_word, english_word, german_word, category")
      .eq("difficulty_level", "A1")
      .limit(5);

    if (a1Error) {
      console.error("❌ Error fetching A1 questions:", a1Error.message);
    } else {
      console.log(`✅ Found ${a1Data?.length} A1 level questions`);
      if (a1Data && a1Data.length > 0) {
        console.log("\n Sample A1 questions:");
        a1Data.forEach((row, i) => {
          console.log(
            `   ${i + 1}. ${row.spanish_word} (${row.category}) → ${row.english_word} | 🇩🇪 ${row.german_word || "❌ Missing"}`
          );
        });
      }
    }

    console.log("\n✨ Troubleshooting complete!");
  } catch (error) {
    console.error("💥 Error:", error);
  }
};

main();
