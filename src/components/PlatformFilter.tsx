import type { Platform } from "@/types";
import { SearchBar } from "./SearchBar";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const PLATFORMS: { id: Platform; label: string; icon: React.ReactNode }[] = [
  { 
    id: "instagram", 
    label: "Instagram", 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ) 
  },
  { 
    id: "youtube", 
    label: "YouTube", 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-red-600">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
        <polygon fill="white" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    ) 
  },
  { 
    id: "tiktok", 
    label: "TikTok", 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.31-1.92 1.57-4.58 2.22-6.99 1.83-2.61-.43-5.01-2.02-6.24-4.32-1.35-2.52-1.28-5.74.19-8.19 1.4-2.33 3.94-3.9 6.64-4.07v4.12c-1.39.04-2.73.68-3.64 1.71-.97 1.12-1.34 2.73-.89 4.13.39 1.25 1.34 2.3 2.54 2.82 1.25.54 2.73.5 3.93-.15 1.09-.59 1.83-1.66 2.05-2.88.08-.43.12-.87.12-1.31V.02z"></path>
      </svg>
    ) 
  },
];

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex bg-slate-100 p-1 rounded-2xl w-full md:w-auto">
        {PLATFORMS.map(({ id, label, icon }) => {
          const isActive = selected === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`
                flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                ${
                  isActive
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }
              `}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>

      <div className="relative w-full md:w-auto flex-1 md:max-w-xs">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
    </div>
  );
}