import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const savedCards = pgTable("saved_cards", {
  id: serial("id").primaryKey(),
  studentData: jsonb("student_data").notNull(),
  universityData: jsonb("university_data").notNull(),
  themeId: text("theme_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSavedCardSchema = createInsertSchema(savedCards).omit({ 
  id: true, 
  createdAt: true 
});

export type SavedCard = typeof savedCards.$inferSelect;
export type InsertSavedCard = z.infer<typeof insertSavedCardSchema>;
