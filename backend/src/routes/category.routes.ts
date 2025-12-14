import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// protected
router.get("/", authMiddleware, CategoryController.getAll);
router.post("/", authMiddleware, CategoryController.create);
router.patch("/:id", authMiddleware, CategoryController.update);
router.delete("/:id", authMiddleware, CategoryController.delete);

// seed defaults for a new user
router.post("/seed/:userId", CategoryController.seedDefaults);

export default router;
