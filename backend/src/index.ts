import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transaction.routes";
import categoryRoutes from "./routes/category.routes";

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use("/transactions", transactionRoutes);
app.use("/categories", categoryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Backend running on http://localhost:" + PORT);
});
