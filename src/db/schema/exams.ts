import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { subjects } from "./subjects";

export const exams = pgTable("exams", {
  id: uuid("id").defaultRandom().primaryKey(),

  subjectId: uuid("subject_id")
    .notNull()
    .references(() => subjects.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  location: text("location"),

  startsAt: timestamp("starts_at", {
    withTimezone: true,
  }).notNull(),

  endsAt: timestamp("ends_at", {
    withTimezone: true,
  }).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
