import {
  getSettings,
  updateSettings,
} from "../repositories/settings.repository";

export async function fetchUserSettings(userId: string) {
  return await getSettings(userId);
}

export async function updateUserSettings(
  userId: string,
  data: { theme: string; emailNotifications: boolean },
) {
  return await updateSettings(userId, data);
}
