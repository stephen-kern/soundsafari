import React from "react";

const Profile = ({ userData }) => {
  return (
    <div>
      <h1>Welcome {userData.display_name}!</h1>
      <ul>
      <img className="avatar" alt="Profile Avatar" src={userData.images[0].url}></img>
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
  );
};

export default Profile;
