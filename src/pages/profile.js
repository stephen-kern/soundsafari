import React from "react";

const Profile = ({ profile }) => {
  return (
    <div>
      <h1>Display your profile data</h1>
      <span id="avatar"></span>
      <ul>
        <li>
          User ID: <span id="id">{profile.id}</span>
        </li>
        <li>
          Email: <span id="email">{profile.email}</span>
        </li>
        <li>
          Spotify URI: <span id="uri">{profile.uri}</span>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
