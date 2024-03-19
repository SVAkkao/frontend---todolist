// import React, { useEffect, useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Routes
import Fetch from "./Fetch";
import Register from "./Register.js";
import HomePage from "./HomePage.js";
import Login from "./LoginPage.js";
import RatingRoute from "./RatingRoute";
import NoAuthRoute from "./NoAuthRoute.js";
import LogoutBar from "./LogoutBar.js";
import ForgotPassword from "./ForgotPassword.js";

const router = createBrowserRouter([
  //會員系統
  { path: "/", element: <HomePage /> },
  {
    path: "/register",
    element: (
      <NoAuthRoute>
        <Register />
      </NoAuthRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <NoAuthRoute>
        <Login />
      </NoAuthRoute>
    ),
  },
  { path: "/logout", element: <LogoutBar /> },
  {
    path: "/forgotpassword",
    element: (
      <NoAuthRoute>
        <ForgotPassword />
      </NoAuthRoute>
    ),
  },

  //TO-DO-LIST
  { path: "/Fetch", element: <Fetch /> },

  //評價系統
  { path: "/ratings", element: <RatingRoute /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
