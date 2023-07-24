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
    window.localStorage.removeItem("accessToken", access_token);
    setAccessToken(null);
    setUserData(null);
  };

  return (
    <>
      <header>
        <h1 className="logo">Sound Safari</h1>
        {!access_token ? (
          <a href={loginUrl} className="login-button">
            Login
          </a>
        ) : (
          <button className="logout-button" onClick={logout}>Logout</button>
        )}
      </header>
      <div>
        {userData && <Profile userData={userData} accessToken={access_token}/>}
      </div>
    </>
  );
};

export default Main;
