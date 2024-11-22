import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './Profile.css'
import apiClient  from '../spotify'
const Profile = () => {
  const [image, setImage] = useState('');
  useEffect(() => {
    console.log('profile page loaded');
    apiClient.get("me").then((response) => {
      // console.log("this is image url: ",response); 
      setImage(response.data.images[0].url);
    });


  }, []);
  function toggleOption() {
    console.log('profile option clicked');
  }

  return (
    <main className='profile_container' onClick={toggleOption} title="Profile">
      {/* <FontAwesomeIcon icon={faUser} /> */}
      <img src={image} alt="" srcset="" />
    </main>
  )
}

export default Profile
