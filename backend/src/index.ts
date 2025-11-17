import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transaction.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/transactions", transactionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Backend running on http://localhost:" + PORT);
});
