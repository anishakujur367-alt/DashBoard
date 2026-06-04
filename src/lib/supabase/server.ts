import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client factory.
 * Call this inside Server Components, Route Handlers, and Server Actions.
 * Creates a fresh client per invocation — never shared across requests.
 *
 * NOTE: Do NOT import this in any "use client" file.
 */
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Ensure these are set in your Vercel project environment variables (Settings → Environment Variables)."
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // Disable auto session management on the server — not needed for anon reads
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
