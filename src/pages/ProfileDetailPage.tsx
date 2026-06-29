import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, Platform, ProfileDetailResponse } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import useWobbStore from "@/store/useWobbStore";

function fmt(count: number): string {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
    <div className="text-xs text-gray-400 mb-1">{label}</div>
    <div className="text-lg font-semibold text-gray-900">{value}</div>
  </div>
);

function ProfileDetailContent({
  username,
  platform,
}: {
  username: string;
  platform: Platform;
}) {
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { selectedList, addToList, removeFromList } = useWobbStore();
  const isAdded = selectedList.some((p) => p.username === username);

  useEffect(() => {
    let active = true;

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
        <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
          Loading profile...
        </div>
      </Layout>
    );
  }

  if (hasError || !profileData) {
    return (
      <Layout>
        <div className="max-w-md mx-auto text-center py-24">
          <p className="text-4xl mb-4">😕</p>
          <p className="text-gray-700 font-medium mb-2">Profile not found</p>
          <p className="text-gray-400 text-sm mb-6">
            We could not load details for @{username}. The profile may not be available in the current dataset.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-700 transition-colors"
          >
            ← Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const handleListToggle = () => {
    if (isAdded) {
      removeFromList(user.username);
    } else {
      addToList(user, platform);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6"
        >
          ← Back to search
        </Link>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-4">
          <div className="flex gap-5 items-start">
            <img
              src={user.picture}
              className="w-20 h-20 rounded-full object-cover border border-gray-100 flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.username}&background=e5e7eb&color=6b7280&size=80`;
              }}
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-1">
                @{user.username}
                <VerifiedBadge verified={user.is_verified} />
              </h1>
              <p className="text-gray-500 text-sm">{user.fullname}</p>
              <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full capitalize">
                {platform}
              </span>

              {user.description && (
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {user.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-50">
            <button
              onClick={handleListToggle}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                isAdded
                  ? "bg-green-50 text-green-700 border border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isAdded ? "Added ✓" : "Add to List"}
            </button>

            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"
              >
                View on {platform} →
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard label="Followers" value={fmt(user.followers)} />
          <StatCard
            label="Engagement Rate"
            value={formatEngagementRate(user.engagement_rate)}
          />
          {user.posts_count !== undefined && (
            <StatCard label="Posts" value={String(user.posts_count)} />
          )}
          {user.avg_likes !== undefined && (
            <StatCard label="Avg Likes" value={fmt(user.avg_likes)} />
          )}
          {user.avg_comments !== undefined && (
            <StatCard label="Avg Comments" value={fmt(user.avg_comments)} />
          )}
          {user.avg_views !== undefined && user.avg_views > 0 && (
            <StatCard label="Avg Views" value={fmt(user.avg_views)} />
          )}
          {user.engagements !== undefined && (
            <StatCard
              label="Engagements"
              value={user.engagements.toLocaleString()}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") ?? "instagram") as Platform;

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  return <ProfileDetailContent key={username} username={username} platform={platform} />;
}
