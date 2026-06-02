export interface UserProfile {
  name: string;
  avatar: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  streakDays: number;
  streakActive: boolean;
  totalStudyHours: number;
  completedCourses: number;
}

export interface NavItem {
  id: string;
  label: string;
  iconName: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  iconName: string;
  durationLeft: string;
  status: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  glowColor: string;
  textColor: string;
}

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = empty, 4 = very active
}

export interface Deadline {
  id: string;
  title: string;
  courseTitle: string;
  dueDate: string;
  xpReward: number;
  status: "urgent" | "normal" | "completed";
}

// ----------------------------------------------------
// Mock Data Core Definitions
// ----------------------------------------------------

export const mockUser: UserProfile = {
  name: "Sarah Jenkins",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  level: 5,
  currentXP: 3120,
  nextLevelXP: 4500,
  streakDays: 24,
  streakActive: true,
  totalStudyHours: 84.5,
  completedCourses: 3,
};

export const mockNavItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", iconName: "LayoutDashboard" },
  { id: "courses", label: "Courses", iconName: "BookOpen" },
  { id: "activity", label: "Analytics", iconName: "Activity" },
  { id: "deadlines", label: "Milestones", iconName: "Calendar" },
  { id: "settings", label: "Settings", iconName: "Sliders" },
];

export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Next.js Core Architecture",
    category: "Advanced Engineering",
    progress: 78,
    iconName: "Cpu",
    durationLeft: "2 hours left",
    status: "In Progress",
    gradientFrom: "from-cyan-500/10",
    gradientTo: "to-blue-600/10",
    borderColor: "rgba(6, 182, 212, 0.2)",
    glowColor: "rgba(6, 182, 212, 0.15)",
    textColor: "text-accent-cyan",
  },
  {
    id: "course-2",
    title: "TypeScript Design Patterns",
    category: "Software Architecture",
    progress: 92,
    iconName: "ShieldAlert", // Standardized to Shield or similar
    durationLeft: "30 mins left",
    status: "Almost Done",
    gradientFrom: "from-indigo-500/10",
    gradientTo: "to-violet-600/10",
    borderColor: "rgba(139, 92, 246, 0.2)",
    glowColor: "rgba(139, 92, 246, 0.15)",
    textColor: "text-accent-violet",
  },
  {
    id: "course-3",
    title: "Framer Motion Interactive Masterclass",
    category: "UI & Animations",
    progress: 45,
    iconName: "Zap",
    durationLeft: "5 hours left",
    status: "In Progress",
    gradientFrom: "from-rose-500/10",
    gradientTo: "to-pink-600/10",
    borderColor: "rgba(244, 63, 94, 0.2)",
    glowColor: "rgba(244, 63, 94, 0.15)",
    textColor: "text-accent-rose",
  },
  {
    id: "course-4",
    title: "Tailwind Premium Layout Strategies",
    category: "Design Systems",
    progress: 25,
    iconName: "Sparkles",
    durationLeft: "9 hours left",
    status: "Just Started",
    gradientFrom: "from-teal-500/10",
    gradientTo: "to-emerald-600/10",
    borderColor: "rgba(20, 184, 166, 0.2)",
    glowColor: "rgba(20, 184, 166, 0.15)",
    textColor: "text-accent-teal",
  },
];

// Helper to generate contributions heatmap logs for the last 15 weeks (15 columns x 7 rows = 105 grid tiles)
export const generateActivityData = (): ActivityDay[] => {
  const data: ActivityDay[] = [];
  const now = new Date();
  // Start from 15 weeks ago, aligned to the starting day of that week (Sunday)
  const startDate = new Date();
  startDate.setDate(now.getDate() - 104); // 105 days total (15 weeks)

  // Hardcode some patterns to make the chart look exciting and organic
  const activeLevelSeed = [
    0, 1, 0, 2, 0, 3, 4, 1, 2, 0, 0, 1, 2, 3, 1, 0, 0, 4, 3, 2, 1, 0, 0,
    1, 2, 3, 4, 0, 1, 2, 3, 0, 1, 2, 0, 1, 4, 3, 2, 1, 0, 2, 3, 4, 0, 1,
    0, 2, 3, 4, 1, 0, 2, 3, 0, 1, 2, 4, 3, 2, 1, 0, 3, 4, 2, 1, 0, 0, 1,
    2, 3, 1, 0, 4, 3, 2, 1, 0, 0, 2, 3, 4, 1, 0, 2, 3, 4, 0, 1, 0, 2, 3,
    4, 1, 0, 2, 3, 4, 1, 0, 2, 3, 4, 0, 1
  ];

  for (let i = 0; i < 105; i++) {
    const current = new Date(startDate);
    current.setDate(startDate.getDate() + i);

    const level = activeLevelSeed[i % activeLevelSeed.length] as 0 | 1 | 2 | 3 | 4;
    const count = level === 0 ? 0 : level === 1 ? 2 : level === 2 ? 5 : level === 3 ? 12 : 22;

    data.push({
      date: current.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return data;
};

export const mockDeadlines: Deadline[] = [
  {
    id: "dead-1",
    title: "Next.js Advanced Dynamic Routing Practice",
    courseTitle: "Next.js Core Architecture",
    dueDate: "Tomorrow",
    xpReward: 200,
    status: "urgent",
  },
  {
    id: "dead-2",
    title: "Write Spring Micro-Interactions Showcase",
    courseTitle: "Framer Motion Masterclass",
    dueDate: "In 3 days",
    xpReward: 350,
    status: "normal",
  },
  {
    id: "dead-3",
    title: "TypeScript Deep Copy Utility Quiz",
    courseTitle: "TypeScript Design Patterns",
    dueDate: "In 5 days",
    xpReward: 150,
    status: "normal",
  },
  {
    id: "dead-4",
    title: "Responsive Bento Layout Design Review",
    courseTitle: "Tailwind Premium Layout Strategies",
    dueDate: "Completed",
    xpReward: 100,
    status: "completed",
  },
];
