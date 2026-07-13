import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // 'reminder', 'alert', 'system'
  isRead: boolean("is_read").default(false).notNull(),
  link: text("link"), // Optional URL to navigate to when clicked
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
