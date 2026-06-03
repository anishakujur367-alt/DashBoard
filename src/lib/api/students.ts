import { supabase } from "../supabase";

export interface Student {
  id: string;
  name: string;
  course: string;
  progress: number;
  created_at: string;
}

/**
 * Fetch all students from the Supabase database.
 * Orders them by creation date descending.
 */
export async function getStudents(): Promise<Student[]> {
  try {
    const { data, error } = await supabase
      .from("students")
      .select("id, name, course, progress, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      // "PGRST200" is relation not found error — treat as empty array silently
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
