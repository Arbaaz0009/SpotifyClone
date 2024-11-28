import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMagnifyingGlass, faList } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiClient from '../spotify';
import Playlist from './playlist';

export default function Library({ newPlaylist, ...props }) {
    const [active, setactive] = useState('clearaddplaylist');
    const [title, settitle] = useState('');
    const [Playlists, setPlaylist] = useState([]);
    let addplaylist = document.getElementById('addplaylist');
    const state_token = useSelector((state) => state.auth.token);
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

        if (state_token) {
            apiClient.get("/me/playlists")
                .then((response) => {
                    console.log("this is playlist response:", response);
                    let Playlist_res = response.data.items.map((playlist) => ({
                        id: playlist.id,
                        title: playlist.name,
                        albumimg: playlist.images[0].url,
                        songs: [],
                    }));
                    setPlaylist((prevPlaylist) => {
                        return [...prevPlaylist, Playlist_res];
                    });
                })
            // .catch((error) => {
            //     console.error("Error fetching user data:", error);
            //     if (error.response && error.response.status === 401) {
            //         navigate("/login");
            //     }
            // });
        }

    }, []);
    // console.log(Playlists[0][0].id);





    let playlist = <input className={active} value={title} id='addplaylist' minLength="1" placeholder='Enter a Playlist Name' onBlur={deactivate} onKeyDown={getdata} onChange={changetitle}></input>


    return (<>
        <section {...props}>
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
                Playlists[0]?.map((playlist) => (
                    <Playlist
                        key={playlist.id}
                        id={playlist.id}
                        title={playlist.title}
                        albumimg={playlist.albumimg}
                        isArtist={false} />
                ))
            }

        </section>
    </>);

}