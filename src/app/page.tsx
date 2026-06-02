"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bell, Play, Pause, RotateCcw, GraduationCap, Flame, Star, Sun, Moon } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import BentoGrid from "@/components/BentoGrid";
import { mockUser, mockCourses } from "@/data/mockData";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Sync theme with document class list
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  // Focus Mode Pomodoro Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds((prev) => prev - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes((prev) => prev - 1);
          setTimerSeconds(59);
        } else {
          // Timer finished
          setIsTimerRunning(false);
          alert("Focus Session Complete! Take a well-deserved break.");
          setTimerMinutes(25);
          setTimerSeconds(0);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timerMinutes, timerSeconds]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerMinutes(25);
    setTimerSeconds(0);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background-deep text-foreground relative overflow-hidden font-sans transition-colors duration-300">
      {/* Dynamic ambient backing grids / backlights */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b dark:from-indigo-950/20 from-indigo-500/5 via-transparent to-transparent pointer-events-none -z-10 transition-colors duration-300" />
      <div className="absolute -top-40 left-[20%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[160px] pointer-events-none -z-10 glow-ambient" />
      <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] rounded-full bg-cyan-600/5 blur-[140px] pointer-events-none -z-10 glow-ambient" style={{ animationDelay: "3s" }} />

      {/* 1. Left Sidebar Panel */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Right Content Section */}
      <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
        {/* Workspace Top Header */}
        <header className="w-full h-20 border-b border-card-border bg-slate-base/10 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between shrink-0 z-20 transition-colors duration-300">
          <div className="flex items-center gap-4">
            {/* Header Title reflecting active tab */}
            <div className="hidden sm:block">
              <h2 className="text-sm font-black text-text-secondary uppercase tracking-widest flex items-center gap-2">
                <span>Hub Workspace</span>
                <span className="text-[10px] bg-slate-base border border-card-border text-text-secondary px-2 py-0.5 rounded font-bold">v1.2.0</span>
              </h2>
            </div>
          </div>

          {/* Core Study Timer widget (Pomodoro focus mode) */}
          <div className="flex items-center gap-3 bg-slate-base/60 border border-card-border px-4 py-2 rounded-2xl shadow-lg relative transition-colors duration-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="text-xs font-extrabold text-text-secondary tracking-wider">
              Focus Mode:
            </span>
            <span className="text-sm font-mono font-black text-text-primary min-w-[44px]">
              {String(timerMinutes).padStart(2, "0")}:{String(timerSeconds).padStart(2, "0")}
            </span>

            {/* Timer controls */}
            <div className="flex items-center gap-2 border-l border-card-border pl-3">
              <button
                onClick={toggleTimer}
                className="text-text-secondary hover:text-text-primary p-1 hover:bg-slate-base/55 rounded-lg cursor-pointer transition-colors"
                title={isTimerRunning ? "Pause timer" : "Start timer"}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={resetTimer}
                className="text-text-muted hover:text-text-primary p-1 hover:bg-slate-base/55 rounded-lg cursor-pointer transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* User profile & actions */}
          <div className="flex items-center gap-4">
            {/* Dark/Light Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-xl bg-slate-base/50 border border-card-border hover:bg-slate-base hover:border-text-secondary flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer transition-all duration-300"
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -60, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 60, scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Notifications Trigger */}
            <button className="relative w-10 h-10 rounded-xl bg-slate-base/50 border border-card-border hover:bg-slate-base hover:border-text-secondary flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer transition-all duration-300">
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 shadow-md shadow-rose-500/50" />
              <Bell className="w-4.5 h-4.5" />
            </button>

            {/* Profile Avatar Badge */}
            <div className="flex items-center gap-3 border-l border-card-border pl-4 select-none">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl blur-sm group-hover:opacity-100 opacity-60 transition-opacity duration-300" />
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-9 h-9 rounded-xl border border-white/10 relative z-10"
                />
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-text-primary leading-none">
                  {mockUser.name}
                </div>
                <div className="text-[10px] text-text-muted font-extrabold uppercase mt-0.5 tracking-wider">
                  Gold Scholar
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tab contents router */}
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full flex-1"
            >
              <BentoGrid user={mockUser} courses={mockCourses} />
            </motion.div>
          ) : (
            <motion.div
              key="other-views"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none"
            >
              <div className="max-w-md glass-panel glass-panel-glow p-8 rounded-3xl relative overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 mb-6">
                  <GraduationCap className="w-9 h-9 text-white" />
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 mb-3">
                  Workspace Module
                </span>

                <h3 className="text-xl font-black text-text-primary tracking-tight">
                  {mockUser.name}&apos;s {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h3>

                <p className="text-text-secondary text-sm mt-3 leading-relaxed">
                  This interface module is fully configured and ready for live production database integration. Enjoy the smooth, high-fidelity experience!
                </p>

                <div className="mt-8 flex gap-4 w-full justify-center">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="cursor-pointer bg-slate-base border border-card-border hover:border-text-secondary text-text-primary font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-black/10 transition-all duration-300"
                  >
                    <span>Return Workspace</span>
                  </button>
                  <button
                    className="cursor-pointer bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs py-3 px-5 rounded-xl shadow-lg shadow-violet-500/20 transition-all duration-300"
                  >
                    <span>Configure Connection</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
