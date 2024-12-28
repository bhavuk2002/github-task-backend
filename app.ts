import express from "express";
import userRoutes from "./routers/userRoutes";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // For local development
];

app.use(express.json()); // to access json from req handlers
app.use(cors({ origin: allowedOrigins }));
app.use("/api", userRoutes);

export default app;
