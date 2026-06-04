import { createServerClient } from "../supabase/server";

export interface Student {
  id: string;
  name: string;
  course: string;
  progress: number;
  created_at: string;
}

/**
 * Fetch all students from the Supabase database.
 * Uses a fresh server-side client per request (safe for Server Components).
 * Orders them by creation date descending.
 */
export async function getStudents(): Promise<Student[]> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("students")
      .select("id, name, course, progress, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      // "PGRST200" is relation not found — treat as empty array silently
      if (error.code === "PGRST200" || error.message?.includes("schema cache")) {
        return [];
      }
      throw error;
    }

    return (data as Student[]) || [];
  } catch (error: any) {
    console.error("Failed to retrieve students database rows:", error.message || error);
    throw error;
  }
}
