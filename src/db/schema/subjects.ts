import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { academicProfiles } from "./academic-profiles";

export const subjects = pgTable("subjects", {
  id: uuid("id").defaultRandom().primaryKey(),

  academicProfileId: uuid("academic_profile_id")
    .notNull()
    .references(() => academicProfiles.id, {
      onDelete: "cascade",
    }),

  code: text("code").notNull(),

  title: text("title").notNull(),

  units: integer("units").notNull(),

  section: text("section").notNull(),

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
