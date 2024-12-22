import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import apiClient,{} from '../../spotify';
import { useNavigate } from 'react-router-dom';
// import defaultimg from '/svgs/music.png'

const playlist = ({ title, albumimg, isArtist, id }, key) => {
  let imgLogo = (albumimg === undefined) ? '/svgs/music.png' : albumimg;
  let logo = <span className='logo'><img src={imgLogo} /></span>
  const username = useSelector((state) => state.auth.userName);
  const navigate = useNavigate();

  // console.count("playlist component Loaded");
  
  if (title === 'Liked Songs') {
    logo = <span className='heartlogo'><img src='/svgs/heartimg.png' /></span>
  }
  function showPlaylistId() {
    console.log('Playlist Id: ', id);
    navigate(`/playlist`,{
      state:{
        id:id,  
        title:title,
        albumimg:albumimg,
        
      },
    })
  }
  useEffect(() => {
    try {
      apiClient.get('me/tracks')
        .then((response) => {
          // console.log("this is tracks", response);
        })
    } catch (Error) {
      console.log(Error);

    } 
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
