import express, { Application } from "express";
import userRoutes from "./routers/userRoutes";

const app = express();

app.use(express.json()); // to access json from req handlers
app.use("/api", userRoutes);

export default app;
