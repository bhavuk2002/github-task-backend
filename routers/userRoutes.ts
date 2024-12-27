import { Router } from "express";
import { saveUser, searchUsers } from "../controllers/userController";
import { addFriends } from "../controllers/friendController";

const router = Router();

router.post("/users", saveUser);
router.post("/users/:username/friends", addFriends);
router.get("/users/search", searchUsers);

export default router;
