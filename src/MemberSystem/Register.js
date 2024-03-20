import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

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
        "http://localhost/---todolist-backend/public/api/register",
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
      console.log("success");
      localStorage.setItem("userToken", data.token);
      navigate("/Fetch", { state: { email: data.user.email } });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred, please try again.");
    }
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#AAD9BB", height: "100px" }}
      >
        <div className="container-fluid">
          <img src="logo.svg" style={{ height: "80px" }}></img>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div
              className="navbar-brand text-dark"
              style={{ fontSize: "32px" }}
            >
              清單樂旅
            </div>
          </Link>
          <span className="ms-auto"></span>
        </div>
      </nav>
      <div
        className="mt-5"
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "48%",
            margin: "50px",
          }}
        >
          <img src="https://media.discordapp.net/attachments/1134860695343738910/1219167827118788608/ariel_wu_A_man_is_traveling_in_a_city_minimalist_simple_soft_co_20f9f7a2-6238-44dc-bf69-1919c16a50d4.png?ex=660a5185&is=65f7dc85&hm=ff47e5d4aa292cf2040a1d0b733333e7bd9ca1eb129c1c9d9338a2250b6a5195&=&format=webp&quality=lossless&width=929&height=619"></img>
        </div>
        <div
          style={{
            width: "40%",
            margin: "50px 50px",
            padding: "70px",
          }}
        >
          <div className="col-md-10">
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
                  required
                />
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
                  required
                />
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
                  required
                />
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
                  required
                />
              </div>
              <button
                type="submit"
                className="btn"
                style={{ width: "100%", backgroundColor: "#AAD9BB" }}
              >
                註冊
              </button>
            </form>
            <br></br>
            <div>
              <Link to="/login"> 已有帳號？會員登入 </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
