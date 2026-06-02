"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  Calendar,
  Sliders,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GraduationCap
} from "lucide-react";
import { mockNavItems } from "@/data/mockData";

// TypeSafe Icon Mapper
const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  BookOpen,
  Activity,
  Calendar,
  Sliders,
  GraduationCap
};

export const getIcon = (name: string, className?: string) => {
  const IconComponent = icons[name] || GraduationCap;
  return <IconComponent className={className} />;
};

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor viewport size for responsive layout changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width >= 768 && width <= 1024) {
        setIsCollapsed(true); // Tablet: Icons only
      } else if (width > 1024) {
        setIsCollapsed(false); // Desktop: Expanded by default
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ----------------------------------------------------
  // MOBILE NAVIGATION (Bottom Bar)
  // ----------------------------------------------------
  if (isMobile) {
    return (
      <nav className="fixed bottom-4 left-4 right-4 z-50 h-16 glass-panel rounded-2xl flex items-center justify-around px-4 shadow-2xl shadow-black/80">
        {mockNavItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative py-2 px-3 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200"
            >
              <div
                className={`transition-colors duration-300 ${
                  isActive ? "text-violet-400" : "text-slate-400"
                }`}
              >
                {getIcon(item.iconName, "w-5 h-5")}
              </div>
              <span
                className={`text-[10px] mt-0.5 font-medium transition-all duration-300 ${
                  isActive ? "text-violet-400 opacity-100" : "text-slate-500 opacity-80"
                }`}
              >
                {item.label}
              </span>

              {/* Active Backlight Capsule */}
              {isActive && (
                <motion.div
                  layoutId="activeNavMobile"
                  className="absolute inset-0 bg-violet-500/10 border-t-2 border-violet-500 rounded-xl -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>
    );
  }

  // ----------------------------------------------------
  // DESKTOP & TABLET NAVIGATION (Sidebar)
  // ----------------------------------------------------
  return (
    <nav
      className={`relative h-screen shrink-0 border-r border-card-border bg-sidebar-bg flex flex-col justify-between py-6 px-4 z-30 transition-all duration-300 ease-out select-none ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent truncate font-sans tracking-wide"
              >
                Nova Academy
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1.5">
          {mockNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full relative flex items-center gap-3 py-3 px-3.5 rounded-xl cursor-pointer transition-colors duration-300 group ${
                  isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {/* Active tab spring slider */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavDesktop"
                    className="absolute inset-0 bg-violet-600/12 border-l-2 border-violet-500 rounded-xl -z-10 shadow-[inset_1px_0_0_rgba(255,255,255,0.05)]"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  />
                )}

                <div
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-violet-400" : "text-text-secondary group-hover:text-text-primary"
                  }`}
                >
                  {getIcon(item.iconName, "w-5 h-5")}
                </div>

                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm font-medium tracking-wide truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="space-y-4">
        {/* Divider */}
        <div className="h-px bg-card-border mx-1" />

        {/* Log Out Button */}
        <button className="w-full flex items-center gap-3 py-3 px-3.5 rounded-xl text-text-secondary hover:text-rose-400 cursor-pointer transition-colors duration-300 group">
          <div className="transition-transform duration-300 group-hover:translate-x-0.5">
            <LogOut className="w-5 h-5" />
          </div>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-medium tracking-wide"
              >
                Log Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Sidebar Toggle button (Only on large screens) */}
        <div className="hidden lg:block">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg bg-slate-base/50 hover:bg-slate-base border border-card-border hover:border-text-secondary text-text-secondary hover:text-text-primary transition-all duration-300 cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse Panel</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
