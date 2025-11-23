import { Router } from "express";
import { transactionController } from "../controllers/transaction.controller.";

const router = Router();

router.get("/", transactionController.getAll);
router.post("/", transactionController.create);
router.get("/summary", transactionController.summary);
router.delete("/:id", transactionController.delete);
router.patch("/:id", transactionController.update);


export default router;
