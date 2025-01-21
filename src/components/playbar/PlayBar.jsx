import React, { useCallback, useEffect, useState } from 'react';
import './PlayBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faMusic, faPause, faPlay, faShuffle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { WebPlaybackSDK, usePlayerDevice, usePlaybackState, useSpotifyPlayer } from 'react-spotify-web-playback-sdk';
import { SpotifyPlaybackPlayer } from 'react-spotify-playback-player';

const PlayBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const song = useSelector(state => state.setSong);
  const token = useSelector((state) => state.auth.token);

  const getOAuthToken = useCallback(
    (callback) => callback(token?.replace("Bearer", "").trim()),
    [token]
  );

  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();

  useEffect(() => {
    if (player && song.uri) {
      player.togglePlay()
        .then(() => {
          player.queue(song.uri);
        });
    }
  }, [song, player]);

  return (
    <WebPlaybackSDK
      initialDeviceName="Spotify example"
      getOAuthToken={getOAuthToken}
      initialVolume={0.5}
    >
      <div className="SongProgressBar">
        <SpotifyPlaybackPlayer
          playback={playback || undefined}
          player={player || undefined}
          deviceIsReady={device?.status}
        />
      </div>
    </WebPlaybackSDK>
  );
};

export default PlayBar;