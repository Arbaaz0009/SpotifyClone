const authEndPoint = "https://accounts.spotify.com/authorize";
const ClientId = "37679ad627494fbcbe1ac60fda0992c6";
const redirectUri = "http://localhost:5173";
const scopes = [
  "playlist-read-private",
  "user-library-modify",
  "user-library-read",
];

export const loginEndPoint = `${authEndPoint}?client_id=${ClientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;