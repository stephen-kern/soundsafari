import axios from "axios";

async function fetchProfile(access_token) {
  const result = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return result;
}

export default fetchProfile;