// PROOF KEY FOR CODE EXCHANGE
// PKCE Code flow authorization for spotify
import axios from "axios";

// starts with a code verifier

function generateRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Once the code verifier has been generated, we must transform (hash) it using the SHA256 algorithm.
async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

// request user authorization
const clientId = "bb5ea3354fbd4948ace13353fa10d3a2";
const redirectUri = "http://localhost:3000";

// generate random code verifier
let codeVerifier = generateRandomString(128);

// generate the code challenge using the code verifier
generateCodeChallenge(codeVerifier).then((codeChallenge) => {
  let state = generateRandomString(16);
  let scope =
    "user-read-private user-read-email user-read-recently-played user-library-read user-top-read";

  // store the code verifier in local storage
  localStorage.setItem("code_verifier", codeVerifier);

  // Construct the authorization URL
  let args = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  // redirect user to spotify authorization endpoint
  window.location = "https://accounts.spotify.com/authorize?" + args;
});

export async function tokenRequest() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");

  let codeVerifier = localStorage.getItem("code_verifier");

  let body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier,
  });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      body.toString(), // Convert the body to a string
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }

    const data = response.data;
    localStorage.setItem("access_token", data.access_token);
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
