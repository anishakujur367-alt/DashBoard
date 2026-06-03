import { supabase } from "../supabase";
import { Deadline } from "@/data/mockData";

export interface DbDeadline {
  id: string;
  title: string;
  course_title: string;
  due_date: string;
  xp_reward: number;
  status: "urgent" | "normal" | "completed";
}

/**
 * Fetch all deadlines from the "deadlines" table.
 * Maps snake_case DB columns → camelCase Deadline interface.
 * Returns [] silently when the table hasn't been created yet (PGRST200),
 * and logs a warning for any other unexpected errors.
 */
export async function getDeadlines(): Promise<Deadline[]> {
  const { data, error } = await supabase
    .from("deadlines")
    .select("id, title, course_title, due_date, xp_reward, status")
    .order("created_at", { ascending: true });

  if (error) {
    // PGRST200 = table/relationship not found in schema cache
    // Treat this as "table not set up yet" — silent fallback, no crash
    if (error.code === "PGRST200" || error.message?.includes("schema cache")) {
      return [];
    }
    console.warn("Failed to fetch deadlines:", error.message);
    return [];
  }

  return (data as DbDeadline[]).map((row) => ({
    id: row.id,
    title: row.title,
    courseTitle: row.course_title,
    dueDate: row.due_date,
    xpReward: row.xp_reward,
    status: row.status,
  }));
}

