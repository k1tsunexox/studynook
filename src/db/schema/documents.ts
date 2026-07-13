import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { subjects } from "./subjects";

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),

  subjectId: uuid("subject_id")
    .notNull()
    .references(() => subjects.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  fileUrl: text("file_url").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const documentsRelations = relations(documents, ({ one }) => ({
  subject: one(subjects, {
    fields: [documents.subjectId],
    references: [subjects.id],
  }),
}));
