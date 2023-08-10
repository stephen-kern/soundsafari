import React, { useEffect, useState } from "react";
import { loginUrl } from "../utils/spotifyAuth";
import { tokenRequest } from "../utils/AuthFlow";
import getSpotifyTokenFromUrl from "../utils/spotifyToken";
import fetchAllData from "../utils/fetchAllData";
import Profile from "./profile";
import Hero from "../components/Hero/hero";
import LoadingScreen from "../components/Loading/loading";

const Main = () => {
  const [access_token, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [recentData, setRecentData] = useState(null);
  const [relatedData, setRelatedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in } = getSpotifyTokenFromUrl(
        window.location.hash
      );
      localStorage.clear();
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expiresIn", expires_in);
      setAccessToken(access_token);

      setIsLoading(true);

      fetchAllData(access_token)
        .then((data) => {
          if (data) {
            setUserData(data.profileData);
            setRecentData(data.recentData);
            setRelatedData(data.relatedData);
          }
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("expiresIn");
    setAccessToken(null);
    setUserData(null);

    // Reset the browser URL to the home route
    window.location.replace("https://soundsafari-music.vercel.app");
  };

  return (
    <>
      <header>
        <h1 className="logo">Sound Safari</h1>
        {!access_token ? (
          <a href={tokenRequest()} className="login-button">
            Login
          </a>
        ) : (
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        )}
      </header>
      <div>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {!userData && <Hero />}
            {userData && (
              <Profile
                userData={userData}
                accessToken={access_token}
                recentData={recentData}
                relatedData={relatedData}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Main;
