import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.cards.list.path, async (req, res) => {
    const cards = await storage.getSavedCards();
    res.json(cards);
  });

  app.post(api.cards.create.path, async (req, res) => {
    try {
      const input = api.cards.create.input.parse(req.body);
      const card = await storage.createSavedCard(input);
      res.status(201).json(card);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.cards.get.path, async (req, res) => {
    const card = await storage.getSavedCard(Number(req.params.id));
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  });

  return httpServer;
}
