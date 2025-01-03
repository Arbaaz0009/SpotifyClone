import express from "express";
import crypto from "crypto";
import querystring from "querystring";
import cors from "cors";
import axios from "axios";
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  // Generate a random string using crypto
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, possible.length);
    randomString += possible[randomIndex];
  }

  return randomString;
};

const client_id = "37679ad627494fbcbe1ac60fda0992c6";
const redirect_uri = "http://localhost:5173/callback";
const client_secret = "aa9e9ad4c63749ebb9ea65d8019ed2e8";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend URL
    methods: "GET,POST",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/login", (req, res) => {
  const state = generateRandomString(16); // Generate random state for security
  const scope = "user-read-private user-read-email"; // Define desired scopes

  // Construct Spotify authorization URL
  const spotifyAuthUrl =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    });
  console.log(spotifyAuthUrl);

  // Send the URL to the client
  res.json({ data: spotifyAuthUrl });
});
app.post("/callback", (req, res) => {
  const { code } = req.body; // This should work now if body parsing is set up correctly

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  console.log("Received authorization code:", code);

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
    },
    data: querystring.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }),
  };

  axios
    .post(authOptions.url, authOptions.data, { headers: authOptions.headers })
    .then((response) => {
      console.log("Spotify Response:", response.data);
      const { access_token, refresh_token } = response.data;
      res.json({ access_token, refresh_token });
    })
    .catch((error) => {
      console.error(
        "Error getting tokens:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({ error: "Error exchanging code for token" });
    });
});

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
