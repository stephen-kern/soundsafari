import React from "react";
import { PiUsersBold } from "react-icons/pi";
import Tabs from "../components/Tabs/tabs";

const Profile = ({
  userData,
  accessToken,
  recentData,
  relatedData,
  activeTab,
}) => {
  return (
    <>
      

      <div className="profile-container">
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

          <Tabs recentData={recentData} relatedData={relatedData} />
        </div>

        <div className="container">
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
          {relatedData && (
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
      </div>
    </>
  );
};

export default Profile;
