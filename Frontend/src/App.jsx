import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./Routes/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Routes/Login/Login";
import Signup from "./Routes/Signup/Signup";
import { useAuthContext } from "./Hooks/UseAuthContext";

const App = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "/login",
          element: !user ? <Login /> : <Navigate to="/" />,
        },
        {
          path: "/signup",
          element: !user ? <Signup /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
