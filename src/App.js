import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Fetch from './Fetch';
import Register from "./Register.js";
import HomePage from "./HomePage.js";
import Login from "./LoginPage.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/Fetch", element: <Fetch /> },
]);


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App