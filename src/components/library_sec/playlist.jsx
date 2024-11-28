import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import apiClient from '../../spotify';
// import defaultimg from '/svgs/music.png'

const playlist = ({ title, albumimg, isArtist, id }, key) => {
  let imgLogo = (albumimg === undefined) ? '/svgs/music.png' : albumimg;
  let logo = <span className='logo'><img src={imgLogo} /></span>
  const username = useSelector((state) => state.auth.userName);

  if (title === 'liked Songs') {
    logo = <span className='heartlogo'><img src={imgLogo} /></span>
  }
  function showPlaylistId() {
    console.log('Playlist Id: ', id);
  }
  useEffect(() => {
    apiClient.get('me/tracks')
      .then((response) => {
        console.log("this is tracks response:", response);

      })

  }, []);

  return (
    <li id='playlist' key={key} onClick={showPlaylistId}>
      {logo}
      <span className='title'>
        {(title) ? <p>{title}</p> : <p>Playlist</p>}
        {(isArtist) ? <p>Artist</p> : <p>Playlist &#x22C5; {username}</p>}
      </span>
    </li>
  )
}

export default playlist