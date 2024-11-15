import { useState, useEffect, useRef } from 'react';
import '../App.css'
import Header from '../components/Header';
import Library from '../components/Library';
import Playlist from '../components/playlist';
import Card from '../components/thumnailCard'
import { songs, artistSongs } from '../songsData'
import PlayBar from '../components/PlayBar';


function Home() {
  const [setPlaylist, addPlaylist] = useState([
    {
      isArtist: false,
      title: "liked Songs",
      albumimg: '/svgs/heartimg.png',
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
        {/* {uniqueSongs.map((data, index) => {
          return <Card isArtist albmimg={data.albumimg} title={data.artist} key={index} />;
        })} */}
        {
          songs.map((data, index) => {
            return <Card isArtist isSong title={data.name} key={index} albmimg={data.image}/>;
          })
        }
      </section>
      <PlayBar/>
    </section>
  </>);
}

export default Home
