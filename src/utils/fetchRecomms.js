import axios from "axios";

async function fetchArtistRecomms (access_token, artistIds) {
    try {
        const result = await axios.get(`https://api.spotify.com/v1/recommendations?limit=12&seed_artists=${artistIds.join(",")}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return result;
    } catch (error) {
        console.error("Error fetching recommendations", error);
    }
}

export default fetchArtistRecomms;