import { pgTable, text, time, timestamp, uuid } from "drizzle-orm/pg-core";

import { subjects } from "./subjects";

export const classSchedules = pgTable("class_schedules", {
  id: uuid("id").defaultRandom().primaryKey(),

  subjectId: uuid("subject_id")
    .notNull()
    .references(() => subjects.id, {
      onDelete: "cascade",
    }),

  day: text("day").notNull(),

  startTime: time("start_time").notNull(),

  endTime: time("end_time").notNull(),

  room: text("room").notNull(),

  faculty: text("faculty"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
