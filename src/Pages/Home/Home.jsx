import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../spotify';
import { authAction } from '../../store/Auth';
import { setClientToken } from '../../spotify';
import './Home.css';
import Header from '../../components/navbar/Header';
import Library from '../../components/library_sec/Library';
import Playlist from '../../components/library_sec/playlist';
import Card from '../../components/Card/Card';
import { songs, artistSongs } from '../../songsData';
import PlayBar from '../../components/playbar/PlayBar';




const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


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
          {songs.map((data, index) => (
            <Card
              isArtist
              isSong
              title={data.name}
              key={index}
              albmimg={data.image}

            />
          ))}
        </section>
        <PlayBar />
      </section>
    </>
  );
};

export default Home;
