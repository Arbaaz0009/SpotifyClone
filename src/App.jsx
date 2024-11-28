import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './App.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
function App() {
  console.log("app.jsx loaded");
  

  return <RouterProvider router={router} />
}

export default App
