import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";
import { defaultCategories } from "../data/defaultCategories";
import { CategoryService } from "../services/category.service";

const router = Router();
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash, name },
    });
    await CategoryService.seedDefaults(user.id, defaultCategories);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
    const existing = await CategoryService.getAll(user.id);
  if (existing.length === 0) {
    await CategoryService.seedDefaults(user.id, defaultCategories);
  }

  res.json({
    token,
    userId: user.id,
    userName: user.name,
  });
});

export default router;
