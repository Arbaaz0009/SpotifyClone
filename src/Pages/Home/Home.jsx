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
  const [artistTopAlbum, setArtistTopAlbum] = useState([]);
  const userName = useSelector((state) => state.auth.userName);
  const playlistId = '37i9dQZEVXbMDoHDwVN2tF';
  const [globalImg, setGlobalImg] = useState('');
  const [indiaImg, setIndiaImg] = useState('');
  const [trendingImg, setTrendingImg] = useState('');
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
    apiClient.get(`/playlists/5FN6Ego7eLX6zHuCMovIR2`)

      .then((response) => {
        // console.log(response);
        const Img = response.data.images[0].url;
        setGlobalImg(Img);
      })
      .catch((error) => {
        console.log(error);

      })
  }, []);

  useEffect(() => {

    apiClient.get(`/playlists/3bDJLJzvUBxBV4C7mezz6p`)

      .then((response) => {
        // console.log("this is top india:",response);
        const Img = response.data.images[0].url;
        setIndiaImg(Img);
      })
      .catch((error) => {
        console.log(error);

      })
  }, []);
  useEffect(() => {
    apiClient.get(`/playlists/4JZFUSM0jb3RauYuRPIUp8`)

      .then((response) => {
        // console.log("this is Trending songs:", response);
        const Img = response.data.images[0].url;
        setTrendingImg(Img);
      })
      .catch((error) => {
        console.log(error);

      })
  }, []);

  useEffect(() => {
    async function fetchArtistTopAlbums() {
      try {
        const albumPromises = artist.map(async (artist) => {
          const response = await apiClient.get(`/artists/${artist.id}/albums`);
          const firstAlbum = response.data.items[0];

          if (firstAlbum) {
            return {
              id: firstAlbum.id,
              name: firstAlbum.name,
              image: firstAlbum.images[0]?.url || 'No Image Available',
              artist: artist.name,
            };
          }
          return null; // Handle cases where no albums are available
        });

        // Resolve all promises
        const albums = (await Promise.all(albumPromises)).filter(Boolean);

        // Update state
        setArtistTopAlbum((prevAlbums) => [...prevAlbums, ...albums]);
      } catch (error) {
        console.error('Error fetching artist albums:', error);
      }
    }

    fetchArtistTopAlbums();
  },[artist])


  // console.log(artistTopAlbum);


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
                <div className='items'>
                  <Card
                    title={"Top 50 Global"}
                    albmimg={globalImg}
                    isartist={true}
                    id="5FN6Ego7eLX6zHuCMovIR2"
                  />
                  <Card
                    title={"Top 50 Hindi Songs 2024"}
                    albmimg={indiaImg}
                    isartist={true}
                    id="3bDJLJzvUBxBV4C7mezz6p"
                  />
                  <Card
                    title={"2024 Trending Songs"}
                    albmimg={trendingImg}
                    isartist={true}
                    id="4JZFUSM0jb3RauYuRPIUp8"
                  />

                </div>
              </div>
              <div className="playlist-sec">
                <h1>Top Playlists Of Artists</h1>
                <div className='items'>
                  {artistTopAlbum?.map((artist) => (
                    <Card
                      key={artist.id}
                      title={artist.name}
                      albmimg={artist.image}
                      id={artist.id}
                      isartist={true}
                      artist={artist.artist}
                    />
                  ))
                  }

                </div>
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
