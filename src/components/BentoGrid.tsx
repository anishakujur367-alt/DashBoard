"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import HeroTile from "./HeroTile";
import DeadlinesTile from "./DeadlinesTile";
import StudentCard from "./StudentCard";
import StudentSkeleton from "./StudentSkeleton";
import ActivityTile from "./ActivityTile";
import { UserProfile, Deadline } from "@/data/mockData";
import { Student } from "@/lib/api/students";
import { Database, AlertTriangle, Sparkles } from "lucide-react";

interface BentoGridProps {
  user: UserProfile;
  students: Student[];
  isError?: boolean;
  isLoading?: boolean;
  deadlines?: Deadline[];
}

// Staggered Container Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// Item Rise & Fade Transition
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

export default function BentoGrid({ user, students, isError = false, isLoading = false, deadlines = [] }: BentoGridProps) {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto pb-28 md:pb-10 select-none"
    >
      {/* 1. Hero Welcome Card (Top Left) */}
      <motion.div
        variants={itemVariants}
        className="lg:col-span-8 md:col-span-2 col-span-1 h-full min-h-[340px]"
      >
        <HeroTile user={user} />
      </motion.div>

      {/* 2. Deadlines Task Card (Top Right) */}
      <motion.div
        variants={itemVariants}
        className="lg:col-span-4 md:col-span-2 col-span-1 h-full min-h-[340px]"
      >
        <DeadlinesTile initialDeadlines={deadlines} />
      </motion.div>

      {/* Section Separator Row */}
      <motion.div
        variants={itemVariants}
        className="lg:col-span-12 md:col-span-2 col-span-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4"
      >
        <div>
          <h2 className="text-xl font-black text-text-primary tracking-tight">
            Classroom Student Directory
          </h2>
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mt-0.5">
            Real-time sync of active classroom progress metrics
          </p>
        </div>
        <div className="h-px bg-card-border grow mx-6 hidden sm:block" />
        <span className="text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full uppercase tracking-wider shrink-0 select-none">
          {students.length} ENROLLED STUDENTS
        </span>
      </motion.div>

      {/* 3. Student Cards / Skeletons / Errors Row */}
      {isError ? (
        /* Error Fallback Banner */
        <motion.div
          variants={itemVariants}
          className="lg:col-span-12 md:col-span-2 col-span-1 p-6 rounded-2xl glass-panel bg-rose-500/5 border-rose-500/20 flex flex-col sm:flex-row sm:items-center gap-4 text-left shadow-lg shadow-rose-950/10"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-text-primary uppercase tracking-wide">
              Database Connection Failed
            </h4>
            <p className="text-xs text-text-secondary mt-1 max-w-2xl leading-relaxed">
              Unable to reach the Supabase backend service. Please check that you have configured 
              <code className="mx-1 px-1.5 py-0.5 rounded bg-slate-base/80 border border-card-border text-rose-300 font-mono text-[10px]">
                NEXT_PUBLIC_SUPABASE_URL
              </code> 
              and 
              <code className="mx-1 px-1.5 py-0.5 rounded bg-slate-base/80 border border-card-border text-rose-300 font-mono text-[10px]">
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </code> 
              correctly inside your local environment configuration.
            </p>
          </div>
        </motion.div>
      ) : isLoading ? (
        /* Skeleton loading cards */
        Array.from({ length: 4 }).map((_, idx) => (
          <motion.div
            key={`skeleton-${idx}`}
            variants={itemVariants}
            className="lg:col-span-3 md:col-span-1 col-span-1 min-h-[220px]"
          >
            <StudentSkeleton />
          </motion.div>
        ))
      ) : students.length === 0 ? (
        /* Empty Database Placeholder Row */
        <motion.div
          variants={itemVariants}
          className="lg:col-span-12 md:col-span-2 col-span-1 p-6 rounded-2xl glass-panel bg-violet-500/5 border-card-border flex flex-col sm:flex-row sm:items-center gap-4 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-text-primary uppercase tracking-wide">
              Database Sync Completed
            </h4>
            <p className="text-xs text-text-secondary mt-1 max-w-2xl leading-relaxed">
              Connected successfully to the database schema, but the <code className="text-violet-300 font-mono">students</code> table 
              returned zero rows. Insert students inside your Supabase dashboard editor table to observe real-time dynamic dashboard updates.
            </p>
          </div>
        </motion.div>
      ) : (
        /* Render Live database student cards */
        students.map((student) => (
          <motion.div
            key={student.id}
            variants={itemVariants}
            className="lg:col-span-3 md:col-span-1 col-span-1 min-h-[220px]"
          >
            <StudentCard student={student} />
          </motion.div>
        ))
      )}

      {/* 4. Activity Logs & Graph Card (Bottom Row) */}
      <motion.div
        variants={itemVariants}
        className="lg:col-span-12 md:col-span-2 col-span-1 min-h-[380px] mt-4"
      >
        <ActivityTile />
      </motion.div>
    </motion.main>
  );
}
