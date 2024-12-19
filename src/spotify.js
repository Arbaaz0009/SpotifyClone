import axios from "axios";
const authEndPoint = "https://accounts.spotify.com/authorize";
const ClientId = "37679ad627494fbcbe1ac60fda0992c6";
const redirectUri = "https://spotify-clone-99wilbua2-arbaz-ansaris-projects.vercel.app";
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
