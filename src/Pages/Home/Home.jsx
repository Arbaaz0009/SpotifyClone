import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import apiClient from '../../spotify';
import { authAction } from '../../store/Auth';
import { setClientToken, loginEndPoint } from '../../spotify';
import './Home.css';
import Header from '../../components/navbar/Header';
import Library from '../../components/library_sec/Library';
import Playlist from '../../components/library_sec/playlist';
import Card from '../../components/Card/Card';
import PlayBar from '../../components/playbar/PlayBar';
import { setSongAction } from '../../store/setSong';



const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector(state => state.auth.isAuthenticated)

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
    apiClient.get(`playlists/72AikfkRhsmwjfl3RBWecs/tracks`)
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
        dispatch(authAction.logoutUser());
      })
  }, []);

  useEffect(() => {
    // apiClient.get('/me/top/tracks')
    // apiClient.get('/me/following?type=artist')
    apiClient.get('/me/tracks')

      .then((response) => {
        // console.log(response);

      })
      .catch((error) => {
        console.log(error);

      })
  }, []);

  // console.log(songs);

  return (
    <>
      <nav>
        <Header />
      </nav>
      <section id='body'>
        <section className='left_container'>
          <Library />

        </section>
        <section className='mid'></section>
        <section className='right_container'>
          {/* {isAuth && songs?.map(({ name, image, artist }, index) => (
            <Card
              artist={artist}
              isSong
              title={name}
              key={index}
              albmimg={image}

            />
          ))} */}

          <Outlet />
          {!location.pathname.includes("playlist") && (
            <>
              <div className="artist-sec">
                <h1>Artist Section</h1>
              </div>
              <div className="playlist-sec">
                <h1>Playlist Section</h1>
              </div>
            </>
          )}
        </section>
        <PlayBar />
      </section>

    </>
  );
};

export default Home;
