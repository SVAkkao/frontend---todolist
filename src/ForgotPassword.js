import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const API_HOST = process.env.REACT_APP_API_URL;

function ForgotPassword() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#AAD9BB", height: "110px" }}
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
        >
          <img src="https://media.discordapp.net/attachments/1134860695343738910/1219185255269929011/ariel_wu_Forgot_password_confuse_question_mark_simple_soft_colo_febf9640-aa51-44ba-b1cb-674dadb98b4a.png?ex=660a61c0&is=65f7ecc0&hm=b0e6424dab71e25ee1f8936476e756dc55742c5ee6a91571b2c3ab9c9615f25a&=&format=webp&quality=lossless&width=929&height=619"></img>
        </div>
        <div
          style={{
            width: "40%",
            margin: "100px 50px",
            padding: "70px",
          }}
        >
          <div className="col-md-10">
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
