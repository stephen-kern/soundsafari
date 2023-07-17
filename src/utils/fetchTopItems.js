import axios from "axios";

async function fetchTopItems(access_token) {
    const result = await axios.get("https://api.spotify.com/v1/me/top/artists?offset=0&limit=10", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return result;
}

export default fetchTopItems;