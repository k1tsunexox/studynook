import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { profiles } from "@/db/schema";

export async function getProfileById(userId: string) {
  return (
    (await db.query.profiles.findFirst({
      where: eq(profiles.id, userId),
    })) ?? null
  );
}
