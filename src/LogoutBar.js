import { useNavigate } from "react-router-dom";
import axios from 'axios'; // 引入axios

function LogoutBar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('userToken');
            // 在请求头中添加token
            const response = await axios.post('http://localhost/---todolist-backend/public/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Logged out successfully:', response.data);
            localStorage.removeItem('userToken');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (<nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#28a745" }}
    >
        <div className="container-fluid">
            {/* 在這裡添加標誌或項目名稱 */}
            <div className="navbar-brand text-dark">清單樂旅</div>
            <button onClick={handleLogout} className="btn btn-light text-dark btn-outline-light">登出</button>
        </div>
    </nav>);
}

export default LogoutBar