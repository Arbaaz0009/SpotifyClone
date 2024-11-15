import React, { useState } from 'react'
const thumnail_card = ({ albmimg, isArtist, title,isSong }) => {
    let imgclass = 'cardlogo';
    const [ishovered, setIsHovered] = useState(false);

    // return (<img className={imgclass} src={TomOdell} alt="cardlogo" />);
    return (
        <>
            <div className='card'
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


        </>
    )
}

export default thumnail_card;
