import React from 'react'
import './PlayBar.css'
const PlayBar = () => {
    const progress = 50;
  return (
    <main className='playbarSec'>

        <input type="range" name="" id="" min='0' max='100' value={progress}/>
    </main>
  )
}

export default PlayBar;
