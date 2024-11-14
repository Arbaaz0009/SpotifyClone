import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";


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
  return <RouterProvider router={router}/>
}

export default App
