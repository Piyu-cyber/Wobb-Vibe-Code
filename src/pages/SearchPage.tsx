import { useState, useMemo } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  return (
    <Layout>
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-100 text-accent-600 text-sm font-medium mb-6"
        >
          <Sparkles size={16} />
          <span>Discover Top Influencers</span>
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight mb-4">
          Find the perfect <br />
          <span className="text-gradient">creators for your brand</span>
        </h1>
        
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Browse through our curated list of top creators across all major social platforms and build your dream campaign list.
        </p>
      </div>

      <div className="glass-panel p-6 mb-8 relative z-10">
        <PlatformFilter
          selected={platform}
          onChange={(p) => {
            setPlatform(p);
            setSearchQuery("");
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-xl font-bold text-slate-800">Creators</h3>
        <p className="text-sm font-medium text-slate-400 bg-white/50 px-3 py-1 rounded-full">
          Showing {filtered.length} results
        </p>
      </div>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
      />
    </Layout>
  );
}