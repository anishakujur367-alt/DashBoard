import React from "react";
import { getStudents, Student } from "@/lib/api/students";
import { getUser, DbUser } from "@/lib/api/users";
import { getDeadlines } from "@/lib/api/deadlines";
import { Deadline } from "@/data/mockData";
import DashboardClient from "./DashboardClient";

// Opt out of static rendering caching to ensure fresh database rows on every load
export const revalidate = 0;

export default async function Page() {
  let initialStudents: Student[] = [];
  let initialError = false;
  let initialUser: DbUser | null = null;
  let initialDeadlines: Deadline[] = [];

  // Fetch all three in parallel for performance
  const [studentsResult, userResult, deadlinesResult] = await Promise.allSettled([
    getStudents(),
    getUser(),
    getDeadlines(),
  ]);

  if (studentsResult.status === "fulfilled") {
    initialStudents = studentsResult.value;
  } else {
    console.error("Failed to fetch students:", studentsResult.reason);
    initialError = true;
  }

  if (userResult.status === "fulfilled") {
    initialUser = userResult.value;
  } else {
    console.error("Failed to fetch user:", userResult.reason);
  }

  if (deadlinesResult.status === "fulfilled") {
    initialDeadlines = deadlinesResult.value;
  } else {
    console.error("Failed to fetch deadlines:", deadlinesResult.reason);
  }

  return (
    <DashboardClient
      initialStudents={initialStudents}
      initialError={initialError}
      initialUser={initialUser}
      initialDeadlines={initialDeadlines}
    />
  );
}
