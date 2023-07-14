import React, { useEffect, useState } from "react";
import { loginUrl } from "../utils/spotifyAuth";
import getSpotifyTokenFromUrl from "../utils/spotifyToken";
import fetchProfile from "../utils/fetchProfile";
import Profile from "./profile";

const Main = () => {
  const [access_token, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in } = getSpotifyTokenFromUrl(
        window.location.hash
      );
      console.log({ access_token });
      localStorage.clear();
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expiresIn", expires_in);
      setAccessToken(access_token);
      fetchUserProfile(access_token);
    }
  }, []);

  const fetchUserProfile = async (access_token) => {
    try {
      const response = await fetchProfile(access_token);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("accessToken");
  };

  return (
    <>
      <header>
        {!access_token ? (
          <a href={loginUrl} className="spotify-login-button">
            Spotify Login
          </a>
        ) : (
          <button onSubmit={logout}>Logout</button>
        )}
      </header>
      <div>
        {userData && <Profile userData={userData}/>}
      </div>
    </>
  );
};

export default Main;