import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

router.get("/:userId", CategoryController.getAll);
router.post("/", CategoryController.create);
router.patch("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);
router.post("/seed", CategoryController.seedDefaults);

export default router;
