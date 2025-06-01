import axios from 'axios';

const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

class TokenManager {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
    this.refreshToken = null;
    this.isRefreshing = false;
    this.refreshSubscribers = [];
  }

  setTokens(accessToken, expiresIn, refreshToken = null) {
    if (!accessToken) {
      console.error('No access token provided to setTokens');
      return;
    }

    this.accessToken = accessToken;
    this.tokenExpiry = Date.now() + (expiresIn * 1000);
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }
  }

  getAccessToken() {
    return this.accessToken;
  }

  isTokenExpired() {
    if (!this.tokenExpiry) return true;
    return Date.now() >= this.tokenExpiry - TOKEN_REFRESH_THRESHOLD;
  }

  async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.refreshSubscribers.push(resolve);
      });
    }

    this.isRefreshing = true;

    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
          client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        }), 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, expires_in } = response.data;
      this.setTokens(access_token, expires_in, this.refreshToken);

      // Notify all subscribers
      this.refreshSubscribers.forEach((resolve) => resolve(access_token));
      this.refreshSubscribers = [];

      return access_token;
    } catch (error) {
      console.error('Error refreshing token:', error.response?.data || error.message);
      this.clearTokens();
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  clearTokens() {
    this.accessToken = null;
    this.tokenExpiry = null;
    this.refreshToken = null;
    this.refreshSubscribers = [];
  }
}

export const tokenManager = new TokenManager(); 