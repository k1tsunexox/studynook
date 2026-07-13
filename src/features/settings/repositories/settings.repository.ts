import { eq } from "drizzle-orm";

import { db } from "@/db";
import { userSettings } from "@/db/schema/user_settings";

export async function getSettings(userId: string) {
  return await db.query.userSettings.findFirst({
    where: eq(userSettings.userId, userId),
  });
}

export async function updateSettings(
  userId: string,
  data: { theme: string; emailNotifications: boolean },
) {
  const existing = await getSettings(userId);
  if (existing) {
    return await db
      .update(userSettings)
      .set(data)
      .where(eq(userSettings.userId, userId))
      .returning();
  }
  return await db
    .insert(userSettings)
    .values({ userId, ...data })
    .returning();
}
