import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios"; // 引入 axios
// CSS, icon
import {
  // 會員中心的圖示
  MdAccountCircle,
  // 下拉的圖示
  MdExpandMore,
  MdHome,
} from "react-icons/md";
import {
  // 登出的圖示
  FaSignOutAlt,
  // 評論與評價的圖示
  FaCommentAlt,
  FaUserFriends,
} from "react-icons/fa";
import "./DropdownMenu.css";
import "./LoginSystem.css";
// Store
import { useUserStore } from "../stores/user";

const API_HOST = process.env.REACT_APP_API_URL;
async function userLogout() {
  const token = localStorage.getItem("userToken");
  const response = await axios.post(
    `${API_HOST}/api/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

function LogoutBar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const userStore = useUserStore();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const fetchUser = async () => {
      if (userStore.user.id === 0) {
        await userStore.getUser();
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      console.log("Logged out successfully:", response.data);
      localStorage.removeItem("userToken");
      userStore.resetUser();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // const exportPageAsPNG = () => {
  //   html2canvas(document.getElementById("content")).then((canvas) => {
  //     // 創建一個圖片元素
  //     const img = canvas.toDataURL("image/png");
  //     // 創建一個鏈接元素，用於下載
  //     const link = document.createElement("a");
  //     link.href = img;
  //     link.download = "exported-page.png"; // 指定下載的文件名
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   });
  // };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#AAD9BB", height: "100px" }}
      >
        <div className="container-fluid">
          <img src="logo.svg" style={{ height: "80px" }} alt="清單樂旅 Logo" />
          <Link to="/alist" style={{ textDecoration: "none" }}>
            <div className="navbar-brand" style={{ fontSize: "32px" }}>
              清單樂旅
            </div>
          </Link>
          <div className="navbar-nav ms-auto dropdown">
            <div>
              <div
                id="user"
                onClick={toggleDropdown}
                style={{ display: "flex", cursor: "pointer" }}
              >
                <span
                  style={{ fontSize: "24px", padding: "10px" }}
                  className="desktop"
                >
                  歡迎回來！
                </span>
                <div
                  className="avatar-preview"
                  style={{
                    borderRadius: "50%",
                    marginRight: "10px",
                    width: "50px",
                    height: "50px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={userStore.getUserPhoto()}
                    alt="User avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      justifyItems: "center",
                    }}
                  />
                </div>
                <MdExpandMore style={{ marginTop: "20px" }} />
              </div>

              <div
                className="dropdown-content"
                style={{ display: showDropdown ? "block" : "none" }}
              >
                <div className="user-card">
                  <div
                    className="avatar-preview"
                    style={{
                      borderRadius: "50%",
                      margin: "0px 10px",
                      width: "40px",
                      height: "40px",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={userStore.getUserPhoto()}
                      alt="User avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        justifyItems: "center",
                      }}
                    />
                  </div>
                  {userStore.user.name && (
                    <span style={{ fontSize: "24px", marginRight: "10px" }}>
                      {userStore.user.name}
                    </span>
                  )}
                </div>
                <Link to="/alist" className="nav-link">
                  <MdHome style={{ marginRight: "8px" }} />
                  <span style={{ fontSize: "18px" }}>首頁</span>
                </Link>
                <Link to="/membercentre" className="nav-link">
                  <MdAccountCircle style={{ marginRight: "8px" }} />
                  <span style={{ fontSize: "18px" }}>會員中心</span>
                </Link>
                <Link to="/attribution" className="nav-link">
                  <FaUserFriends style={{ marginRight: "8px" }} />
                  <span style={{ fontSize: "18px" }}>您的貢獻</span>
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
