import { db } from "./db";
import { savedCards, type InsertSavedCard, type SavedCard } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createSavedCard(card: InsertSavedCard): Promise<SavedCard>;
  getSavedCards(): Promise<SavedCard[]>;
  getSavedCard(id: number): Promise<SavedCard | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createSavedCard(insertCard: InsertSavedCard): Promise<SavedCard> {
    const [card] = await db.insert(savedCards).values(insertCard).returning();
    return card;
  }

  async getSavedCards(): Promise<SavedCard[]> {
    return await db.select().from(savedCards);
  }

  async getSavedCard(id: number): Promise<SavedCard | undefined> {
    const [card] = await db.select().from(savedCards).where(eq(savedCards.id, id));
    return card;
  }
}

export const storage = new DatabaseStorage();
