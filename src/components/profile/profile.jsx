import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './Profile.css';
import apiClient from '../../spotify';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../store/Auth';
import Profile_content from './profile_content';
import { motion, AnimatePresence } from "motion/react";
const Profile = () => {
  const image = useSelector((state) => state.auth.img);
  const [toggleMenu, setToggleMenu] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('profile page loaded');
    apiClient.get("me")
      .then((response) => {
        const { display_name, images } = response.data;
        const userName = display_name;
        const img = images?.[0]?.url || ''; // Safe access and fallback to empty string if no image

        dispatch(authAction.setUserName({ userName, img }));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // Optionally dispatch an action for error handling or show a notification
      });
  

  }, []);


  return (
    <main className='profile_container' title="Profile">
      {/* {!toggleMenu?<img src={image} alt="" srcset="" />:
      <FontAwesomeIcon icon={faXmark} className='logo'/>} */}
      {/* {toggleMenu?<Profile_content className='drop_down' />:null} */}
      {!toggleMenu ? <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => setToggleMenu(!toggleMenu)}
        className='profile_image'
      >
        <img src={image} alt="" srcset="" />
      </motion.div> :
        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={() => setToggleMenu(!toggleMenu)}
          className='profile_image'
        >
          <FontAwesomeIcon icon={faXmark} className='Crosslogo' />
        </motion.div>}
      <AnimatePresence>
        {toggleMenu ? (
          <motion.div
            className="drop_down"
            exit={{ opacity: 0, scale: 1.1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Profile_content />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  )
}

export default Profile
