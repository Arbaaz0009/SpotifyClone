import { useState, useEffect, startTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import apiClient from '../../spotify';
import { authAction } from '../../store/Auth';
import { setClientToken, loginEndPoint } from '../../spotify';
import './Home.css';
import Header from '../../components/navbar/Header';
import Library from '../../components/library_sec/Library';
import Card from '../../components/artists_Card/Card';
import PlayBar from '../../components/playbar/PlayBar.jsx';
import Loading from '../Loading/Loading';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [isloading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  let isplaylist = !location.pathname.includes("playlist");
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const [artist, setArtist] = useState([]);
  const [artistTopAlbum, setArtistTopAlbum] = useState([]);
  const userName = useSelector((state) => state.auth.userName);
  const [globalImg, setGlobalImg] = useState('');
  const [indiaImg, setIndiaImg] = useState('');
  const [trendingImg, setTrendingImg] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      try {
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get('access_token');
        const expiresIn = parseInt(params.get('expires_in')) || 3600;
        const refreshToken = params.get('refresh_token');

        if (!token) {
          throw new Error('No access token found in URL');
        }

        window.location.hash = "";
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("tokenExpiry", expiresIn.toString());
        if (refreshToken) {
          window.localStorage.setItem("refreshToken", refreshToken);
        }

        dispatch(authAction.registerUser({
          token,
          expiresIn,
          refreshToken
        }));
        setClientToken(token, expiresIn);
      } catch (error) {
        console.error('Error processing auth hash:', error);
        navigate('/login');
      }
    } else {
      const storedToken = window.localStorage.getItem("token");
      const storedExpiry = window.localStorage.getItem("tokenExpiry");
      const storedRefreshToken = window.localStorage.getItem("refreshToken");

      if (storedToken) {
        setClientToken(storedToken, parseInt(storedExpiry) || 3600);
        dispatch(authAction.registerUser({
          token: storedToken,
          expiresIn: parseInt(storedExpiry) || 3600,
          refreshToken: storedRefreshToken
        }));
      } else {
        navigate('/login');
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch artist data
        const artistResponse = await apiClient.get('/me/following?type=artist');
        const fetchedArtists = artistResponse.data.artists.items.map(item => ({
          id: item.id,
          name: item.name,
          image: item.images[0]?.url || 'default-image-url',
        }));

        // Fetch global playlist image
        const globalResponse = await apiClient.get('/playlists/5FN6Ego7eLX6zHuCMovIR2');
        const globalImg = globalResponse.data.images[0].url;

        // Fetch India playlist image
        const indiaResponse = await apiClient.get('/playlists/3bDJLJzvUBxBV4C7mezz6p');
        const indiaImg = indiaResponse.data.images[0]?.url;

        // Fetch Trending playlist image
        const trendingResponse = await apiClient.get('/playlists/4JZFUSM0jb3RauYuRPIUp8');
        const trendingImg = trendingResponse.data.images[0]?.url;

        // Fetch artist top albums
        const albumPromises = fetchedArtists.map(artist =>
          apiClient.get(`/artists/${artist.id}/albums`)
            .then(albumResponse => {
              const firstAlbum = albumResponse.data.items[0];
              return {
                id: firstAlbum.id,
                name: firstAlbum.name,
                image: firstAlbum.images[0]?.url || 'No Image Available',
                artist: artist.name,
              };
            })
        );

        const albums = await Promise.all(albumPromises);

        startTransition(() => {
          setArtist(fetchedArtists);
          setGlobalImg(globalImg);
          setIndiaImg(indiaImg);
          setTrendingImg(trendingImg);
          setArtistTopAlbum(albums);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  if (isloading) {
    return (<Loading />);
  }

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
                  ))}
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
                      isalbum={true}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </section>
      <PlayBar />
    </>
  );
};

export default Home;
