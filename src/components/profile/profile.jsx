import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './Profile.css';
import apiClient  from '../../spotify';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/Auth';
import Profile_content from './profile_content';

const Profile = () => {
  const [image, setImage] = useState('');
  const [toggleMenu, setToggleMenu] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('profile page loaded');
    apiClient.get("me").then((response) => {
      console.log("this is image url: ",response); 
      setImage(response.data.images[0].url);
      dispatch(authAction.setUserName(response.data.display_name));
    });
  }, []);
  function toggleOption() {
    setToggleMenu(!toggleMenu);
    console.log('toggleMenu:', toggleMenu);
    
  }

  return (
    <main className='profile_container' onClick={toggleOption} title="Profile">
     {!toggleMenu?<img src={image} alt="" srcset="" />:
      <FontAwesomeIcon icon={faXmark} className='logo'/>}
      {toggleMenu?<Profile_content className='drop_down' />:null}
    </main>
  )
}

export default Profile
