import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import useWobbStore from "@/store/useWobbStore";
import { motion, AnimatePresence } from "framer-motion";
import { Users, LayoutGrid } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { selectedList } = useWobbStore();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-accent-500 selection:text-white">
      <header className="sticky top-0 z-50 glass-card mx-auto mt-4 max-w-5xl rounded-full px-6 py-3 flex items-center justify-between border border-white/40 shadow-sm transition-all duration-300">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-slate-800 tracking-tight group"
        >
          <div className="bg-primary-500 p-1.5 rounded-xl text-white group-hover:scale-105 transition-transform duration-200">
            <LayoutGrid size={18} />
          </div>
          <span className="text-gradient font-black">Wobb</span> Influencer Search
        </Link>

        {selectedList.length > 0 && (
          <Link
            to="/list"
            className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:shadow-lg hover:shadow-accent-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Users size={16} />
            <span className="hidden sm:inline">My List</span>
            <span className="bg-white/20 text-white rounded-full px-2 py-0.5 ml-1 text-xs">
              {selectedList.length}
            </span>
          </Link>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {title && (
              <h2 className="text-3xl font-bold text-slate-800 mb-6">{title}</h2>
            )}
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}