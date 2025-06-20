export async function findGithubAccounts(query) {
  const API_URL = "https://api.github.com";
  try {
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch (e) {
    throw new Error(e);
  }
} 