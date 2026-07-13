import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { subjects } from "./subjects";

export const assignments = pgTable("assignments", {
  id: uuid("id").defaultRandom().primaryKey(),

  subjectId: uuid("subject_id")
    .notNull()
    .references(() => subjects.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  description: text("description"),

  dueAt: timestamp("due_at", {
    withTimezone: true,
  }).notNull(),

  completed: boolean("completed").default(false).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
