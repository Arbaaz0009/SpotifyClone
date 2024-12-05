import React, { useRef, useState, useEffect } from 'react';
import './PlayBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPause, faPlay, faShuffle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

const PlayBar = () => {
  const audio = useRef(null);
  const [inputValue, setInputValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audioElement = audio.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateTime);
      audioElement.addEventListener('loadedmetadata', () => setDuration(audioElement.duration));
    }
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', updateTime);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audio.current.currentTime = seekTime;
    setInputValue(e.target.value);
  };

  const handleVolumeChange = (e) => {
    audio.current.volume = e.target.value / 100;
  };

  const updateTime = () => {
    const audioElement = audio.current;
    if (audioElement) {
      const currentTime = audioElement.currentTime;
      const progress = (currentTime / duration) * 100;
      setInputValue(progress);
      setCurrentTime(currentTime);
    }
  };

  const playAudio = () => {
    const audioElement = audio.current;
    if (audioElement) {
      setIsPlaying(true);
      audioElement.play();
    }
  };

  const pauseAudio = () => {
    const audioElement = audio.current;
    if (audioElement) {
      setIsPlaying(false);
      audioElement.pause();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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
        <div className="controls">
          <button className="play-pause-btn">
            <FontAwesomeIcon icon={faShuffle} style={{ color: '#1db954' }} />
          </button>
          <button className="next-song-btn">
            <FontAwesomeIcon icon={faForwardStep} style={{ color: '#1db954' }} />
          </button>
          <button onClick={isPlaying ? pauseAudio : playAudio} className="play-pause-btn">
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
          <input type="range" min="0" max="100" className="volume-changer" onChange={handleVolumeChange} />
        )}
        <div className="progressBarSec">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={inputValue}
            onChange={(e)=>handleInputChange(e)}
            className="progress-bar"
          />
          <span>{formatTime(duration)}</span>
        </div>
        <audio ref={audio} src="/audio/be alright.mp3" style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default PlayBar;
