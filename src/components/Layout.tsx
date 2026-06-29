import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import useWobbStore from "@/store/useWobbStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { selectedList } = useWobbStore();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="min-w-0">
          <Link
            to="/"
            className="text-lg font-bold text-gray-900 tracking-tight hover:text-blue-600 transition-colors"
          >
            Wobb <span className="text-blue-600">·</span> Influencer Search
          </Link>
          {title && (
            <p className="text-sm text-gray-500 mt-1 truncate">{title}</p>
          )}
        </div>
        {selectedList.length > 0 && (
          <Link
            to="/list"
            className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
          >
            <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
              {selectedList.length}
            </span>
            {selectedList.length === 1 ? "1 creator selected" : `${selectedList.length} creators selected`}
          </Link>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}