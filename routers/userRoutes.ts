import { Router } from "express";
import {
  saveUser,
  searchUsers,
  softDeleteUser,
  updateUser,
  getSortedUsers,
} from "../controllers/userController";
import { addFriends } from "../controllers/friendController";

const router = Router();

router.post("/users", saveUser);
router.post("/users/:username/friends", addFriends);
router.get("/users/search", searchUsers);
router.delete("/users/:username", softDeleteUser);
router.patch("/users/:username", updateUser);
router.get("/users", getSortedUsers);

export default router;
