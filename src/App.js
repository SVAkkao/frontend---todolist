// import React, { useEffect, useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
// import Table from 'react-bootstrap/Table';
import Fetch from "./Fetch";
import Register from "./Register.js";
import HomePage from "./HomePage.js";
import Login from "./LoginPage.js";
import TestRoute from "./TestRoute/index.jsx";
import NoAuthRoute from "./NoAuthRoute.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogoutBar from "./LogoutBar.js";

const router = createBrowserRouter([
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
  { path: "/Fetch", element: <Fetch /> },
  { path: "/testing", element: <TestRoute /> },
  { path: "/logout", element: <LogoutBar /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
