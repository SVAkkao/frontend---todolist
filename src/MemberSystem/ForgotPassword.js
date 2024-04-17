import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./LoginSystem.css";

const API_HOST = process.env.REACT_APP_API_URL;

function ForgotPassword() {
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

          <spam className="ms-auto"></spam>
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
          className="desktop-img"
        >
          <img src="\UserListSource\forgetpassword.png"></img>
        </div>
        <div className="login-system">
          <div className="col-12 col-md-10">
            <h2>忘記密碼</h2>
            <br></br>
            <div>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    電子信箱
                  </label>
                  <input className="form-control" type="email" name="email" />
                </div>
                <br></br>
                <button
                  type="submit"
                  className="btn"
                  style={{ width: "100%", backgroundColor: "#AAD9BB" }}
                >
                  忘記密碼
                </button>
              </form>
              <br></br>
              <div>
                <Link to="/register"> 註冊會員 </Link>|
                <Link to="/login"> 會員登入 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
