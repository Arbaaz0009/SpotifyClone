import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Loading from "./Pages/Loading/Loading";

// Lazy-load components
const Home = lazy(() => import("./Pages/Home/Home"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const Playlist = lazy(() => import("./Pages/playlist/playlist"));
const Test = lazy(() => import("./Pages/test/test"));
const Callback = lazy(() => import("./Pages/callback/Callback"));

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>Error loading the home page</h1>, // Error boundary for the Home route
    children: [
      {
        path: "playlist",
        element: (
          <Suspense fallback={<Loading />}>
            <Playlist />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "/test",
    element: (
      <Suspense fallback={<Loading />}>
        <Test />
      </Suspense>
    ),
  },
  {
    path: "/callback",
    element: (
      <Suspense fallback={<Loading />}>
        <Callback />
      </Suspense>
    ),
  },

]);

function App() {
  console.log("App.jsx loaded");

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
