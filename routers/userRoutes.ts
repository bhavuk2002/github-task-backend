import { Router } from "express";
import { saveUser } from "../controllers/userController";
import { addFriends } from "../controllers/friendController";

const router = Router();

router.post("/users", saveUser);
router.post("/users/:username/friends", addFriends);

export default router;
