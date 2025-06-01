import axios from "axios";
import { tokenManager } from "./utils/tokenManager";

const authEndPoint = "https://accounts.spotify.com/authorize";
const ClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const redirectUri = import.meta.env.VITE_REDIRECT_URI;
const redirectUri = "http://localhost:5173";
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify"
];

export const loginEndPoint = `${authEndPoint}?client_id=${ClientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token, expiresIn) => {
  if (!token) {
    console.error('No token provided to setClientToken');
    return;
  }

  // Remove any existing interceptors
  apiClient.interceptors.request.handlers = [];
  apiClient.interceptors.response.handlers = [];

  // Set the token in tokenManager
  tokenManager.setTokens(token, expiresIn);

  // Add request interceptor
  apiClient.interceptors.request.use(async function (config) {
    try {
      if (tokenManager.isTokenExpired()) {
        const newToken = await tokenManager.refreshAccessToken();
        config.headers.Authorization = `Bearer ${newToken}`;
      } else {
        const currentToken = tokenManager.getAccessToken();
        config.headers.Authorization = `Bearer ${currentToken}`;
      }
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      window.location.href = loginEndPoint;
      return Promise.reject(error);
    }
  });

  // Add response interceptor
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          const newToken = await tokenManager.refreshAccessToken();
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(error.config);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          window.location.href = loginEndPoint;
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default apiClient;
