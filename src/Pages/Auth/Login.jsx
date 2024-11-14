import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import './style.css';
import { Link } from 'react-router-dom';
const login = () => {
    const AlertforSignUp = (e) => {
        alert('Just Sign up with account with your email and new password');
    };


    const handleLogin = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        console.log(data);
    };
    return (
        <main className='loginform'>
            <form className='loginpage' onSubmit={handleLogin}>
                <div>
                    <FontAwesomeIcon icon={faSpotify}  className='Logo'/>
                </div>
                <h2>Login in to Spotify</h2>
                <div>
                    <label htmlFor="emailId">Email:</label>
                    <input type="email" name="email" id="emailId"  required/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id='password' name='password'required minLength={8}/>
                </div>

                <button type="submit"   >Login</button>
                

                <div className='links'>
                    <a href="#" title='Forgot Password?' onClick={AlertforSignUp}>Forgot Password?</a>
                    <Link to='/signup' title='Create a new account'>Create a new account</Link>
                </div>


                <div>
                    <Link to='/'>{'< '}Go back</Link>
                </div>
            </form>

        </main>
    )
}

export default login
