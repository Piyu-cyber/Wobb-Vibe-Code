import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type { Platform, SearchData, UserProfileSummary } from "@/types";

const platformData: Record<Platform, SearchData> = {
  instagram: instagramData as SearchData,
  youtube: youtubeData as SearchData,
  tiktok: tiktokData as SearchData,
};

export function getSearchData(platform: Platform): SearchData {
  return platformData[platform];
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) => {
    const profile = item.account.user_profile;
    if (!profile.username) {
      profile.username = profile.handle || (profile as any).custom_name || profile.user_id;
    }
    return profile;
  });
}

function normalizeSearchKey(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function getAllSearchProfiles(): Array<UserProfileSummary & { platform: Platform }> {
  return PLATFORMS.flatMap((platform) =>
    extractProfiles(platform).map((profile) => ({ ...profile, platform }))
  );
}

export function findSearchProfileByUsername(
  username: string
): (UserProfileSummary & { platform: Platform }) | null {
  const key = normalizeSearchKey(username);

  return (
    getAllSearchProfiles().find((profile) => {
      const profileKeys = [
        profile.username,
        profile.fullname,
        profile.handle ?? "",
      ]
        .filter(Boolean)
        .map(normalizeSearchKey);

      return profileKeys.includes(key);
    }) ?? null
  );
}

export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  if (!query) return profiles;
  const q = query.toLowerCase();
  return profiles.filter((p) => {
    const matchUsername = (p.username || "").toLowerCase().includes(q);
    const matchFullname = (p.fullname || "").toLowerCase().includes(q);
    return matchUsername || matchFullname;
  });
}

export const PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok"];

export function getPlatformLabel(platform: Platform): string {
  if (platform === "instagram") return "Instagram";
  if (platform === "youtube") return "YouTube";
  return "TikTok";
}
