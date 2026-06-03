import React from "react";

export default function StudentSkeleton() {
  return (
    <div className="glass-panel glass-panel-glow p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-full min-h-[220px] animate-pulse select-none">
      {/* Mesh Glow Background Placeholder */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800/10 rounded-full blur-[60px]" />

      <div>
        {/* Header containing name and icon placeholder */}
        <div className="flex items-start justify-between">
          <div className="space-y-2.5 grow pr-4">
            {/* Tag name */}
            <div className="h-2.5 bg-slate-base/80 rounded w-1/3" />
            {/* Student Name */}
            <div className="h-4.5 bg-slate-base rounded w-3/4" />
          </div>

          {/* Icon Placeholder */}
          <div className="w-10 h-10 rounded-xl bg-slate-base border border-card-border" />
        </div>

        {/* Course Name */}
        <div className="h-3 bg-slate-base rounded w-1/2 mt-4" />
      </div>

      {/* Progress Section */}
      <div className="mt-6">
        <div className="flex justify-between items-end mb-2.5">
          <div className="h-2.5 bg-slate-base rounded w-1/4" />
          <div className="h-3 bg-slate-base rounded w-8" />
        </div>

        {/* Progress bar line */}
        <div className="h-2 w-full bg-slate-base rounded-full border border-card-border" />
      </div>
    </div>
  );
}
