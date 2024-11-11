import { useState, useEffect, useRef } from 'react';
import './App.css'
import Header from './components/Header';
import Library from './components/Library';
import Playlist from './components/playlist';
import heartimg from './assets/svgs/heartimg.png'
import Card from './components/thumnailCard'
import { songs, artistSongs } from './songsData'
import Eminem from './assets/artistImg/Alex & Sierra.jpg'

function App() {
  const [setPlaylist, addPlaylist] = useState([
    {
      isArtist: false,
      title: "liked Songs",
      albumimg: heartimg,
    },

  ]);
  function createPlaylist(title) {
    addPlaylist((prevPlaylist) => {
      const nextPlalist = [
        ...prevPlaylist,
        {
          isArtist: false,
          title: title,
          albumimg: undefined,
        }
      ];
      return nextPlalist;
    });
  }
  const seenArtists = new Set();
  const uniqueSongs = artistSongs.filter(item => {
    if (!seenArtists.has(item.artist)) {
      seenArtists.add(item.artist);
      return true;
    }
    return false;
  });

  console.log(Eminem);


  return (<>

    <nav>
      <Header className="navbar" />
    </nav>
    <section id='body'>
      <section className='left_container'>
        <Library className="library_sec" newPlaylist={createPlaylist} />
        <section id='playlistContainer'>
          {setPlaylist.map(({ isArtist, title, albumimg }) =>
            <Playlist isArtist={isArtist} title={title} albumimg={albumimg} key={title} />
          )}
        </section>
      </section>
      <section className='mid' ></section>
      <section className='right_container'>

        {uniqueSongs.map((data, index) => {
          console.log(data.albumimg);
          
          return <Card isArtist albmimg={data.albumimg} title={data.artist} key={index} />;
        })}
  
       

      </section>
    </section>







  </>);
}

export default App
