import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faXmark, } from '@fortawesome/free-solid-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';

export default function Header({ ...props }) {
    const [searchvalue, setsearchvalue] = useState('');
    const [searchactive, setsearchbox] = useState('clearsearch');
    function toggleclear() {
        setsearchbox('clearsearch')
        setsearchvalue('');
    }
    function setvalue(e) {
        setsearchvalue(e.target.value)
    }

    function activate() {
        setsearchbox('active')
    }
    function deactivate() {
        setsearchbox('clearsearch')
        setsearchvalue('');
    }


    return (<>
        <nav {...props}>

            <FontAwesomeIcon icon={faSpotify} className='spotifylogo' />
            <div className='midbox'>

                <span className='homebox' title='Home'><FontAwesomeIcon icon={faHouse} className='homebtn' /></span>
                <span className='searchbox'>

                    <label htmlFor="searchbox" className="searchbtn" title='Search'  >
                        <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
                    </label>

                    <input id='searchbox' type='text' placeholder='What do you want to play?'
                        value={searchvalue} onChange={setvalue}
                        onFocus={activate} onBlur={deactivate}></input>

                    <button className={searchactive} title='Clear search field' onClick={toggleclear} type='button' >
                        <FontAwesomeIcon icon={faXmark} aria-hidden="true" className='clearbtn' />
                    </button>
                </span>
            </div>

            <span className='signsec'>
                <button className='signupbtn'>Sign up</button>
                <button className='signinbtn'>Log in</button>
            </span>




        </nav>
    </>);
}