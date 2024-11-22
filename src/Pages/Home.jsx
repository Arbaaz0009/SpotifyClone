import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiClient from '../spotify';
import { authAction } from '../store/Auth';
import { setClientToken } from '../spotify';
import '../App.css';
import Header from '../components/Header';
import Library from '../components/Library';
import Playlist from '../components/playlist';
import Card from '../components/thumnailCard';
import { songs, artistSongs } from '../songsData';
import PlayBar from '../components/PlayBar';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state_token = useSelector((state) => state.auth.token);
  const [setPlaylist, addPlaylist] = useState([
    {
      isArtist: false,
      title: "liked Songs",
      albumimg: '/svgs/heartimg.png',
    },
  ]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    console.log('home page loaded');
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token');
      if (token) {
        dispatch(authAction.registerUser(token));
        window.localStorage.setItem('token', token);
        setClientToken(token);
        navigate('/');
      }
    } else {
      const storedToken = window.localStorage.getItem('token');
      if (storedToken) {
        setClientToken(storedToken);
        dispatch(authAction.registerUser(storedToken));
      } else {
        navigate('/login');
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (state_token) {
      apiClient.get("/me").then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      });
    }
  }, [state_token, navigate]);

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

  return (
    <>
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
        <section className='mid'></section>
        <section className='right_container'>
          {songs.map((data, index) => (
            <Card
              isArtist
              isSong
              title={data.name}
              key={index}
              albmimg={data.image}
              onClick={() => handleCardClick(data)}
            />
          ))}
        </section>
      </section>
      <PlayBar />
    </>
  );
};

export default Home;
