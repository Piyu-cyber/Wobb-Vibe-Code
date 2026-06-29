import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import type { FullUserProfile, Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import useWobbStore from "@/store/useWobbStore";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { motion } from "framer-motion";
import { Plus, Check, ArrowLeft, Heart, MessageCircle, Play, TrendingUp, Users } from "lucide-react";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") as Platform) || "instagram";

  const [profileData, setProfileData] = useState<{
    data: { user_profile: FullUserProfile };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { selectedList, addToList, removeFromList } = useWobbStore();

  useEffect(() => {
    if (!username) return;

    let active = true;
    setIsLoading(true);
    setHasError(false);

    loadProfileByUsername(username)
      .then((data) => {
        if (!active) return;
        setProfileData(data);
        setHasError(!data);
        setIsLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setHasError(true);
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [username]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading creator profile...</p>
        </div>
      </Layout>
    );
  }

  if (hasError || !profileData) {
    return (
      <Layout>
        <div className="max-w-md mx-auto text-center py-24 glass-panel mt-12">
          <div className="text-6xl mb-6 opacity-80">🕵️‍♀️</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Profile not found</h2>
          <p className="text-slate-500 mb-8">
            We couldn't find detailed data for <strong>@{username}</strong>.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const isAdded = selectedList.some((p) => p.username === user.username);

  return (
    <Layout title="Creator Profile">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors">
          <ArrowLeft size={16} />
          Back to Search
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 opacity-90 relative">
           <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-16 mb-8 gap-6">
            <div className="flex items-end gap-6">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white">
                <img
                  src={user.picture || `https://ui-avatars.com/api/?name=${user.username || user.handle}&background=random`}
                  alt={user.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.username || user.handle}&background=random`;
                  }}
                />
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2 tracking-tight">
                  {user.fullname || user.username}
                  <VerifiedBadge verified={user.is_verified} />
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <p className="text-lg text-slate-500 font-medium">@{user.username || user.handle}</p>
                  {user.url && (
                    <a
                      href={user.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-full transition-colors"
                    >
                      View on {(user.type || platform).charAt(0).toUpperCase() + (user.type || platform).slice(1)} ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                if (isAdded) {
                  removeFromList(user.username);
                } else {
                  addToList(user, platform);
                }
              }}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300
                ${isAdded 
                  ? "bg-green-500 text-white hover:bg-red-500 shadow-green-500/20 group" 
                  : "bg-slate-900 text-white hover:scale-105 shadow-slate-900/20"}
              `}
            >
              {isAdded ? (
                <>
                  <Check size={18} className="group-hover:hidden" />
                  <span className="group-hover:hidden">Added to Campaign</span>
                  <span className="hidden group-hover:inline">Remove Creator</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add to Campaign
                </>
              )}
            </button>
          </div>

          {user.description && (
            <p className="text-slate-600 mb-10 text-lg leading-relaxed max-w-3xl">
              {user.description}
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              icon={<Users className="text-blue-500" />} 
              label="Followers" 
              value={formatFollowers(user.followers)} 
            />
            {user.engagement_rate !== undefined && (
              <StatCard 
                icon={<TrendingUp className="text-green-500" />} 
                label="Engagement" 
                value={formatEngagementRate(user.engagement_rate)} 
              />
            )}
            {user.posts_count !== undefined && (
              <StatCard 
                icon={<div className="text-purple-500 font-bold text-lg">#</div>} 
                label="Posts" 
                value={String(user.posts_count)} 
              />
            )}
            {user.avg_likes !== undefined && (
              <StatCard 
                icon={<Heart className="text-red-500" />} 
                label="Avg Likes" 
                value={formatFollowers(user.avg_likes)} 
              />
            )}
            {user.avg_comments !== undefined && (
              <StatCard 
                icon={<MessageCircle className="text-amber-500" />} 
                label="Avg Comments" 
                value={formatFollowers(user.avg_comments)} 
              />
            )}
            {user.avg_reels_plays !== undefined && (
              <StatCard 
                icon={<Play className="text-indigo-500" />} 
                label="Reels Plays" 
                value={formatFollowers(user.avg_reels_plays)} 
              />
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <StatCard 
                icon={<Play className="text-indigo-500" />} 
                label="Avg Views" 
                value={formatFollowers(user.avg_views)} 
              />
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="glass-card p-5 border border-slate-100 hover:border-primary-100 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>}
        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</div>
      </div>
      <div className="text-2xl font-black text-slate-800">{value}</div>
    </div>
  );
}
