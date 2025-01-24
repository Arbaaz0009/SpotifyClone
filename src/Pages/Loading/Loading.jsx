import React from 'react'
import './Loading.css'
const Loading = () => {
    // console.log("loading screen loaded");

    return (
        <div className='loading'><div class="lds-ring" style={{ textAlign: 'center', marginTop: '50px' }}><div></div><div></div><div></div><div></div></div></div>
    )
}

export default Loading
