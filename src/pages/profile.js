import React, { useState } from "react";
import fetchTopItems from "../utils/fetchTopItems";

const Profile = ({ userData, accessToken }) => {
  const [recentData, setRecentData] = useState(null);

  const fetchRecentData = async (access_token) => {
    try {
      const response = await fetchTopItems(access_token);
      setRecentData(response.data);
      console.log(access_token);
    } catch (error) {
      console.error("Error fetching top items", error);
    }
  };

  return (
    <>
      <div>
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
            User ID: <span id="id">{userData.id}</span>
          </li>
          <li>
            Email: <span id="email">{userData.email}</span>
          </li>
          <li>
            Spotify URI: <span id="uri">{userData.uri}</span>
          </li>
        </ul>
      </div>
      <div>
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
