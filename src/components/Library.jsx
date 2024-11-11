import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMagnifyingGlass, faList } from '@fortawesome/free-solid-svg-icons'
import { useState ,createPortal} from 'react';


export default function Library({ newPlaylist, ...props }) {
    const [active, setactive] = useState('clearaddplaylist');
    const [title, settitle] = useState('');
    let addplaylist = document.getElementById('addplaylist');

    
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
                    <FontAwesomeIcon icon={faPlus} className='addbtn'/>
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
    </>);

}