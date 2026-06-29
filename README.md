# Wobb Influencer Search — Piyush Prashant

## Live Demo
[link here if deployed]

## Getting Started
npm install
npm run dev

## Bugs Found & Fixed
1. `react-beautiful-dnd@13.1.1` is incompatible with React 19 — replaced with `@dnd-kit/core`
2. "Add to List" button disabled via `disabled` attribute — stub with no functionality, implemented full feature with Zustand
3. YouTube profile avatars broken — invalid image URLs in youtube.json data
4. Engagement Rate shows 125.51% — impossible value, data field being multiplied incorrectly
5. Duplicate engagement metrics displayed — "Engagement Rate" and "Engagements" show conflicting values for same stat
6. Only 5 of 30 profile JSON files exist — 25 profiles crash on click
6b. Duplicate MrBeast profile files (mrbeast.json vs MrBeast6000.json) with inconsistent casing
7. Search input missing id/name attribute — accessibility issue
8. CSP violation — eval() usage blocked, likely from react-beautiful-dnd
9. Dead `data-search` DOM attribute — searchQuery prop passed only to set useless HTML attribute
10. Duplicate follower formatter — local function duplicates formatters.ts utility
11. Redundant onProfileClick prop — navigation handled by useNavigate, prop serves no purpose
12. Case-sensitive username search in filterProfiles:

## What I Built / Changed
- Replaced React Context with Zustand for state management
- Redesigned UI with [describe your design direction]
- Implemented full "Add to List" feature with duplicate handling
- [etc]

## Design Decisions & Trade-offs
- Chose X over Y because...
- Decided not to implement Z because...

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS
- Zustand (state management)
- @dnd-kit/core (drag and drop)
- [anything else you add]