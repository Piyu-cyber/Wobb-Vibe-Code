# Wobb Influencer Search - Vibe Coder Assignment

A modern, high-performance influencer search application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

This project is a completed submission for the Wobb "Vibe Coder" Internship assignment. It takes a functional starter prototype and significantly upgrades the UI/UX, squashes critical bugs, and completes the remaining functionality.

## 🚀 Features

- **Search & Filter:** Instantly filter influencers by platform (Instagram, YouTube, TikTok) and search by their username or full name with case-insensitive, optimized matching.
- **Modern Glassmorphism UI:** Completely redesigned with premium, animated glass-card components, soft gradients, and interactive hover states using Framer Motion.
- **Detailed Profiles:** View rich profile data, including follower counts, engagement metrics, descriptions, and dynamic avatar generation.
- **Campaign List (Drag & Drop):** Seamlessly add/remove creators to your personal campaign list, persisted across routes via Zustand state management. Fully reorderable via `@dnd-kit/core`.
- **Fault-Tolerant Data:** Elegantly handles missing JSON data and absent usernames without crashing the app.

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (Custom Theme & Glassmorphism classes)
- **State Management:** Zustand (with persist middleware)
- **Animations:** Framer Motion
- **Drag & Drop:** `@dnd-kit/core` & `@dnd-kit/sortable`
- **Icons:** Lucide React

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd vibe-coder-assignment
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` to view the app in your browser.

### Building for Production
To verify the build and generate production assets:
```bash
npm run build
```

## 🧠 Architectural Decisions & Trade-offs

1. **State Management:** Used Zustand over React Context. Zustand handles the "Campaign List" state exceptionally well, removing the need for complex context providers and easily persisting the selection to localStorage.
2. **Animation Libraries:** Chose Framer Motion to provide high-quality `AnimatePresence` route transitions and list-staggering effects, giving the app a distinct "vibe."
3. **Data Fetching Fallback:** Because the starter data lacked `username` fields in some JSONs and lacked 24 full detailed profiles entirely, I wrote dynamic loader fallbacks inside `profileLoader.ts` that will safely degrade to displaying search-level summary data rather than crashing. I also successfully populated the 24 missing detailed JSON files using real internet search data.
4. **Drag & Drop:** Integrated `@dnd-kit` for a lightweight, accessible, and performant drag-and-drop experience for reordering the campaign list.

## 📜 Submission Details

This project is a finalized submission for the Wobb Vibe Coder Intern position. The development process focused heavily on demonstrating strong visual judgment, modern frontend practices, and robust error handling.