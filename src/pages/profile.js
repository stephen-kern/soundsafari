import React, { useState } from "react";
import { PiUsersBold, PiIdentificationBadge } from "react-icons/pi";
import fetchTopItems from "../utils/fetchTopItems";
import fetchArtistRecomms from "../utils/fetchRecomms";

const Profile = ({ userData, accessToken }) => {
  const [recentData, setRecentData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isRelatedDisabled, setIsRelatedDisabled] = useState(true);

  const fetchRecentData = async (access_token) => {
    try {
      const response = await fetchTopItems(access_token);
      setRecentData(response.data);
      setIsRelatedDisabled(false);
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
        <div className="profile-header">
          <div className="profile-items">
            <img
              className="profile-avatar"
              alt="Profile Avatar"
              src={userData.images[0].url}
            ></img>
            <div className="profile-icons-info">
              <PiIdentificationBadge className="profile-icons" />
              <p>{userData.id}</p>
            </div>
            <div className="profile-icons-info">
              <PiUsersBold className="profile-icons" />
              <p>{userData.followers.total}</p>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h1>Welcome {userData.display_name}!</h1>
          <button
            className="search-button"
            onClick={() => fetchRecentData(accessToken)}
          >
            Recent
          </button>
          <button
            className={`search-button ${isRelatedDisabled ? "disabled" : ""}`} // conditionally render classname using state
            onClick={handleGetRecomms}
            disabled={isRelatedDisabled}
          >
            Related
          </button>
        </div>

        <div className="container" recentData={recentData}>
          {recentData && (
            <>
              <h2>Your Recent Artists:</h2>
              <div className="recent-container">
                {recentData.items.map((item, index) => (
                  <div key={index} className="artist-cards">
                    {" "}
                    <img
                      className="avatar"
                      src={item.images[0]?.url}
                      alt={item.name}
                    />{" "}
                    <a
                      href={item.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="container">
          {recommendations && (
            <>
              <h2>Artists You May Enjoy</h2>
              <div className="related-container">
                {recommendations.tracks.map((track, index) => (
                  <div key={index} className="artist-cards">
                    <img
                      className="avatar"
                      src={track.album.images[0]?.url}
                      alt={track.nam}
                    />{" "}
                    <a
                      href={track.artists[0].external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </a>
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
