"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Shield, Zap, Sparkles, GraduationCap, ArrowRight } from "lucide-react";
import { Course } from "@/data/mockData";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  ShieldAlert: Shield,
  Zap,
  Sparkles,
  GraduationCap
};

export const getCourseIcon = (name: string, className?: string) => {
  const IconComponent = icons[name] || GraduationCap;
  return <IconComponent className={className} />;
};

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className="glass-panel glass-panel-glow p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-full group cursor-pointer select-none transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.03)]"
    >
      {/* Textured radial gradient mesh backdrop */}
      <div
        className="absolute top-0 right-0 w-44 h-44 rounded-full blur-[80px] pointer-events-none -z-10 group-hover:scale-125 transition-transform duration-700 opacity-60"
        style={{
          background: `radial-gradient(circle, ${course.glowColor} 0%, transparent 80%)`
        }}
      />
      <div
        className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full blur-[80px] pointer-events-none -z-10 opacity-40"
        style={{
          background: `radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 80%)`
        }}
      />

      <div>
        {/* Header containing Category, Icon & Status */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
              {course.category}
            </span>
            <h3 className="text-base font-bold text-text-primary group-hover:text-violet-400 transition-colors duration-300 leading-snug pr-4">
              {course.title}
            </h3>
          </div>

          <div
            className={`w-10 h-10 rounded-xl bg-slate-base/80 border border-card-border flex items-center justify-center ${course.textColor} shadow-md`}
          >
            {getCourseIcon(course.iconName, "w-5 h-5")}
          </div>
        </div>

        {/* Course specs */}
        <div className="flex gap-4 mt-4 text-xs font-semibold text-text-secondary">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>{course.status}</span>
          </div>
          <div>•</div>
          <div>{course.durationLeft}</div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Syllabus Mastery
          </span>
          <span className="text-sm font-extrabold text-text-primary">
            {course.progress}%
          </span>
        </div>

        {/* Premium high performance progress bar */}
        <div className="h-2 w-full bg-slate-base rounded-full overflow-hidden border border-card-border relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: course.progress / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ originX: 0 }}
            className={`h-full bg-gradient-to-r ${course.gradientFrom} ${course.gradientTo} rounded-full`}
          />
        </div>

        {/* Footer trigger link */}
        <div className="mt-5 flex items-center justify-between text-xs font-bold text-text-secondary group-hover:text-text-primary transition-colors duration-300">
          <span>Resume Curriculum</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.article>
  );
}
