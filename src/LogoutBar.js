import { useNavigate } from "react-router-dom";
import axios from "axios"; // 引入axios
import { Link } from "react-router-dom";

function LogoutBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("userToken");
      // 在请求头中添加token
      const response = await axios.post(
        "http://localhost/---todolist-backend/public/api/logout",
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
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#AAD9BB", height: "110px" }}
    >
      <div className="container-fluid">
        <img src="logo.svg" style={{ height: "80px" }}></img>
        <div className="navbar-brand text-dark" style={{ fontSize: "32px" }}>
          清單樂旅
        </div>
        <div className="navbar-nav ms-auto">
          <Link onClick={handleLogout} className="nav-link text-dark">
            <div
              className="nav-item btn btn-light"
              style={{ marginRight: "10px" }}
            >
              登出
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default LogoutBar;
