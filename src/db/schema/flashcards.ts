import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { notes } from "./notes";

export const flashcards = pgTable("flashcards", {
  id: uuid("id").defaultRandom().primaryKey(),

  noteId: uuid("note_id")
    .notNull()
    .references(() => notes.id, {
      onDelete: "cascade",
    }),

  question: text("question").notNull(),
  answer: text("answer").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const flashcardsRelations = relations(flashcards, ({ one }) => ({
  note: one(notes, {
    fields: [flashcards.noteId],
    references: [notes.id],
  }),
}));
