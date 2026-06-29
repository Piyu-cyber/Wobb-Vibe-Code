import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import useWobbStore from "@/store/useWobbStore";

export function ListPage() {
  const { selectedList, removeFromList } = useWobbStore();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Creator List</h1>
          <p className="text-gray-500 text-sm mt-1">
            {selectedList.length === 0
              ? "No creators added yet"
              : `${selectedList.length} creator${selectedList.length > 1 ? "s" : ""} selected`}
          </p>
        </div>

        {selectedList.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-200 rounded-2xl">
            <p className="text-4xl mb-4">📋</p>
            <p className="text-gray-500 text-sm mb-4">
              Add creators from the search page to build your list
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-700 transition-colors"
            >
              Browse Influencers
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {selectedList.map((profile) => (
                <div
                  key={profile.username}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl"
                >
                  <img
                    src={profile.picture}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${profile.username}&background=e5e7eb&color=6b7280`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/profile/${profile.username}?platform=${profile.platform}`}
                      className="font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1"
                    >
                      @{profile.username}
                      <VerifiedBadge verified={profile.is_verified} />
                    </Link>
                    <p className="text-sm text-gray-500 truncate">{profile.fullname}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatFollowers(profile.followers)} followers ·{" "}
                      <span className="capitalize">{profile.platform}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromList(profile.username)}
                    className="flex-shrink-0 px-3 py-1.5 text-sm font-medium rounded-full border border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <Link to="/" className="text-sm text-blue-600 hover:underline">
                ← Add more creators
              </Link>
              <button
                onClick={() => selectedList.forEach((p) => removeFromList(p.username))}
                className="text-sm text-red-400 hover:text-red-600 transition-colors"
              >
                Clear all
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}