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
import Card from '../../components/artists_Card/Card';
import PlayBar from '../../components/playbar/PlayBar';
import { setSongAction } from '../../store/setSong';



const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  let isplaylist = !location.pathname.includes("playlist");
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const [artist, setArtist] = useState([]);
  const userName = useSelector((state) => state.auth.userName);

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
    // apiClient.get('/me/top/tracks')
    apiClient.get('/me/following?type=artist')
      // apiClient.get('/me/tracks')

      .then((response) => {
        // console.log(response);
        const Artist = response.data.artists.items.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.images[0].url
        }))
        setArtist(Artist);
        // console.log("this is artists", Artist);

      })
      .catch((error) => {
        console.log(error);

      })
  }, []);

  useEffect(() => {
    // apiClient.get('/me/top/tracks')
    // apiClient.get('/me/following?type=artist')
      apiClient.get('/artists/6eUKZXaKkcviH0Ku9w2n3V/top-tracks?market=US')

      .then((response) => {
        // console.log(response);

      })
      .catch((error) => {
        console.log(error);

      })
  }, []);

  console.log(artist);

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


          <Outlet />
          {isplaylist && (
            <>
              <div className="artist-sec">
                <h1>Your Favorite Artists </h1>
                <div className='items'>

                  {artist.map((artist) => (
                    <Card
                      key={artist.id}
                      title={artist.name}
                      albmimg={artist.image}
                      id={artist.id}
                      isartist={true}
                    />
                  ))
                }
                
                </div>
              </div>
              <div className="playlist-sec">
                <h1>Made For {userName}</h1>
                <Card
                title="US Top 50"
                albmimg={artist.image}
                id={artist.id}
                isartist={true}/>
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
