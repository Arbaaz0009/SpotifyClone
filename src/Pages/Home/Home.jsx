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
import PlayBar from '../../components/playbar/PlayBar';
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
    console.log("Home page loaded");
    const hash = window.location.hash;
    console.log("This is hash:", hash);

    if (hash) {
      // Extract `access_token` and `expires_in` from the URL hash
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      const expiresIn = params.get("expires_in"); // Get `expires_in` value

      if (token && expiresIn) {
        // Calculate token expiration time
        const expirationTime = Date.now() + parseInt(expiresIn, 10) * 1000;

        // Store token and expiration time in localStorage
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("tokenExpiration", expirationTime.toString());

        // Dispatch token to state and set the client
        dispatch(authAction.registerUser(token));
        setClientToken(token);

        // Navigate to the home page
        navigate("/");
      }
    } else {
      // Handle stored token retrieval
      const storedToken = window.localStorage.getItem("token");
      const storedExpiration = window.localStorage.getItem("tokenExpiration");

      if (storedToken && storedExpiration && Date.now() < parseInt(storedExpiration, 10)) {
        // Token is still valid
        setClientToken(storedToken);
        dispatch(authAction.registerUser(storedToken));
      } else {
        // Token is missing or expired
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);




  useEffect(() => {
    if (token) {
      // Fetch artist data
      apiClient.get('/me/following?type=artist')
        .then(artistResponse => {
          const fetchedArtists = artistResponse.data.artists.items.map(item => ({
            id: item.id,
            name: item.name,
            image: item.images[0]?.url || 'default-image-url',
          }));

          // Fetch global playlist image
          return apiClient.get('/playlists/5FN6Ego7eLX6zHuCMovIR2')
            .then(playlistResponse => {
              const globalImg = playlistResponse.data.images[0].url;

              // Fetch India playlist image
              return apiClient.get('/playlists/3bDJLJzvUBxBV4C7mezz6p')
                .then(indiaPlaylistResponse => {
                  const indiaImg = indiaPlaylistResponse.data.images[0]?.url;

                  // Fetch Trending playlist image
                  return apiClient.get('/playlists/4JZFUSM0jb3RauYuRPIUp8')
                    .then(trendingPlaylistResponse => {
                      const trendingImg = trendingPlaylistResponse.data.images[0]?.url;

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

                      // Wait for all albums to be fetched
                      return Promise.all(albumPromises)
                        .then(albums => {
                          startTransition(() => {
                            setArtist(fetchedArtists);
                            setGlobalImg(globalImg);
                            setIndiaImg(indiaImg);
                            setTrendingImg(trendingImg);
                            setArtistTopAlbum(albums);
                          });
                        });
                    });
                });
            });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setIsLoading(false); // Data fetching is complete, so stop showing loading
        });
    }
  }, [token]); // This will trigger the effect when the token is available





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
                      isalbum={true}
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
