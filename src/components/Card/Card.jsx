import React, { useState } from 'react';
import './Card.css';
const thumnail_card = ({ albmimg, isArtist, title,isSong,onClick }) => {
  
    const [ishovered, setIsHovered] = useState(false);

    // return (<img className={imgclass} src={TomOdell} alt="cardlogo" />);
    return (
        <div onClick={onClick} >
            <div className={`card ${ishovered ? 'active' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={albmimg} draggable={false} className='cardlogo' alt="cardlogo" />

                <span className='titlebox'>
                    {(title) ? <p className='title'>{title}</p> : <p className='title'>Playlist</p>}
                    {(isArtist) ? <p className='title'>Artist</p> : <p className='title'>Playlist &#x22C5; Arbaz Ansari</p>}
                </span>
                <img draggable={false} className={`playbtn ${ishovered ? 'show' : ''}`} src='/svgs/playbtn.png' alt="" />
            </div>


        </div>
    )
}

export default thumnail_card;
