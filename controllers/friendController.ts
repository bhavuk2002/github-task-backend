import { Request, Response } from "express";
import axios from "axios";
import { Friend } from "../models/Friend";
import { User } from "../models/User";

export const addFriends = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const followersRes = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    const followingRes = await axios.get(
      `https://api.github.com/users/${username}/following`
    );
    const followers = followersRes.data.map((f: any) => f.login);
    const following = followingRes.data.map((f: any) => f.login);

    console.log(followers);
    console.log(following);

    const mutualFriends = followers.filter((f: string) =>
      following.includes(f)
    );

    const friends = mutualFriends.map((friend: string) => ({
      userId: user.id,
      friendId: friend,
    }));

    console.log(friends);

    await Friend.bulkCreate(friends);

    res.status(200).json({ message: "Friends added", mutualFriends });
  } catch (error) {
    res.status(500).json({ message: "Error adding friends", error });
  }
};
