import React, { useState } from "react";
import { PiUsersBold } from "react-icons/pi";
import Tabs from "../components/Tabs/tabs";

const Profile = ({ userData, accessToken, recentData, relatedData }) => {
  const [activeTab, setActiveTab] = useState("Recent");
  const handleTabClick = (tabType) => {
    setActiveTab(tabType);
  };

  return (
    <>
      {/* <div className="profile-container"> */}
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

        <div className="container">
          {activeTab === "Recent" && recentData && (
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
          {activeTab === "Related" && relatedData && (
            <>
              <h2>Artists You May Enjoy</h2>
              <div className="related-container">
                {relatedData.tracks.map((track, index) => (
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
      {/* </div> */}
    </>
  );
};

export default Profile;
