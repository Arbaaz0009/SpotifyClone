import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authAction } from '../../store/Auth';// Adjust based on your file structure
import { setClientToken } from '../../spotify';
import React from 'react';
const refreshSpotifyToken = async (refreshToken) => {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID);
    params.append('client_secret', process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);

    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data; // Contains new access token and possibly new refresh token
  } catch (error) {
    console.error('Failed to refresh Spotify token:', error);
    return null;
  }
};

const useSpotifyAuthHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Home page loaded');
    const hash = window.location.hash;

    const handleSpotifyAuthToken = async () => {
      if (hash) {
        const accessToken = new URLSearchParams(hash.substring(1)).get('access_token');
        const refreshToken = new URLSearchParams(hash.substring(1)).get('refresh_token');
        if (accessToken) {
          dispatch(authAction.registerUser(accessToken));
          window.localStorage.setItem('spotify_access_token', accessToken);
          if (refreshToken) {
            window.localStorage.setItem('spotify_refresh_token', refreshToken);
          }
          navigate('/');
          return;
        }
      }

      const storedAccessToken = window.localStorage.getItem('spotify_access_token');
      const storedRefreshToken = window.localStorage.getItem('spotify_refresh_token');

      if (storedAccessToken) {
        // Spotify tokens are short-lived; no direct check for validity
        setClientToken(storedAccessToken); // Set token in your API client
        dispatch(authAction.registerUser(storedAccessToken));
      } else if (storedRefreshToken) {
        const refreshedTokenData = await refreshSpotifyToken(storedRefreshToken);
        if (refreshedTokenData?.access_token) {
          const newAccessToken = refreshedTokenData.access_token;
          window.localStorage.setItem('spotify_access_token', newAccessToken);
          if (refreshedTokenData.refresh_token) {
            window.localStorage.setItem('spotify_refresh_token', refreshedTokenData.refresh_token);
          }
          setClientToken(newAccessToken);
          dispatch(authAction.registerUser(newAccessToken));
        } else {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleSpotifyAuthToken();
  }, [dispatch, navigate]);
};

export default useSpotifyAuthHandler;
