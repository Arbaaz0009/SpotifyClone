import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const authorizationCode = params.get("code");
        const state = params.get("state");

        if (authorizationCode) {
            // Send the code to the backend to exchange for access tokens
            fetch("http://localhost:3000/callback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: authorizationCode,  // This should be the authorization code from Spotify
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Access Token:", data.access_token);
                })
                .catch((error) => {
                    console.error("Error exchanging code for token:", error);
                });
            }
        }, [navigate]);

    return <div>Loading...</div>;
};

export default Callback;
