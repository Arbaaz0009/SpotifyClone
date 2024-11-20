import React, { useState } from 'react';
import './PlayBar.css'

const PlayBar = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="playbar">
      
      {/* Other elements in the PlayBar */}
    </div>
  );
};

export default PlayBar;
