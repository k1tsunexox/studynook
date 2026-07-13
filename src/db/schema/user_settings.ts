import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { profiles } from "./profiles";

export const userSettings = pgTable("user_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  theme: text("theme").default("light").notNull(), // 'light' | 'dark'
  emailNotifications: boolean("email_notifications").default(true).notNull(),
});
