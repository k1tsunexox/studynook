import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { profiles } from "./profiles";

export const academicProfiles = pgTable("academic_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id, {
      onDelete: "cascade",
    }),

  university: text("university").notNull(),

  campus: text("campus").notNull(),

  college: text("college").notNull(),

  degreeProgram: text("degree_program").notNull(),

  yearLevel: integer("year_level").notNull(),

  semester: text("semester").notNull(),

  academicYear: text("academic_year").notNull(),

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
