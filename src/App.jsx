import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense, useCallback, useEffect } from "react";
import './App.css';
import Loading from "./Pages/Loading/Loading";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "./store/Auth";
import { tokenManager } from "./utils/tokenManager";

const Home = lazy(() => import("./Pages/Home/Home"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const Playlist = lazy(() => import("./Pages/playlist/playlist"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "playlist",
        element: <Playlist />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  }
]);

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const tokenExpiry = useSelector((state) => state.auth.tokenExpiry);

  useEffect(() => {
    // Check token expiration every minute
    const checkTokenExpiration = async () => {
      if (token && tokenExpiry && tokenManager.isTokenExpired()) {
        try {
          const newToken = await tokenManager.refreshAccessToken();
          dispatch(authAction.updateToken({
            token: newToken,
            expiresIn: 3600 // Spotify tokens typically last 1 hour
          }));
        } catch (error) {
          console.error('Token refresh failed:', error);
          dispatch(authAction.logoutUser());
        }
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [token, tokenExpiry, dispatch]);

  const getOAuthToken = useCallback(
    async (callback) => {
      try {
        // Always get a fresh token for the SDK
        const currentToken = token?.replace("Bearer", "").trim();
        if (!currentToken) {
          throw new Error("No token available");
        }
        callback(currentToken);
      } catch (error) {
        console.error('Error getting token for SDK:', error);
        dispatch(authAction.logoutUser());
        callback(null);
      }
    },
    [token, dispatch]
  );

  if (!token) {
    return (
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    );
  }

  return (
    <WebPlaybackSDK
      initialDeviceName="Spotify Clone"
      getOAuthToken={getOAuthToken}
      initialVolume={1}
      connectOnInitialized={true}
    >
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </WebPlaybackSDK>
  );
};

export default App;