import type { ProfileDetailResponse } from "@/types";
import { findSearchProfileByUsername } from "@/utils/dataHelpers";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

function normalizeProfileName(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getProfileLoader(username: string) {
  const directPath = `../assets/data/profiles/${username}.json`;
  if (profileModules[directPath]) {
    return profileModules[directPath];
  }

  const normalizedUsername = normalizeProfileName(username);

  return Object.entries(profileModules).find(([path]) => {
    const fileName = path.split("/").pop()?.replace(/\.json$/, "") ?? "";
    return normalizeProfileName(fileName) === normalizedUsername;
  })?.[1];
}

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const loader = getProfileLoader(username);

  if (loader) {
    try {
      const result = await loader();
      const data =
        (result as { default?: ProfileDetailResponse }).default ?? result;
      return data as ProfileDetailResponse;
    } catch (error) {
      console.error(`Failed to load profile data for ${username}`, error);
    }
  }

  const summary = findSearchProfileByUsername(username);
  if (!summary) {
    return null;
  }

  return {
    data: {
      success: true,
      user_profile: summary,
    },
  };
}
