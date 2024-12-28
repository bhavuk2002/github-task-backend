import axios from "axios";

export const fetchGitHubUser = async (username: string) => {
  try {
    console.log(username);
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    // console.log(response);
    return response;
  } catch (error) {
    throw new Error("Error fetching user from GitHub");
  }
};
