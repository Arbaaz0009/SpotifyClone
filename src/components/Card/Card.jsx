import React, { useState } from 'react';
import './Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSongAction } from '../../store/setSong';

const thumnail_card = ({ albmimg, artist, title, id, isartist, uri, isAwailable }) => {
  const dispatch = useDispatch();
  const [ishovered, setIsHovered] = useState(false);
  const username = useSelector(state => state.auth.userName);
  const navigate = useNavigate();

  
  function updateSong() {
    console.log("clicked");
    console.log(albmimg, artist, title, id, isartist, uri, isAwailable );
    if (isAwailable) {
      console.log("uri is :", uri);
      dispatch(setSongAction.updateSong({ id: id, artist: artist, title: title, img: albmimg, uri: uri }));
    } else {
      alert(`This song is not available for playback in this app. Please open the Spotify app to listen to ${title} by ${artist}`);
    }
  }

  return (
    <div className={`card`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={updateSong}
    >
      <img src={albmimg} draggable={false} className='cardlogo' alt="cardlogo" />
      <span className='titlebox'>
        {(title) ? <p className='title'>{title}</p> : <p className='title'>Playlist</p>}
      </span>
      <img draggable={false} className={`playbtn ${ishovered ? 'show' : ''}`} src='/svgs/playbtn.png' alt="" />
    </div>
  )
}

export default thumnail_card;