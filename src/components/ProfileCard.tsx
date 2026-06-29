import { useNavigate } from "react-router-dom";
import type { UserProfileSummary, Platform } from "@/types";
import { formatFollowers } from "@/utils/formatters";
import { VerifiedBadge } from "./VerifiedBadge";
import useWobbStore from "@/store/useWobbStore";
import { Plus, Check, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery?: string;
}

export function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { selectedList, addToList, removeFromList } = useWobbStore();
  const isAdded = selectedList.some((p) => p.username === profile.username);

  const handleClick = () => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdded) {
      removeFromList(profile.username);
    } else {
      addToList(profile, platform);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className="w-full glass-card p-5 cursor-pointer group hover:border-primary-500/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm group-hover:border-primary-100 transition-colors">
              <img
                src={profile.picture || `https://ui-avatars.com/api/?name=${profile.username || profile.handle}&background=random`}
                alt={profile.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${profile.username || profile.handle}&background=random`;
                }}
              />
            </div>
            {profile.is_verified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <VerifiedBadge verified={true} />
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-bold text-slate-800 text-lg group-hover:text-primary-600 transition-colors">
              {profile.fullname || profile.username}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-slate-500 font-medium">@{profile.username || profile.handle}</p>
              {profile.url && (
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium transition-colors flex items-center gap-0.5"
                >
                  Visit ↗
                </a>
              )}
            </div>
            
            {/* Bio snippet */}
            {profile.description && (
              <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                {profile.description}
              </p>
            )}

            {/* Metrics */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700">
                <UsersIcon size={12} className="text-slate-400" />
                {formatFollowers(profile.followers)}
              </div>
              {profile.engagement_rate && (
                <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-md text-xs font-semibold text-green-700">
                  <TrendingUp size={12} className="text-green-500" />
                  {(profile.engagement_rate > 1 ? profile.engagement_rate : profile.engagement_rate * 100).toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleListToggle}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
            ${isAdded 
              ? "bg-green-500 text-white hover:bg-red-500 hover:shadow-red-500/20 group/btn" 
              : "bg-white text-slate-400 border border-slate-200 hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50"}
          `}
          title={isAdded ? "Remove from list" : "Add to list"}
        >
          {isAdded ? (
            <Check size={18} className="group-hover/btn:hidden" />
          ) : (
            <Plus size={18} />
          )}
          {isAdded && <Plus size={18} className="hidden group-hover/btn:block rotate-45" />}
        </button>
      </div>
    </motion.div>
  );
}

function UsersIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}