"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, User } from "lucide-react";
import { Student } from "@/lib/api/students";

interface StudentCardProps {
  student: Student;
}

const getStudentTheme = (progress: number) => {
  if (progress >= 90) {
    return {
      glowColor: "rgba(16, 185, 129, 0.15)", // Emerald
      textColor: "text-accent-emerald",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-teal-500",
      statusLabel: "Elite Status",
    };
  } else if (progress >= 50) {
    return {
      glowColor: "rgba(139, 92, 246, 0.15)", // Violet
      textColor: "text-accent-violet",
      gradientFrom: "from-violet-500",
      gradientTo: "to-indigo-500",
      statusLabel: "On Track",
    };
  } else {
    return {
      glowColor: "rgba(244, 63, 94, 0.15)", // Rose
      textColor: "text-accent-rose",
      gradientFrom: "from-rose-500",
      gradientTo: "to-orange-500",
      statusLabel: "Attention Req.",
    };
  }
};

export default function StudentCard({ student }: StudentCardProps) {
  const theme = getStudentTheme(student.progress);

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="glass-panel glass-panel-glow p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-full min-h-[220px] group cursor-pointer select-none transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.03)]"
    >
      {/* Textured radial gradient mesh backdrop */}
      <div
        className="absolute top-0 right-0 w-44 h-44 rounded-full blur-[80px] pointer-events-none -z-10 group-hover:scale-125 transition-transform duration-700 opacity-60"
        style={{
          background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 80%)`,
        }}
      />
      <div
        className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full blur-[80px] pointer-events-none -z-10 opacity-30"
        style={{
          background: `radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 80%)`,
        }}
      />

      <div>
        {/* Header containing Name, Avatar Icon & Status */}
        <div className="flex items-start justify-between">
          <div className="space-y-1 grow min-w-0 pr-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
              {theme.statusLabel}
            </span>
            <h3 className="text-base font-extrabold text-text-primary group-hover:text-accent-violet transition-colors duration-300 leading-snug truncate">
              {student.name}
            </h3>
          </div>

          <div className="w-10 h-10 rounded-xl bg-slate-base border border-card-border flex items-center justify-center text-text-secondary group-hover:text-text-primary transition-colors shadow-md shrink-0">
            <User className="w-5 h-5" />
          </div>
        </div>

        {/* Current Active Course details */}
        <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-text-secondary">
          <GraduationCap className="w-4 h-4 text-accent-violet shrink-0" />
          <span className="truncate pr-1">{student.course}</span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">
            Course Mastery
          </span>
          <span className={`text-sm font-black ${theme.textColor}`}>
            {student.progress}%
          </span>
        </div>

        {/* Dynamic progress bar */}
        <div className="h-2 w-full bg-slate-base rounded-full overflow-hidden border border-card-border relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: student.progress / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ originX: 0 }}
            className={`h-full bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} rounded-full`}
          />
        </div>

        {/* Card footer details */}
        <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-text-muted group-hover:text-text-primary transition-colors duration-300">
          <span>Joined {new Date(student.created_at).toISOString().split("T")[0]}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.article>
  );
}
