import axios from "axios";

async function fetchProfile(access_token) {
  const result = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return result.data;
}

async function fetchRecentData(access_token) {
  const result = await axios.get(
    "https://api.spotify.com/v1/me/top/artists?offset=0&limit=10&time_range=short_term",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return result.data;
}

async function fetchRelatedData(access_token, artistIds) {
  try {
    const seedArtistsIds = artistIds.slice(0, 5);
    const result = await axios.get(
      `https://api.spotify.com/v1/recommendations?limit=12&seed_artists=${seedArtistsIds.join(
        ","
      )}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("Error fetching recommendations", error);
    if (error.response) {
      console.log("response data: ", error.response.data);
    }
    return null;
  }
}

async function fetchAllData(access_token) {
  try {
    const profileData = await fetchProfile(access_token);

    const recentData = await fetchRecentData(access_token);
    if (!recentData || !recentData.items) {
      console.error("Error fetcing recent data");
      return null;
    }

    const artistIds = recentData.items.map((item) => item.id);

    const relatedData = await fetchRelatedData(access_token, artistIds);

    return {
      profileData,
      recentData,
      relatedData,
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
}

export default fetchAllData;
