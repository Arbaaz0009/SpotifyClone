import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faXmark, } from '@fortawesome/free-solid-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import  Profile from '../profile/profile';
import './header.css';
export default function Header() {
    const navigate = useNavigate();
    const [searchvalue, setsearchvalue] = useState('');
    const [searchactive, setsearchbox] = useState('clearsearch');
    const isauth = useSelector(state => state.auth.isAuthenticated);


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

    
    function toggleLogin() {
        navigate('/login');
    }
    function toggleSignUp() {
        navigate('/signup');
    }

    return (<>
        <nav className="navbar">

            <FontAwesomeIcon icon={faSpotify} className='spotifylogo' />
            <div className='midbox'>

                <Link to='/' className='homebox' title='Home'><FontAwesomeIcon icon={faHouse} className='homebtn' /></Link>
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

            {(!isauth)?<span className='signsec'>
                <button className='signupbtn' onClick={ toggleSignUp}>Sign up</button>
                <button className='signinbtn' onClick={ toggleLogin}>Log in</button>
            </span>:<Profile />}
            
          

        </nav>
    </>);
}