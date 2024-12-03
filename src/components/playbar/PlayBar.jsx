import React, { useState } from 'react';
import './PlayBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPause, faPlay, faShuffle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

const PlayBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const Current_duration = <span className="Time current-duration">0:00</span>;
  const End_duration = <span className="Time end-duration">3:24</span>;
  return (
    <div className="SongProgressBar">
      <div className="song-info">
        <img src="/imagess/Stitches.jpg" alt="Album Art" className="album-art" />
        <div className="song-details">
          <span className="song-title">Be Alright</span>
          <span className="song-artist">Dean Lewis</span>
        </div>
      </div>

      <div className="controls-sec">
        <div className='controls'>
          <button className="play-pause-btn"><FontAwesomeIcon icon={faShuffle} style={{ color: '#1db954' }} /></button>
          <button className="next-song-btn"><FontAwesomeIcon icon={faForwardStep} style={{ color: '#1db954' }} /></button>
          {isPlaying ? <button className="Volume" onClick={() => setIsPlaying(!isPlaying)}><FontAwesomeIcon icon={faPlay} style={{ color: '#1db954' }} /></button> :
            <button className="Volume" onClick={() => setIsPlaying(!isPlaying)}><FontAwesomeIcon icon={faPause} style={{ color: '#1db954' }} /></button>}
          <button className="Volume"><FontAwesomeIcon icon={faBackwardStep} style={{ color: '#1db954' }} /></button>
          <button className="Volume" onClick={()=>setShowVolume(!showVolume)}><FontAwesomeIcon icon={faVolumeHigh} style={{ color: '#1db954' }} /></button>
        </div>
        {showVolume?<input
          type="range"
          min="0"
          max="100"
          className="volume-changer"
          onChange={(e) => console.log('Volume:', e.target.value)}
        />:''}
        <div className='progressBarSec'>
          {Current_duration}
          <input
            type="range"
            min="0"
            max="100"
            value={inputValue}
            onChange={handleInputChange}
            className="progress-bar"
          />
          {End_duration}
        </div>
        {/* <input
          type="range"
          min="0"
          max="100"
          className="volume-changer"
          onChange={(e) => console.log('Volume:', e.target.value)}
        /> */}
      </div>
    </div>
  );
};

export default PlayBar;
