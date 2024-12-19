import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../spotify';
import { authAction } from '../../store/Auth';
import Card from '../Card/Card'
import './index.css'
const playlist = () => {
  const location = useLocation();
  let { id, albumimg, title, isartist } = location.state || {};
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const img = useSelector(state => state.auth.img);
  const username = useSelector((state) => state.auth.userName);
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!isAuth) {
    navigate('/')
  }


  console.log(id);

  useEffect(() => {
    if (id === 'LikedSongs') {
      apiClient.get('me/tracks')
        .then((response) => {
          // console.log("this is playlist", response.data.items);

          const playlistRes = response.data.items.map((item) => ({
            name: item.track.name,
            image: item.track.album.images[0].url,
            artist: item.track.artists[0].name,
            id: item.track.id,
          }));
          setSongs(playlistRes);
        })
        .catch((error) => {
          console.log(error);

        })
    }else if(title === 'Top 50 Global' || title === 'Top 50 Hindi Songs 2024' || title === '2024 Trending Songs'){
      apiClient.get(`/playlists/${id}/tracks`)
        .then((response) => {
        // console.log("this is global50:",response);
        const playlistRes = response.data.items.map((item) => ({
          name: item.track.name,
          image: item.track.album.images[0].url,
          artist: item.track.artists[0].name,
          id: item.track.id,
        }));
        setSongs(playlistRes);
      })
    }
     else if (isartist && title != 'Top 50 Global') {
      // apiClient.get(`/artists/7vk5e3vY1uw9plTHJAMwjN/top-tracks`)
      apiClient.get(`/artists/${id}/top-tracks?market=US`)
        .then((response) => {
          // console.log("this is playlist", response);

          const playlistRes = response.data.tracks.map((item) => ({
            name: item.name,
            image: item.album.images[0].url,
            artist: item.artists[0].name,
            id: item.id,
          }));
          setSongs(playlistRes);
        })
        .catch((error) => {
          console.log(error);

        })

    } else {


      apiClient.get(`playlists/${id}/tracks`)
        .then((response) => {
          // console.log("this is playlist", response.data.items);

          const playlistRes = response.data.items.map((item) => ({
            name: item.track.name,
            image: item.track.album.images[0].url,
            artist: item.track.artists[0].name,
            id: item.track.id,
          }));
          setSongs(playlistRes);
        })
        .catch((error) => {
          console.log(error);

        })
    }
  }, [id]);

  console.log(albumimg);

  return (<>
    <div className='playlist-header'>
      {
        (id == 'LikedSongs') ? <span className='heartlogo albmimg'><img src='/svgs/heartimg.png' /></span> : <img src={albumimg} alt="albumimg" draggable={false} className='albmimg' />
      }


      <div className='header-data'>
        <h3>Playlist</h3>
        <h1>{title}</h1>
        <h3 style={{ color: 'white' }}><img src={img} draggable='false'></img>{username}</h3>
      </div>

    </div>
    <div className="song-container">    {isAuth && songs?.map(({ name, image, artist }, index) => (
      <Card
        artist={artist}
        isSong
        title={name}
        key={index}
        albmimg={image}
        isartist={!isartist}
      />
    ))}
    </div>

  </>
  )
}

export default playlist
