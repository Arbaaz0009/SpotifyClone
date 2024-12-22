import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMagnifyingGlass, faList } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../spotify';
import Playlist from './playlist';
import './Library.css';

export default function Library({ newPlaylist }) {
    const [active, setactive] = useState('clearaddplaylist');
    const [title, settitle] = useState('');
    const [Playlists, setPlaylist] = useState([]);
    let addplaylist = document.getElementById('addplaylist');
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    function deactivate() {
        setactive('clearaddplaylist');
        settitle('');
    }
    function activate() {
        setactive('addplaylist');
    }
    function changetitle() {
        settitle(() => {
            addplaylist.setCustomValidity("")
            return addplaylist.value;
        }
        );
    }
    function getdata(e) {
        if (e.code === 'Enter') {
            if (title) {
                settitle(e.value);
                newPlaylist(title);
                deactivate();
            } else {
                addplaylist.setCustomValidity("Name cannot be empty!");
                addplaylist.reportValidity();
            }
        }
    }


    useEffect(() => {
        console.log('library page loaded');

        

            
                apiClient.get("/me/playlists")
                    .then((response) => {
                        // console.log("this is playlist response:", response);
                        const Playlist_res = response.data.items.map((playlist) => ({
                            id: playlist.id,
                            title: playlist.name,
                            albumimg: playlist.images[0].url,
                            songs: [],
                        }));
                        setPlaylist((prevPlaylist) => {
                            return [...prevPlaylist, Playlist_res];
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });

        

    }, []);
    // console.log(Playlists[0][0].id);
    function handleLogin() {
        navigate('/login')
    }






    return (
        <>
            <section className="library_sec">
                <div className='topcontainer'>
                    <button className='library_btn' title='Collapse Your Library'>
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className="Svg-sc-ytk21e-0 bneLcE"
                        ><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path></svg>
                        <span>Your Library</span>
                    </button>
                    <label htmlFor="addplaylist" className='addbtn' title='Create Playlist or Folder' onClick={activate}>
                        <FontAwesomeIcon icon={faPlus} className='addbtn' />
                    </label>

                </div>
            </section>
            <section className='filter_btn'>
                <button className='btn'>Playlists</button>
                <button className='btn'>Artists</button>
            </section>
            <section className='library_list'>
                <button className='list_search'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <button className='list_recents'>
                    <span>Recents</span>
                    <FontAwesomeIcon icon={faList} />
                </button>
            </section>
            <section id='playlistContainer'>
                {
                    (isAuth)?<Playlist title="Liked Songs" id="LikedSongs"/>:<div className='defaultPlaylist' onClick={handleLogin}> <h1>please Login First</h1> </div>
                }
                {
                    (isAuth) ? Playlists[0]?.map((playlist) => (
                        <Playlist
                            key={playlist.id}
                            id={playlist.id}
                            title={playlist.title}
                            albumimg={playlist.albumimg}
                            isArtist={false} />
                    )) : <div className='defaultPlaylist' onClick={handleLogin}> <h1>please Login First</h1> </div>
                }

            </section>
        </>);

}