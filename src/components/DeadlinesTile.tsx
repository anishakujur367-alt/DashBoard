"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CheckCircle2, Circle, AlertCircle, Sparkles } from "lucide-react";
import { mockDeadlines, Deadline } from "@/data/mockData";

export default function DeadlinesTile() {
  const [deadlines, setDeadlines] = useState<Deadline[]>(mockDeadlines);
  const [completedXp, setCompletedXp] = useState<number | null>(null);
  const [xpPos, setXpPos] = useState<{ x: number; y: number } | null>(null);

  const toggleComplete = (id: string, xpReward: number, e: React.MouseEvent) => {
    setDeadlines((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === "completed" ? "normal" : "completed";
          if (newStatus === "completed") {
            // Trigger XP popup
            setCompletedXp(xpReward);
            setXpPos({ x: e.clientX, y: e.clientY });
            setTimeout(() => setCompletedXp(null), 1000);
          }
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  return (
    <section className="glass-panel glass-panel-glow p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-full group hover:shadow-[0_0_24px_rgba(20,184,166,0.12)] transition-shadow duration-300">
      {/* Backlight Glow */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-teal-600/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Header Info */}
      <div className="flex justify-between items-center border-b border-slate-800/60 pb-5 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">
              Academic Deadlines
            </h2>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              Task Checklist
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20 text-[10px] font-bold text-teal-400 tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Earn XP</span>
        </div>
      </div>

      {/* List items */}
      <div className="space-y-3.5 h-full flex flex-col justify-start">
        {deadlines.map((item) => {
          const isDone = item.status === "completed";
          const isUrgent = item.status === "urgent";

          return (
            <motion.div
              key={item.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all duration-300 select-none ${
                isDone
                  ? "bg-emerald-950/10 border-emerald-500/20 opacity-80"
                  : isUrgent
                  ? "bg-rose-950/10 border-rose-500/20 hover:border-rose-500/40"
                  : "bg-slate-900/55 border-slate-800/80 hover:border-slate-700/80"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Complete checkbox trigger button */}
                <button
                  onClick={(e) => toggleComplete(item.id, item.xpReward, e)}
                  className={`shrink-0 cursor-pointer transition-colors duration-200 ${
                    isDone
                      ? "text-emerald-400 hover:text-emerald-500"
                      : isUrgent
                      ? "text-rose-400 hover:text-rose-500"
                      : "text-slate-500 hover:text-slate-400"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-500/10" />
                  ) : isUrgent ? (
                    <AlertCircle className="w-5 h-5 fill-rose-500/10 animate-pulse" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="min-w-0">
                  <motion.h4
                    animate={{
                      textDecorationLine: isDone ? "line-through" : "none",
                      opacity: isDone ? 0.5 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-xs font-bold text-white tracking-wide truncate"
                  >
                    {item.title}
                  </motion.h4>
                  <p className="text-[10px] text-slate-500 font-semibold truncate mt-0.5">
                    {item.courseTitle}
                  </p>
                </div>
              </div>

              {/* Status details & reward badge */}
              <div className="shrink-0 flex flex-col items-end gap-1.5">
                <span
                  className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider ${
                    isDone
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : isUrgent
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      : "bg-slate-950 text-slate-400 border border-slate-800"
                  }`}
                >
                  {item.dueDate}
                </span>

                <span className="text-[10px] font-extrabold text-slate-400">
                  +{item.xpReward} XP
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Gamified Floating XP popups */}
      <AnimatePresence>
        {completedXp && xpPos && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: -60, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: xpPos.x - 40,
              top: xpPos.y,
              pointerEvents: "none",
            }}
            className="z-50 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm px-3.5 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>+{completedXp} XP CLAIMED!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
