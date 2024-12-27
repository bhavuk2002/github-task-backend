import { Request, Response } from "express";
import { models } from "../config/database";
import { fetchGitHubUser } from "../services/githubService";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;

  try {
    const existingUser = await models.User.findOne({ where: { username } });

    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }

    const gitHubUser = await fetchGitHubUser(username);

    const newUser = await models.User.create({
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
