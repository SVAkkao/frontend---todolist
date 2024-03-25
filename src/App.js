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
import Fetch from "./UserListThings/Fetch.js";
import SplitCost from "./UserListThings/SplitCost.js";

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
  { path: "/money", element: <SplitCost /> },
  //

  //評價系統
  { path: "/ratings", element: <RatingRoute /> },
  { path: "/ratingroute", element: <Navigate to="/ratings" /> },
  { path: "/RatingRoute", element: <Navigate to="/ratings" /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
