import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_HOST = "http://localhost/todolistBackend/public";

function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
            `${API_HOST}/api/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(credentials),
            }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Success:", data);
            // 登錄成功後的處理，例如保存 token，導航到另一頁等
            // 保存 token 到 localStorage 或 sessionStorage
            localStorage.setItem("userToken", data.token);
            // 根據需要導航，例如導航到首頁
            navigate("/Fetch", { state: { email: data.user.email } });
        } catch (error) {
            console.error("Failed to login:", error);
        }
  };

  return (<div className="container mt-5">
      <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>登入</h2>
                <br></br>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                電子信箱
                            </label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                密碼
                            </label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            登入
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}

export default Login;
