import { useState, useEffect, useRef } from 'react';
import '../App.css'
import Header from '../components/Header';
import Library from '../components/Library';
import Playlist from '../components/playlist';
import Card from '../components/thumnailCard'
import { songs, artistSongs } from '../songsData'
import PlayBar from '../components/PlayBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authAction } from '../store/Auth';
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log('home page loaded');
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash).get('#access_token');
      dispatch(authAction.registerUser(token));
      navigate('/');
    }
  }, []);
  const [setPlaylist, addPlaylist] = useState([
    {
      isArtist: false,
      title: "liked Songs",
      albumimg: '/svgs/heartimg.png',
    },

  ]);
  const [currentSong, setCurrentSong] = useState(null);

  const handleCardClick = (song) => {
    console.log(song);
    setCurrentSong(song);
  };

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
        {
          songs.map((data, index) => (
            <Card
              isArtist
              isSong
              title={data.name}
              key={index}
              albmimg={data.image}
              onClick={() => handleCardClick(data)}
            />
          ))
        }
      </section>
      <PlayBar />
    </section>
    {currentSong && (
      <audio controls autoPlay>
        <source src={currentSong.source} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    )}
  </>);
}

export default Home
