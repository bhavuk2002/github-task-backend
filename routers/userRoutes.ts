import { Router } from "express";
import { getUser } from "../controllers/userController";

const router = Router();

router.post("/users", getUser);

export default router;
