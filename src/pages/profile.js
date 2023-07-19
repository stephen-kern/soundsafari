import React, { useState } from "react";
import fetchTopItems from "../utils/fetchTopItems";
import fetchArtistRecomms from "../utils/fetchRecomms";

const Profile = ({ userData, accessToken }) => {
  const [recentData, setRecentData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const fetchRecentData = async (access_token) => {
    try {
      const response = await fetchTopItems(access_token);
      setRecentData(response.data);
    } catch (error) {
      console.error("Error fetching top items", error);
    }
  };

  const handleGetRecomms = async () => {
    if (recentData) {
      const artistIds = recentData.items.map((item) => item.id);
      const seedArtistIds = artistIds.slice(0, 5);
      const response = await fetchArtistRecomms(accessToken, seedArtistIds);
      if (response && response.data) {
        setRecommendations(response.data);
      }
    }
  };

  return (
    <>
      <div className="profile-container">
        <div className="container">
          <h1>Welcome {userData.display_name}!</h1>
          <ul>
            <img
              className="profile-avatar"
              alt="Profile Avatar"
              src={userData.images[0].url}
            ></img>
            <li>
              Followers: <span id="id">{userData.followers.total}</span>
            </li>
            <li>
              AKA: <span id="id">{userData.id}</span>
            </li>
          </ul>
        </div>
        <div className="container">
          <button onClick={handleGetRecomms}>Find</button>
          {recommendations && (
            <>
              <h3>Artists You May Enjoy</h3>
              <div className="artist-container">
                {recommendations.tracks.map((track, index) => (
                  <div key={index} className="artist-cards">
                    <img
                      className="artist-avatar"
                      src={track.album.images[0]?.url}
                      alt={track.nam}
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    />{" "}
                    <span>
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="container" recentData={recentData}>
          <button onClick={() => fetchRecentData(accessToken)}>GO</button>
          {recentData && (
            <>
              <h2>Your recent artists:</h2>
              <div className="artist-container">
                {recentData.items.map((item, index) => (
                  <div key={index} className="artist-cards">
                    {" "}
                    <img
                      className="artist-avatar"
                      src={item.images[0]?.url}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                    />{" "}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
