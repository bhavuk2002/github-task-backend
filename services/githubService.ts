import axios from "axios";

export const fetchGitHubUser = async (username: string) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user from GitHub");
  }
};
