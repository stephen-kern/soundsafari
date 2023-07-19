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
        <div class="card">
          <div className="main-content">
            <h1>Welcome {userData.display_name}!</h1>
            <ul>
              <img
                className="avatar"
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
          <div className="related-artists-container">
            <button onClick={handleGetRecomms}>Find</button>
            {recommendations && (
              <>
                <h3>Artists You May Enjoy</h3>
                <div className="related-artists-list">
                  {recommendations.tracks.map((track, index) => (
                    <div key={index} className="related-artists-cards">
                      <img
                        src={track.album.images[0]?.url}
                        alt={track.nam}
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                      />{" "}
                      <span>{track.artists.map((artist) => artist.name).join(", ")}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <aside recentData={recentData}>
          <button onClick={() => fetchRecentData(accessToken)}>GO</button>
          {recentData && (
            <>
              <h2>Your recent artists:</h2>
              <ul>
                {recentData.items.map((item, index) => (
                  <li key={index}>
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
                    {item.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
        
      </div>
    </>
  );
};

export default Profile;
