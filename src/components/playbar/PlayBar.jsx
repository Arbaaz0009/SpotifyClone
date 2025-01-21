import React, { useEffect, useState, useCallback } from 'react';
import './PlayBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faMusic, faPause, faPlay, faShuffle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSongAction } from '../../store/setSong';
import useSpotifyPlayer from '../../Hooks/useSpotifyPlayer';  // Custom hook for Spotify Player initialization

const PlayBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const song = useSelector(state => state.setSong);

  const { player, deviceId } = useSpotifyPlayer(token);

  useEffect(() => {

    try {
      async function name() {
        if (player && deviceId && song.uri) {
          const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [song.uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }).catch(error => console.error('Error playing track:', error));

          if (!response.ok) {
            throw new Error('Failed to play track');
          }
          // Fetch the duration of the song
          player.getCurrentState().then(state => {
            if (state) {
              setDuration(state.track_window.current_track.duration_ms);
            }
          });

          // Set the initial volume
          player.setVolume(volume / 100);
        }
      }
      name();
    } catch (error) {
      console.error('Error setting song:', error);

    }finally{
      console.log('Song set successfully');
      setIsPlaying(true);
    }

  }, [player, deviceId, song.uri, token]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player && isPlaying) {
        player.getCurrentState().then(state => {
          if (state) {
            setCurrentTime(state.position);
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, isPlaying]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      player.pause();
    } else {
      player.resume();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, player]);

  const handleVolumeToggle = useCallback(() => {
    setShowVolume(prevShowVolume => !prevShowVolume);
  }, []);

  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    player.seek(newTime);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    player.setVolume(volume / 100);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  };

  return (
    <div className="SongProgressBar">
      <div className="song-info">
        {(song.img === '' && isAuth) ?
          <span className='album-artSpan'><FontAwesomeIcon icon={faMusic} /></span> :
          <img src={song.img} alt="Album Art" className="album-art" />
        }
        {isAuth ?
          <div className="song-details">
            <span className="song-title">{song.title ? song.title : "title"}</span>
            <span className="song-artist">{song.artist ? song.artist : 'artist name'}</span>
          </div> :
          <div className="song-details">
            <span className="song-title">title</span>
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
          <button className="play-pause-btn" onClick={handlePlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button className="Volume">
            <FontAwesomeIcon icon={faBackwardStep} style={{ color: '#1db954' }} />
          </button>
          <button className="Volume" onClick={handleVolumeToggle}>
            <FontAwesomeIcon icon={faVolumeHigh} style={{ color: '#1db954' }} />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            className="volume-changer"
            onChange={handleVolumeChange}
          />
        </div>


        <div className="progressBarSec">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            className="progress-bar"
            onChange={handleSeek}
          />
          <span>{formatTime(duration)}</span>
        </div>

      </div>
    </div>
  );
};

export default PlayBar;

