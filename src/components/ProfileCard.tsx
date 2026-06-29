import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import useWobbStore from "@/store/useWobbStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery?: string;
  onProfileClick?: (username: string) => void;
}

export function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { selectedList, addToList, removeFromList } = useWobbStore();

  const isAdded = selectedList.some((p) => p.username === profile.username);

  const handleClick = () => {
    onProfileClick?.(profile.username);
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
    <div
      onClick={handleClick}
      className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl mb-3 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-150 w-full"
    >
      <img
        src={profile.picture}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            `https://ui-avatars.com/api/?name=${profile.username}&background=e5e7eb&color=6b7280`;
        }}
      />
      <div className="text-left flex-1 min-w-0">
        <div className="font-semibold text-gray-900 flex items-center gap-1">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-500 truncate">{profile.fullname}</div>
        <div className="text-xs text-gray-400 mt-0.5">
          {formatFollowers(profile.followers)} followers
        </div>
      </div>
      <button
        onClick={handleListToggle}
        className={`flex-shrink-0 px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-150 ${
          isAdded
            ? "bg-green-50 text-green-700 border border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isAdded ? "Added ✓" : "Add to List"}
      </button>
    </div>
  );
}