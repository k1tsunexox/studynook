import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { subjects } from "./subjects";

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),

  subjectId: uuid("subject_id")
    .notNull()
    .references(() => subjects.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  content: text("content").notNull(),

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

export const notesRelations = relations(notes, ({ one }) => ({
  subject: one(subjects, {
    fields: [notes.subjectId],
    references: [subjects.id],
  }),
}));
