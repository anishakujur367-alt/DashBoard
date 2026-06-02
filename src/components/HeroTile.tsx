"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Award, BookOpen, Clock } from "lucide-react";
import { UserProfile } from "@/data/mockData";

interface HeroTileProps {
  user: UserProfile;
}

export default function HeroTile({ user }: HeroTileProps) {
  const xpPercentage = (user.currentXP / user.nextLevelXP) * 100;

  return (
    <section className="glass-panel glass-panel-glow p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-full group hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] transition-shadow duration-300">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none -z-10 transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Greeting and Streak */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-violet-400 uppercase">
              Student Workspace
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-tight tracking-tight">
              Welcome back, <span className="text-glow-gradient">{user.name}</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1.5 font-medium">
              Ready to crush today&apos;s learning goals? You&apos;re making remarkable progress.
            </p>
          </div>

          {/* Interactive Study Streak Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="self-start sm:self-center flex items-center gap-3 bg-gradient-to-r from-amber-500/15 via-orange-600/10 to-orange-500/15 border border-orange-500/30 px-4 py-2.5 rounded-2xl shadow-lg shadow-orange-500/5 select-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20"
            >
              <Flame className="w-5 h-5 text-white fill-white" />
            </motion.div>
            <div>
              <div className="text-xs text-orange-400/90 font-bold tracking-wide uppercase">
                Active Streak
              </div>
              <div className="text-base font-extrabold text-white leading-none mt-0.5">
                {user.streakDays} Days
              </div>
            </div>
          </motion.div>
        </div>

        {/* Level & XP Progress Indicator */}
        <div className="mt-8 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4.5">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Level {user.level} Academics
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {user.currentXP} / {user.nextLevelXP} XP
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.4)]"
            />
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-2">
            {user.nextLevelXP - user.currentXP} XP required to level up
          </div>
        </div>
      </div>

      {/* Level stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800/60">
        {/* Stat Item 1 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
              Study Logged
            </div>
            <div className="text-base font-extrabold text-white mt-0.5">
              {user.totalStudyHours} hrs
            </div>
          </div>
        </div>

        {/* Stat Item 2 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
              Graduated
            </div>
            <div className="text-base font-extrabold text-white mt-0.5">
              {user.completedCourses} Courses
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
