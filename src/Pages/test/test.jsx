import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';

const test = () => {


  useEffect(() => {
    const fetchData = async () => {
      fetch("http://localhost:3000/login")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch Spotify authorization URL");
          }
          return response.json(); // Parse JSON from server
        })
        .then((responseData) => {
          console.log("Redirecting to:", responseData); // Log the URL from the `data` field
          window.location.href = responseData.data; // Redirect to Spotify
        })
        .catch((error) => {
          console.error("Error during login redirect:", error);
        });
  
  
  
    }
    fetchData();
  
  },[]);
  

  return (
    <div>
      <button on>CLICK ME TO LOGIN</button>
    </div>
  )
}

export default test
