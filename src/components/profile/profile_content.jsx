import React from 'react'
import { Link } from 'react-router-dom';
import './Profile.css';
const Profile_content = ({ ...props }, toggleMenu) => {

    function toggleClearToken() {
        localStorage.clear();
    }
    return (
        <div {...props}>
            <li>Profile</li>
            <li>Uprgade to Premium</li>
            <li>Setting</li>
            <div className="seprater"></div>
            <Link to='/login' onClick={toggleClearToken}>Log Out</Link>
        </div>
    )
}

export default Profile_content;
