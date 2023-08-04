import React, { useState } from "react";
import { PiUsersBold, PiArrowRightBold } from "react-icons/pi";
import Tabs from "../components/Tabs/tabs";
import "../index.scss";

const Profile = ({ userData, accessToken, recentData, relatedData }) => {
  const [activeTab, setActiveTab] = useState("Recent");
  const handleTabClick = (tabType) => {
    setActiveTab(tabType);
  };

  const handleCardClick = (item, artistName) => {
    // Open the artist's Spotify page in a new tab
    if (item.external_urls && item.external_urls.spotify) {
      window.open(item.external_urls.spotify, "_blank");
    }
  };

  return (
    <>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-items">
            <img
              className="profile-avatar"
              alt="Profile Avatar"
              src={userData.images[0].url}
            />
            <div className="profile-icons-info">
              <PiUsersBold className="profile-icons" />
              <p>{userData.followers.total}</p>
            </div>
          </div>
        </div>

        <h1>Welcome {userData.display_name}!</h1>

        <Tabs onTabClick={handleTabClick} activeTab={activeTab} />
      </div>

      {activeTab === "Recent" && recentData && (
        <div>
          <div className="container">
            <h2>Your Recent Artists</h2>
            <div className="data-container">
              {recentData.items.map((item, index) => (
                <div
                  key={index}
                  className="artist-cards"
                  onClick={() => handleCardClick(item)}
                >
                  {" "}
                  <img
                    className="avatar"
                    src={item.images[0]?.url}
                    alt={item.name}
                  />{" "}
                  <p>
                    {item.name} 
                  </p>
                  <PiArrowRightBold className="profile-icons" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Related" && relatedData && (
        <div className="container">
          <h2>Artists You May Enjoy</h2>
          <div className="data-container">
            {relatedData.tracks.map((track, index) => (
              <div
                key={index}
                className="artist-cards"
                onClick={() => handleCardClick(track.artists[0].name)}
              >
                <img
                  className="avatar"
                  src={track.album.images[0]?.url}
                  alt={track.nam}
                />{" "}
                <p>
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
                <PiArrowRightBold className="icon" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
