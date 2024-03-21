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
  FaFileExport,
  FaUserFriends,
} from "react-icons/fa";
import "./DropdownMenu.css";
import html2canvas from "html2canvas";

const API_HOST = process.env.REACT_APP_API_URL;
const API_IMAGE = process.env.REACT_APP_IMAGE_URL;

function LogoutBar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    // 函数用于获取当前登录用户信息
    const fetchUser = async () => {
      const token = localStorage.getItem("userToken"); // 从localStorage获取token
      try {
        const response = await axios.get(`${API_HOST}/api/user`, {
          // 确保地址与你的Laravel后端服务地址匹配
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(response.data.name); // 假设响应中包含用户姓名
        setUserPhoto(response.data.photo);
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
          <img src="logo.svg" style={{ height: "80px" }}></img>
          <Link to="/list" style={{ textDecoration: "none" }}>
            <div className="navbar-brand" style={{ fontSize: "32px" }}>
              清單樂旅
            </div>
          </Link>
          <div className="navbar-nav ms-auto dropdown">
            <div>
              <div style={{ display: "flex" }}>
                <span style={{ fontSize: "24px", padding: "10px" }}>
                  歡迎回來！
                </span>
                <div
                  className="avatar-preview"
                  style={{
                    borderRadius: "50%",
                    margin: "0px 10px",
                    width: "50px",
                    height: "50px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={
                      userPhoto
                        ? `${API_IMAGE}${userPhoto}`
                        : "avatar-template.svg"
                    }
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
              </div>

              <div className="dropdown-content">
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
                      src={
                        userPhoto
                          ? `${API_IMAGE}${userPhoto}`
                          : "avatar-template.svg"
                      }
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
                  {userName && (
                    <span style={{ fontSize: "24px", marginRight: "10px" }}>
                      {userName}
                    </span>
                  )}
                </div>
                <Link to="/list" className="nav-link">
                  <MdHome style={{ marginRight: "8px" }} />
                  <span style={{ fontSize: "18px" }}>首頁</span>
                </Link>
                <Link to="/membercentre" className="nav-link">
                  <MdAccountCircle style={{ marginRight: "8px" }} />
                  <span style={{ fontSize: "18px" }}>會員中心</span>
                </Link>
                <Link to="/attribution" className="nav-link">
                  <FaUserFriends style={{ marginRight: "8px" }} />
                  <span style={{ fontSize: "18px" }}>你的貢獻</span>
                </Link>
                <Link to="/ratings" className="nav-link">
                  <FaCommentAlt style={{ marginRight: "8px" }} />
                  <span style={{ fontSize: "18px" }}>評論與評價</span>
                </Link>
                <Link to="#" className="nav-link">
                  <FaFileExport style={{ marginRight: "8px" }} />
                  <span style={{ fontSize: "18px" }}>匯出頁面</span>
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
