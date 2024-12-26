import React, { useState } from 'react';
import './Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSongAction } from '../../store/setSong';


const thumnail_card = ({ albmimg, artist, title, id, isartist,uri }) => {
    const dispatch = useDispatch();
    const [ishovered, setIsHovered] = useState(false);
    const username = useSelector(state => state.auth.userName);
    const navigate = useNavigate();

    function updateSong() {
        console.log("clicked");
        console.log("uri is :", uri);
        dispatch(setSongAction.updateSong({ id: id, artist: artist, title: title, img: albmimg }));
    }
    // return (<img className={imgclass} src={TomOdell} alt="cardlogo" />);
    return (

        <div className={`card`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={updateSong}
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
