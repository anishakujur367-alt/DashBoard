# Student Dashboard (Next.js + Supabase)

## Overview
This project is a modern student dashboard built using Next.js (App Router), Supabase, and Tailwind CSS. It provides insights into student progress, academic performance, and deadlines through a structured and interactive interface.

---

## Architecture

### Frontend
- Next.js (App Router) for routing and server-side rendering
- React Server Components for efficient data fetching
- Tailwind CSS for styling
- Framer Motion for animations

### Backend
- Supabase (PostgreSQL + REST APIs)
- Handles:
  - Student data
  - User dashboard data
  - Deadlines tracking

---

## Server vs Client Component Strategy

### Server Components
Used for:
- Fetching data from Supabase
- Initial rendering of the dashboard

Benefits:
- Improved performance
- Reduced client-side JavaScript
- Better SEO

---

### Client Components
Used for:
- Animations (Framer Motion)
- Interactive UI elements
- Dynamic visual updates

Examples:
- Student cards hover effects
- Progress animations

---

### Component Split Strategy
- Data fetching handled on the server
- Interactivity handled on the client

This ensures fast initial load and smooth user experience.

---

## Database Design

### Tables

#### students
Stores classroom student data.

#### users
Stores dashboard user information:
- name
- xp
- streak
- level
- total_xp
- study_hours
- courses_completed

#### deadlines
Stores academic tasks:
- title
- course
- due_date
- xp_reward
- status

---

## Data Flow

1. Server components fetch data from Supabase  
2. Data is passed as props to client components  
3. UI renders with animations and interactions  

---

## Challenges Faced

### Hydration Errors
- Issue: Server and client rendered different date formats  
- Cause: use of `toLocaleDateString()`  
- Fix: replaced with deterministic formatting using `toISOString()`  

---

### Supabase API Configuration
- Issue: Missing API key errors  
- Fix: configured environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

### Row Level Security (RLS)
- Issue: No data returned from API  
- Fix: added policy allowing read access:
```sql
using (true)
