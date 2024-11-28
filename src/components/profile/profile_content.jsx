import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/Auth';
import './Profile.css';
import { distance } from 'motion';
const Profile_content = ({ ...props }, toggleMenu) => {
const dispatch = useDispatch();
    function toggleClearToken() {
        localStorage.clear();
        dispatch(authAction.logoutUser());
    }
    return (
        <div {...props}>
            <li>Profile</li>
            <li>Uprgade to Premium</li>
            <li>Setting</li>
            <div className="seprater"></div>
            <Link to='/' onClick={toggleClearToken}>Log Out</Link>
        </div>
    )
}

export default Profile_content;
