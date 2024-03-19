import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios"; // 引入 axios
// CSS, icon
import {
  // 會員中心的圖示
  MdAccountCircle,
  // 下拉的圖示
  MdExpandMore,
} from "react-icons/md";
import {
  // 登出的圖示
  FaSignOutAlt,
  // 評論與評價的圖示
  FaCommentAlt,
} from "react-icons/fa";
import "./DropdownMenu.css";

const API_HOST = process.env.REACT_APP_API_URL;

function LogoutBar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // 函数用于获取当前登录用户信息
    const fetchUser = async () => {
      const token = localStorage.getItem("userToken"); // 从localStorage获取token
      try {
        const response = await axios.get(
          `${API_HOST}/api/user`,
          {
            // 确保地址与你的Laravel后端服务地址匹配
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserName(response.data.name); // 假设响应中包含用户姓名
      } catch (error) {
        console.error("获取用户信息失败:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("userToken");
      // 在请求头中添加token
      const response = await axios.post(
        `${API_HOST}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Logged out successfully:", response.data);
      localStorage.removeItem("userToken");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#AAD9BB", height: "110px" }}
      >
        <div className="container-fluid">
          <img src="logo.svg" style={{ height: "80px" }}></img>
          <div className="navbar-brand" style={{ fontSize: "32px" }}>
            清單樂旅
          </div>
          <div className="navbar-nav ms-auto dropdown">
            <div
              className="navbar-brand"
              style={{ fontSize: "24px", paddingTop: "35px" }}
            >
              {userName && (
                <p>
                  歡迎回來，{userName}
                  <MdExpandMore style={{ marginLeft: "8px" }} />
                </p>
              )}

              <div className="dropdown-content">
                <Link to="/membercentre" className="nav-link">
                  <MdAccountCircle style={{ marginRight: "8px" }} />
                  <span style={{ fontSize: "18px" }}>會員中心</span>
                </Link>
                <Link to="/ratings" className="nav-link">
                  <FaCommentAlt style={{ marginRight: "8px" }} />
                  <span style={{ fontSize: "18px" }}>評論與評價</span>
                </Link>
                <Link onClick={handleLogout} className="nav-link">
                  <FaSignOutAlt style={{ marginRight: "8px" }} />
                  <span style={{ fontSize: "18px" }}>登出</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default LogoutBar;
