import axios from "axios";
const authEndPoint = "https://accounts.spotify.com/authorize";
const ClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const redirectUri = import.meta.env.VITE_REDIRECT_URI;
const redirectUri = "http://localhost:5173";
const scopes = [
  "playlist-read-private",
  "user-library-modify",
  "user-library-read",
  "user-read-email",
  "user-read-playback-state",
  "user-read-recently-played",
  "user-top-read",
  "user-follow-read",
  "user-follow-modify",
  'streaming',
  'user-modify-playback-state',
  'user-read-currently-playing'
];

export const loginEndPoint = `${authEndPoint}?client_id=${ClientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
export default apiClient;
