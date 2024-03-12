import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavList() {
    return <ul className="navbar-nav ms-auto">
        {" "}
        {/* ms-auto 用於將元素推到右側 */}
        <li className="nav-item">
            <Link
                className="nav-link btn btn-light text-dark btn-outline-light"
                to="/register"
                style={{ marginRight: "10px" }}
            >
                Register
            </Link>
        </li>
        <li className="nav-item">
            <Link
                className="nav-link btn btn-light text-dark btn-outline-light"
                to="/login"
            >
                Login
            </Link>
        </li>
    </ul>;
}

const HomePage = () => {
    // const nav_list = NavList();
    return (<div>
        <nav
            className="navbar navbar-expand-lg"
            style={{ backgroundColor: "#28a745" }}
        >
            <div className="container-fluid">
            {/* 在這裡添加標誌或項目名稱 */}
            <div className="navbar-brand text-dark">清單樂旅</div>
            <div className="collapse navbar-collapse" id="navbarNav">
                {<NavList />}
            </div>
            </div>
        </nav>
    </div>);
};

export default HomePage;
