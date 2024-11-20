import React, { useState } from 'react';
import './PlayBar.css'

const PlayBar = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="playbar">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for a song..."
      />
      {/* Other elements in the PlayBar */}
    </div>
  );
};

export default PlayBar;
