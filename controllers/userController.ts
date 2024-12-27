import { Request, Response } from "express";
import { Friend } from "../models/Friend";
import { User } from "../models/User";
import { fetchGitHubUser } from "../services/githubService";

export const saveUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }

    const gitHubUser = await fetchGitHubUser(username);

    const newUser = await User.create({
      username: gitHubUser.login,
      avatar_url: gitHubUser.avatar_url,
      location: gitHubUser.location,
      blog: gitHubUser.blog,
      bio: gitHubUser.bio,
      public_repos: gitHubUser.public_repos,
      public_gists: gitHubUser.public_gists,
      followers: gitHubUser.followers,
      following: gitHubUser.following,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const searchUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, location } = req.query;

  try {
    const users = await User.findAll({
      where: {
        ...(username && { username }),
        ...(location && { location }),
      },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error searching users", error: error });
  }
};

export const softDeleteUser = async (
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

    await user.destroy();
    res.status(200).json({ message: "User soft deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error soft deleting user", error: error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username } = req.params;
  const { location, bio, blog } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Prepare the fields to update
    const updatedFields: { [key: string]: string | null } = {};

    if (location) updatedFields.location = location;
    if (bio) updatedFields.bio = bio;
    if (blog) updatedFields.blog = blog;

    if (Object.keys(updatedFields).length === 0) {
      res.status(400).json({ message: "No valid fields provided to update" });
      return;
    }

    await user.update(updatedFields);

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error });
  }
};
