import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../spotify';
import Loading from '../Loading/Loading';
import Card from '../../components/Card/Card';
import './index.css';

const Playlist = () => {
  const location = useLocation();
  let { id, albumimg, title, isartist, isalbum } = location.state || {};
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const img = useSelector(state => state.auth.img);
  const username = useSelector((state) => state.auth.userName);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Redirect to login page if the user is not authenticated
  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  function showPlaylist() {
    return songs?.map(({ name, image, artist ,uri,isAwailable}, index) => (
      <Card
        artist={artist}
        isSong
        title={name}
        key={index}
        albmimg={image}
        isartist={!isartist}
        uri={uri}
        isAwailable={isAwailable}
      />
    ));
  }

  useEffect(() => {
    // Start loading when fetching starts
    setIsLoading(true);

    const fetchData = async () => {
      try {
        let playlistRes = [];
        if (isalbum) {
          const response = await apiClient.get(`/albums/${id}/tracks`);
          console.log(response);
          playlistRes = response.data.items.map((item) => ({
            name: item.name,
            image: '/svgs/music.png',
            artist: item.artists[0].name,
            id: item.id,
            uri: item.uri,
            isAwailable: (item.available_markets.length > 0) ? true : false,
          }));

        }
        else if (id === 'LikedSongs') {
          const response = await apiClient.get('me/tracks');
          console.log(response);
          playlistRes = response.data.items.map((item) => ({
            name: item.track.name,
            image: item.track.album.images[0].url,
            artist: item.track.artists[0].name,
            id: item.track.id,
            uri: item.track.uri,
            isAwailable: (item.track.available_markets.length > 0) ? true : false,
          }));
        } else if (title === 'Top 50 Global' || title === 'Top 50 Hindi Songs 2024' || title === '2024 Trending Songs') {
          const response = await apiClient.get(`/playlists/${id}/tracks`);
          console.log(response);
          playlistRes = response.data.items.map((item) => ({
            name: item.track.name,
            image: item.track.album.images[0].url,
            artist: item.track.artists[0].name,
            id: item.track.id,
            uri: item.track.uri,
            isAwailable: (item.track.available_markets.length > 0) ? true : false,
          }));
        } else if (isartist && !isalbum) {
          const response = await apiClient.get(`/artists/${id}/top-tracks?market=US`);
          console.log(response);
          playlistRes = response.data.tracks.map((item) => ({
            name: item.name,
            image: item.album.images[0].url,
            artist: item.artists[0].name,
            id: item.id,
            uri: item.uri,
            isAwailable: item.is_playable,
          }));
        } else {
          const response = await apiClient.get(`playlists/${id}/tracks`);
          // console.log(response);
          
          playlistRes = response.data.items.map((item) => ({
            name: item.track.name,
            image: item.track.album.images[0].url,
            artist: item.track.artists[0].name,
            id: item.track.id,
            uri:item.track.uri,
            isAwailable: (item.track.available_markets.length > 0) ? true : false,
          }));
        }

        setSongs(playlistRes);
        setIsLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching playlist data:', error);
        setIsLoading(false); // Stop loading in case of error
      }
    };

    fetchData(); // Fetch data when the component mounts or when `id` changes
  }, [id, title, isartist]);

  return (
    <>
      <div className="playlist-header">
        {id === 'LikedSongs' ? (
          <span className="heartlogo albmimg">
            <img src="/svgs/heartimg.png" />
          </span>
        ) : (
          <img src={albumimg} alt="albumimg" draggable={false} className="albmimg" />
        )}

        <div className="header-data">
          <h3>Playlist</h3>
          <h1>{title}</h1>
          <h3 style={{ color: 'white' }} className="username">
            <img src={img} draggable="false" />
            {username}
          </h3>
        </div>
      </div>
      <div className={(isLoading) ? "loading" : "song-container"}>
        {!isLoading ? showPlaylist() : <Loading />}
      </div>
    </>
  );
};

export default Playlist;
