import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { subjects } from "./subjects";

export const studySessions = pgTable("study_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Optional: Link a focus session to a specific subject
  subjectId: uuid("subject_id").references(() => subjects.id, {
    onDelete: "set null",
  }),

  duration: integer("duration").notNull(), // Duration in minutes
  sessionType: text("session_type").notNull(), // 'pomodoro', 'short_break', 'long_break'

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
