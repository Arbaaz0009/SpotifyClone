import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense, useCallback } from "react";
import './App.css';
import Loading from "./Pages/Loading/Loading";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { useSelector } from "react-redux";

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
  const token = useSelector((state) => state.auth.token);

  const getOAuthToken = useCallback(
    (callback) => callback(token?.replace("Bearer", "").trim()),
    [token]
  );

  return (
    <WebPlaybackSDK
      initialDeviceName="Spotify example"
      getOAuthToken={getOAuthToken}
      initialVolume={1}
    >
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </WebPlaybackSDK>
  );
};

export default App;