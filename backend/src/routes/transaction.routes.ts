import { Router } from "express";
import { transactionController } from "../controllers/transaction.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, transactionController.getAll);
router.post("/", authMiddleware, transactionController.create);
router.patch("/:id", authMiddleware, transactionController.update);
router.delete("/:id", authMiddleware, transactionController.delete);
router.get("/summary", authMiddleware, transactionController.summary);

export default router;
