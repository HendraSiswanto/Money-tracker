import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { defaultCategories } from "../../data/defaultCategories";
export const CategoryController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(400).json({ error: "Missing userId" });

      const categories = await CategoryService.getAll(userId);
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch categories" });
    }
  },

  seedDefaults: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;

      if (!userId) return res.status(400).json({ error: "userId is required" });

      const existing = await CategoryService.getAll(userId);

      if (existing.length > 0) return res.json(existing);

      await CategoryService.seedDefaults(userId, defaultCategories);

      const fresh = await CategoryService.getAll(userId);
      res.json(fresh);
    } catch (err) {
      res.status(500).json({ error: "Failed to seed categories" });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { userId, name, emote, type, color } = req.body;

      if (!userId || !name || !emote || !type) {
        return res
          .status(400)
          .json({ error: "userId, name, emote, type are required" });
      }

      const category = await CategoryService.create({
        userId,
        name,
        emote,
        type,
        color: color ?? null,
      });

      return res.json(category);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create category" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const category = await CategoryService.update(Number(id), updateData);
      return res.json(category);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update category" });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deleted = await CategoryService.delete(Number(id));
      return res.json(deleted);
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete category" });
    }
  },
};
