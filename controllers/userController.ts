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
