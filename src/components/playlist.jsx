import React from 'react'
import defaultimg from '../assets/svgs/music.png'

const playlist = ({ title, albumimg, isArtist },key) => {
  let imgLogo = (albumimg === undefined) ?defaultimg:albumimg;
  let logo =<span className='logo'><img src={imgLogo} /></span>
 
    
 if(title === 'liked Songs'){
   logo =<span className='heartlogo'><img src={imgLogo} /></span>
 }

   
  return (
    <li id='playlist' key={key}>
      {logo}
      <span className='title'>
        {(title) ? <p>{title}</p> : <p>Playlist</p>}
        {(isArtist) ? <p>Artist</p> : <p>Playlist &#x22C5; Arbaz Ansari</p>}
      </span>
    </li>
  )
}

export default playlist
