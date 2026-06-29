# Wobb Influencer Search - Vibe Coder Assignment

A modern, high-performance influencer search application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

🚀 **Live Demo:** [https://wobb-vibe-code.vercel.app](https://wobb-vibe-code.vercel.app)

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

## 🐛 Bugs Fixed (Data & Infrastructure)

This starter code intentionally included several broken edge cases that would crash the app or lead to a poor user experience. The following bugs were systematically tracked down and resolved:

| # | Bug | File / Location |
|---|---|---|
| 1 | `react-beautiful-dnd` React 19 conflict | `package.json` |
| 2 | Add to List button disabled | `ProfileCard.tsx` |
| 3 | YouTube avatars broken | `youtube.json` |
| 4 | Engagement rate multiplied by 100 twice | `formatters.ts` |
| 5 | Duplicate engagement metrics displayed | `ProfileDetailPage.tsx` |
| 6 | 25 of 30 profile JSONs missing | `profiles/` |
| 7 | Search input missing `id`/`name` | `SearchBar.tsx` |
| 8 | CSP `eval()` violation | `react-beautiful-dnd` |
| 9 | Dead `data-search` DOM attribute | `ProfileCard.tsx` |
| 10 | Duplicate follower formatter | `ProfileCard.tsx` |
| 11 | Redundant `onProfileClick` prop | `ProfileCard.tsx` |
| 12 | Case-sensitive username search | `dataHelpers.ts` |

## 🚀 Submission Details

*   **Note on TikTok Assets:** Since TikTok is banned in India, live assets and real-time profile links from TikTok's CDN are geoblocked and cannot be directly accessed or scraped. As a result, static fallback assets (e.g., Wikimedia Commons for Khaby Lame) are utilized for TikTok creators to ensure the UI renders correctly.

This project is a finalized submission for the Wobb Vibe Coder Intern position. The development process focused heavily on demonstrating strong visual judgment, modern frontend practices, and robust error handling.