import React, { useEffect, useNavigate } from 'react';
import { Navigate } from 'react-router-dom';

const NoAuthRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('userToken');

  // 如果用戶已登入，重定向到主頁
  if (isLoggedIn) {
    return <Navigate to="/testing" replace />;
  }
  // 否則，渲染子元件
  return children;
};

export default NoAuthRoute