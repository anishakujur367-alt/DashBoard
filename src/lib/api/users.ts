import { createServerClient } from "../supabase/server";

export interface DbUser {
  id: string;
  name: string;
  avatar?: string;
  level?: number;
  current_xp?: number;
  next_level_xp?: number;
  streak_days?: number;
  streak_active?: boolean;
  total_study_hours?: number;
  completed_courses?: number;
}

/**
 * Fetch the first user row from the "users" table.
 * Uses a fresh server-side client per request (safe for Server Components).
 * Returns null if none found.
 */
export async function getUser(): Promise<DbUser | null> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("users")
      .select(
        "id, name, avatar, level, current_xp, next_level_xp, streak_days, streak_active, total_study_hours, completed_courses"
      )
      .limit(1)
      .single();

    if (error) {
      // "PGRST116" = no rows found — return null, not a crash
      // "PGRST200" = relation not found in schema cache — return null silently
      if (
        error.code === "PGRST116" ||
        error.code === "PGRST200" ||
        error.message?.includes("schema cache")
      ) {
        return null;
      }
      throw error;
    }

    return data as DbUser;
  } catch (error: any) {
    console.error("Failed to fetch user:", error.message || error);
    return null;
  }
}
