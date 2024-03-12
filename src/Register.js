import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_HOST = process.env.REACT_APP_API_URL;

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 檢查密碼和確認密碼是否匹配
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(
                `${API_HOST}/api/register`,
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    username: formData.name,
                    email: formData.email,
                    password: formData.password,
                    // confirmPassword 不需要發送到後端，除非後端明確要求
                }),
                }
            );

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();
            console.log(data);
            alert(data.message); // 或者根據你的需求做一些狀態更新
            navigate("/Fetch", { state: { email: data.user.email } });
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred, please try again.");
        }
    };
    return (<div className="container mt-5">
        <h2>註冊</h2>
        <br></br>
        <form onSubmit={handleSubmit} id="mydata">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    姓名
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    密碼
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                    確認密碼
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required />
            </div>
            <button type="submit" className="btn btn-primary">
                註冊
            </button>
        </form>
    </div>);
}

export default Register;
