import React, { useRef, useState, useEffect } from 'react';
import './PlayBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faMusic, faPause, faPlay, faShuffle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { setSongAction } from '../../store/setSong'
import { useDispatch, useSelector } from 'react-redux';
const PlayBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const isAuth = useSelector(state => state.auth.isAuthenticated)

  let img = useSelector(state => state.setSong.img);
  let title = useSelector(state => state.setSong.title);
  let artist = useSelector(state => state.setSong.artist);




  return (
    <div className="SongProgressBar">
      <div className="song-info">
        {(img == '' && isAuth)?
          <span className='album-artSpan'><FontAwesomeIcon icon={faMusic} /></span> :
          <img src={img} alt="Album Art" className="album-art" />
        }
        {isAuth?<div className="song-details">
          <span className="song-title" >{title ? title : "title"}</span>
          <span className="song-artist">{artist ? artist : 'artist name'}</span>
        </div>:
          <div className="song-details">
            <span className="song-title" >title</span>
            <span className="song-artist">artist name</span>
          </div>}
      </div>

      <div className="controls-sec">
        <div className="controls">
          <button className="play-pause-btn">
            <FontAwesomeIcon icon={faShuffle} style={{ color: '#1db954' }} />
          </button>
          <button className="next-song-btn">
            <FontAwesomeIcon icon={faForwardStep} style={{ color: '#1db954' }} />
          </button>
          <button className="play-pause-btn" onClick={() => setIsPlaying(!isPlaying)}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button className="Volume">
            <FontAwesomeIcon icon={faBackwardStep} style={{ color: '#1db954' }} />
          </button>
          <button className="Volume" onClick={() => setShowVolume(!showVolume)}>
            <FontAwesomeIcon icon={faVolumeHigh} style={{ color: '#1db954' }} />
          </button>
        </div>
        {showVolume && (
          <input type="range" min="0" max="100" className="volume-changer" />
        )}
        <div className="progressBarSec">
          <span>{'00:00'}</span>
          <input
            type="range"
            min="0"
            max="100"

            className="progress-bar"
          />
          <span>{'00:00'}</span>
        </div>
        <audio style={{ display: 'none' }} />

      </div>
    </div>
  );
};

export default PlayBar;
