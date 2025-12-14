import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transaction.routes";
import categoryRoutes from "./routes/category.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/transactions", transactionRoutes);

app.use("/categories", categoryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Backend running on http://localhost:" + PORT);
});
