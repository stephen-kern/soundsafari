
export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "https://soundsafari-music.vercel.app/profile";

const clientId = "bb5ea3354fbd4948ace13353fa10d3a2";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-library-read",
  "user-top-read",
  "user-modify-playback-state",
];

export const loginUrl = `${authEndpoint}?
client_id=${clientId}
&redirect_uri=${redirectUri}
&scope=${scopes.join("%20")}
&response_type=token
&show_dialog=true`;
