"use client";

import { createClient } from "@supabase/supabase-js";

/**
 * Browser-side Supabase client.
 * Safe to use inside Client Components ("use client") and for real-time subscriptions.
 * Reads NEXT_PUBLIC_* vars that are inlined by Next.js at build time.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Add them to your Vercel project environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
