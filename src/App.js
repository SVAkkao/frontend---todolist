// import React, { useEffect, useRef, useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// Routes

import Register from "./MemberSystem/Register.js";
import HomePage from "./MemberSystem/HomePage.js";
import Login from "./MemberSystem/LoginPage.js";
import RatingRoute from "./RatingRoute";
import NoAuthRoute from "./MemberSystem/NoAuthRoute.js";
import LogoutBar from "./MemberSystem/LogoutBar.js";
import ForgotPassword from "./MemberSystem/ForgotPassword.js";
import MemberCentre from "./MemberSystem/MemberCentre.js";
import AchievementsPage from "./MemberSystem/AchievementSystem/Attribution.js";
import List from "./UserListThings/List.js";
import Alist from "./UserListThings/Alist.js";
import Book from "./UserListThings/Pages/Book.js";
import Aboard from "./UserListThings/Pages/Aboard.js";
import History from "./UserListThings/Pages/History.js";
import Water from "./UserListThings/Pages/Water.js";
import Outdoor from "./UserListThings/Pages/Outdoor.js";
import Fetch from "./UserListThings/Fetch.js";

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
  {
    path: "/membercentre",
    element: <MemberCentre />,
  },
  {
    path: "/attribution",
    element: <AchievementsPage />,
  },

  //TO-DO-LIST
  { path: "/list", element: <List /> },
  { path: "/alist", element: <Alist /> },
  { path: "/fetch", element: <Fetch /> },
  //
  // { path: "/book", element: <Book /> },
  // { path: "/aboard", element: <Aboard /> },
  // { path: "/history", element: <History /> },
  // { path: "/water", element: <Water /> },
  // { path: "/outdoor", element: <Outdoor /> },

  //評價系統
  { path: "/ratings", element: <RatingRoute /> },
  { path: "/ratingroute", element: <Navigate to="/ratings" /> },
  { path: "/RatingRoute", element: <Navigate to="/ratings" /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
