"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import HeroTile from "./HeroTile";
import DeadlinesTile from "./DeadlinesTile";
import CourseCard from "./CourseCard";
import ActivityTile from "./ActivityTile";
import { UserProfile, Course } from "@/data/mockData";

interface BentoGridProps {
  user: UserProfile;
  courses: Course[];
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

export default function BentoGrid({ user, courses }: BentoGridProps) {
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
        <DeadlinesTile />
      </motion.div>

      {/* Course Heading Separator Row */}
      <motion.div
        variants={itemVariants}
        className="lg:col-span-12 md:col-span-2 col-span-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4"
      >
        <div>
          <h2 className="text-xl font-black text-text-primary tracking-tight">
            Curriculum Enrollment
          </h2>
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mt-0.5">
            Overview of your active training metrics
          </p>
        </div>
        <div className="h-px bg-card-border grow mx-6 hidden sm:block" />
        <span className="text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full uppercase tracking-wider shrink-0 select-none">
          {courses.length} ACTIVE CURRICULUMS
        </span>
      </motion.div>

      {/* 3. Course Cards Grid Row */}
      {courses.map((course) => (
        <motion.div
          key={course.id}
          variants={itemVariants}
          className="lg:col-span-3 md:col-span-1 col-span-1 min-h-[260px]"
        >
          <CourseCard course={course} />
        </motion.div>
      ))}

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
