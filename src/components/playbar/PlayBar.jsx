import React, { useState } from 'react';
import './PlayBar.css'

const PlayBar = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="SongProgressBar">
      <div className="song-info">
        <img src="/imagess/be alright.jpg" alt="Album Art" className="album-art" />
        <div className="song-details">
          <span className="song-title">Be Alright</span>
          <span className="song-artist">Dean Lewis</span>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={inputValue}
        onChange={handleInputChange}
        className="progress-bar"
      />

      <div className="controls">
        <button className="play-pause-btn">Play/Pause</button>
        <input
          type="range"
          min="0"
          max="100"
          className="volume-changer"
          onChange={(e) => console.log('Volume:', e.target.value)}
        />
        <button className="next-song-btn">Next</button>
      </div>
    </div>
  );
};

export default PlayBar;
