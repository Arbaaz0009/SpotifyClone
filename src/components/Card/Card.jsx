import React, { useState } from 'react';
import './Card.css';
import { useSelector } from 'react-redux';
const thumnail_card = ({ albmimg, isArtist, title, isSong }) => {

    const [ishovered, setIsHovered] = useState(false);
    const username = useSelector(state => state.auth.userName);
    // return (<img className={imgclass} src={TomOdell} alt="cardlogo" />);
    return (

        <div className={`card`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={albmimg} draggable={false} className='cardlogo' alt="cardlogo" />

            <span className='titlebox'>
                {(title) ? <p className='title'>{title}</p> : <p className='title'>Playlist</p>}
               
            </span>
            <img draggable={false} className={`playbtn ${ishovered ? 'show' : ''}`} src='/svgs/playbtn.png' alt="" />
        </div>



    )
}

export default thumnail_card;
