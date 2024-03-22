import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginSystem.css";

function NavList() {
  return (
    <div className="navbar-nav ms-auto" id="NavList">
      <Link className=" text-dark " to="/register">
        <div className=" btn btn-light" style={{ marginRight: "10px" }}>
          註冊
        </div>
      </Link>
      <Link className=" text-dark" to="/login">
        <div className=" btn btn-light">登入</div>
      </Link>
    </div>
  );
}

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#AAD9BB", height: "100px" }}
      >
        <div className="container-fluid">
          <div className="container-fluid d-flex flex-nowrap">
            <div className="navbar-brand" style={{ fontSize: "40px" }}>
              <img src="logo.svg" style={{ height: "80px" }}></img>
              清單樂旅
            </div>
            <button
              className="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div>
              <NavList />
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              註冊
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              登入
            </Link>
          </li>
        </ul>
      </div>
      <br></br>
      <h1 style={{ padding: "25px", textAlign: "center", fontWeight: "bold" }}>
        逐項完成，一個旅行TO-DO-LIST，一段美好旅程！
      </h1>
      <h3
        className="responsive-hide"
        style={{
          padding: "0px 150px",
          textAlign: "center",
          color: "gray",
        }}
      >
        透過我們的旅行TO-DO-LIST網站，將你的夢想一步步地轉化為現實。計劃你的下一個冒險，記錄下你想要體驗的一切，然後，讓我們幫助你實現它們。開始你的旅程，盡情探索世界，收集美好回憶！
      </h3>
      <br></br>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          className="desktop-img"
          src="https://media.discordapp.net/attachments/1134860695343738910/1219124252658237471/ariel_wu_A_man_is_arranging_travel_itinerary_with_his_mobile_ph_586179d3-311e-4691-8aa6-d00d36114390.png?ex=660a28f0&is=65f7b3f0&hm=7abac5f5acad6b7f3a105d08416eaf8c05517d18d60f25056d91fd728c62e525&=&format=webp&quality=lossless&width=929&height=619"
          style={{
            margin: "25px",
            width: "45%",
            height: "550px",
          }}
        ></img>
        <img
          className="desktop-img"
          src="https://uizard.io/static/8fada368b591ba3b3c70e72408cb6dee/a8e47/2b300cc852aafa482f574d13f7a80ec60666f9d9-1440x835.png"
          style={{
            margin: "25px",
            width: "45%",
            height: "550px",
          }}
        ></img>
        <img
          className="mobile-img"
          src="https://media.discordapp.net/attachments/1134860695343738910/1220608588800593930/ariel_wu_A_man_is_arranging_travel_itinerary_with_his_mobile_ph_af61d54e-3359-4776-8efe-89bc3efb9425.png?ex=660f8f55&is=65fd1a55&hm=f3767ed5842e78d12459395c81138c9ef1e186c7af987da3437e07f880c4b0d7&=&format=webp&quality=lossless&width=412&height=619"
          alt="Mobile version"
        />
      </div>
    </div>
  );
};

export default HomePage;
