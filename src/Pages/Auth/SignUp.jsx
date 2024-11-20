import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import './style.css';
import { Link,useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSIgnUp = (e) => {
        e.preventDefault();
        const pass1 = document.getElementById('password').value;
        const pass2 = document.getElementById('password2').value;
        if (pass1 !== pass2) {
            setError('Passwords do not match');
            e.target.reset();
            return;
        }
        setError('');
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        console.log(data);
    };

    function handleSignUp(e) {
        e.preventDefault();
        window.location = `https://www.spotify.com/in-en/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F' title='Create a new account`;
    }
    return (
        <main className='loginform'>
            <form className='loginpage' onSubmit={handleSIgnUp}>
                <div>
                    <FontAwesomeIcon icon={faSpotify} className='Logo' />
                </div>
                <h2>Register to Spotify</h2>
                {/* <div>
                    <label htmlFor="emailId">Email:</label>
                   <input type="email" name="" id="emailId" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name='password' id='password' required minLength={8} />
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" id='password2' required minLength={8} />
                    {error && <p className="error">{error}</p>}
                </div> */}

                <button type="submit" onClick={handleSignUp}>Sign Up</button>

                <div className='links' style={{ display: 'block' }}>
                    Already have an account?
                    <Link to='/login' title='Sign In'>Sign In</Link>
                </div>

                <div>
                    <Link to='/'>{'< '}Go back</Link>
                </div>

            </form>
        </main>
    )
}

export default SignUp
