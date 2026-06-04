"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, HelpCircle, TrendingUp, Info } from "lucide-react";
import { generateActivityData, ActivityDay } from "@/data/mockData";

export default function ActivityTile() {
  const [activityData] = useState<ActivityDay[]>(generateActivityData());
  const [hoveredDay, setHoveredDay] = useState<ActivityDay | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number; y: number } | null>(null);

  // Heatmap Color Classes based on active level (Violet theme)
  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-slate-base/80 border border-card-border hover:bg-slate-base";
      case 1:
        return "bg-violet-500/15 border border-violet-500/20 hover:bg-violet-500/25 shadow-[0_0_8px_rgba(139,92,246,0.05)]";
      case 2:
        return "bg-violet-500/35 border border-violet-500/30 hover:bg-violet-500/45 shadow-[0_0_10px_rgba(139,92,246,0.1)]";
      case 3:
        return "bg-violet-500/65 border border-violet-500/50 hover:bg-violet-500/75 shadow-[0_0_12px_rgba(139,92,246,0.2)]";
      case 4:
        return "bg-violet-500 border border-violet-400/50 hover:bg-violet-400 shadow-[0_0_16px_rgba(139,92,246,0.3)]";
      default:
        return "bg-slate-base";
    }
  };

  const handleMouseEnter = (day: ActivityDay, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();

    if (parentRect) {
      setHoveredDay(day);
      setHoveredPosition({
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top - 40,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
    setHoveredPosition(null);
  };

  // Mock weekly trends for the SVG Line Graph
  const weeklyTrends = [12, 18, 15, 28, 22, 34, 42, 38, 48, 44, 52, 60];

  return (
    <section className="glass-panel glass-panel-glow p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-full group hover:shadow-[0_0_24px_rgba(139,92,246,0.12)] transition-shadow duration-300">
      {/* Mesh Glow Background */}
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-card-border pb-5 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-accent-violet" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-text-primary">
              Weekly Learning Velocity
            </h2>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mt-0.5">
              Heatmap & Study trends
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-text-secondary">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-accent-emerald" />
            <span>+24% Productivity</span>
          </div>
        </div>
      </div>

      {/* Grid containing Line Chart (Left/Top) & Heatmap (Right/Bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: SVG Curved Line Chart */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
              Performance Curve
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-text-primary tracking-tight">84.5h</span>
              <span className="text-[11px] font-bold text-accent-emerald bg-emerald-500/10 px-2 py-0.5 rounded-full">
                +4.2h this week
              </span>
            </div>
            <p className="text-text-secondary text-xs mt-1">
              Active learning curve based on focus records.
            </p>
          </div>

          {/* SVG Line Graph */}
          <div className="h-28 w-full mt-4 relative">
            <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>

              {/* Area path */}
              <path
                d="M 0 80 Q 20 60 40 68 T 80 50 T 120 38 T 160 20 T 200 12 L 200 80 Z"
                fill="url(#chartGradient)"
              />

              {/* Line path */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 0 80 Q 20 60 40 68 T 80 50 T 120 38 T 160 20 T 200 12"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data points glow */}
              <circle cx="200" cy="12" r="3" fill="#f43f5e" className="animate-ping" />
              <circle cx="200" cy="12" r="2.5" fill="#f43f5e" />
            </svg>
          </div>
        </div>

        {/* Right Side: GitHub Style Heatmap Grid */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full relative">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Contribution Heatmap
            </span>
            <div className="flex items-center gap-1 text-[10px] text-text-muted">
              <Info className="w-3.5 h-3.5" />
              <span>Scroll grid on mobile</span>
            </div>
          </div>

          {/* Grid Container */}
          <div className="relative w-full overflow-x-auto pb-2 scrollbar-thin">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[340px]">
              {activityData.map((day, index) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: (index % 7) * 0.02 + Math.floor(index / 7) * 0.015,
                  }}
                  onMouseEnter={(e) => handleMouseEnter(day, e)}
                  onMouseLeave={handleMouseLeave}
                  className={`w-3.5 h-3.5 rounded-[4px] cursor-pointer transition-all duration-200 origin-center ${getLevelColor(
                    day.level
                  )}`}
                />
              ))}

              {/* Tooltip render */}
              <AnimatePresence>
                {hoveredDay && hoveredPosition && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 5 }}
                    style={{
                      left: hoveredPosition.x,
                      top: hoveredPosition.y,
                      transform: "translateX(-50%)",
                    }}
                    className="absolute z-20 pointer-events-none bg-slate-base border border-card-border text-text-primary px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-2xl flex flex-col gap-0.5 whitespace-nowrap"
                  >
                    <span className="text-text-secondary">{hoveredDay.date}</span>
                    <span className="text-accent-violet font-extrabold">
                      {hoveredDay.count} XP Study Logs
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-card-border text-[10px] font-bold text-text-muted uppercase tracking-wider">
            <span>Inactive</span>
            <div className="flex items-center gap-1.5 select-none">
              <span className="text-[10px] mr-1">Less</span>
              <div className="w-2.5 h-2.5 rounded-[3px] bg-slate-base border border-card-border" />
              <div className="w-2.5 h-2.5 rounded-[3px] bg-violet-500/15 border border-violet-500/20" />
              <div className="w-2.5 h-2.5 rounded-[3px] bg-violet-500/35 border border-violet-500/30" />
              <div className="w-2.5 h-2.5 rounded-[3px] bg-violet-500/65 border border-violet-500/50" />
              <div className="w-2.5 h-2.5 rounded-[3px] bg-violet-500 border border-violet-400/50" />
              <span className="text-[10px] ml-1">More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
