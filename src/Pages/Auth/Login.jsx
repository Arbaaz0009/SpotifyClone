import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { loginEndPoint } from '../../spotify';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';

const Login = () => {
    const dispatch = useDispatch();


    const handleLogin = (e) => {
        e.preventDefault();
        window.location = loginEndPoint;
    };

    return (
        <main className='loginform'>
            <form className='loginpage' onSubmit={handleLogin}>
                <div>
                    <FontAwesomeIcon icon={faSpotify} className='Logo' />
                </div>
                <h2>Login in to Spotify</h2>
                <button type="submit" onClick={handleLogin}>Login</button>
                <div className='links'>
                    <Link to="https://accounts.spotify.com/en/password-reset?flow_ctx=052d33cd-0c1f-49f8-9b0f-3573bac8f62e%3A1732119785" title='Forgot Password?'>Forgot Password?</Link>
                    <Link to='https://www.spotify.com/in-en/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F'>Sign Up</Link>
                </div>
                <div>
                    <Link to='/'>{'< '}Go back</Link>
                </div>
            </form>
        </main>
    );
};

export default Login;
