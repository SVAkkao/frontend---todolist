import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
// import Modal from "@mui/material/Modal";
import Modal from "react-modal";
import { MdGrade } from "react-icons/md"; // 确保您已经安装了react-icons
import { FaMedal } from "react-icons/fa";

const API_HOST = process.env.REACT_APP_API_URL;
function getUserScore() {
  const userToken = localStorage.getItem("userToken");
  return fetch(`${API_HOST}/api/user-score`, {
    method: "GET", // 或者是POST，取決於你的API
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`, // 根據你的API設計調整這裡
    },
  }).then((response) => response.json());
}

function ScoreExplanation() {
  const grade = [
    { name: "創建清單", points: "5積分" },
    { name: "新增景點", points: "5積分" },
    { name: "新增景點中的活動", points: "5積分" },
    { name: "新增相片", points: "20積分" },
    { name: "新增評論", points: "20積分" },
  ];
  const levels = [
    { name: "LV.1 新手旅行者", points: "0積分" },
    { name: "LV.2 城市漫步者", points: "100積分" },
    { name: "LV.3 探險家", points: "1,000積分" },
    { name: "LV.4 文化收藏家", points: "2,000積分" },
    { name: "LV.5 國家征服者", points: "3,000積分" },
    { name: "LV.6 環球旅行者", points: "5,000積分" },
    { name: "LV.7 冒險家", points: "10,000積分" },
    { name: "LV.8 旅行達人", points: "15,000積分" },
    { name: "LV.9 旅行大使", points: "20,000積分" },
    { name: "LV.10 世界公民", points: "30,000積分" },
  ];
  return <section className="explanation">
    <h3>
      <MdGrade style={{ margin: "10px", color: "#FFD700" }} />
      積分說明
    </h3>
    <ul>
      {grade.map((grade, index) => (
        <li
          key={index}
          style={{ fontSize: "20px", margin: "2px" }}
        >{`${grade.name} - ${grade.points}`}</li>
      ))}
    </ul>
    <hr></hr>
    <h3>
      <FaMedal style={{ margin: "10px", color: "#C0C0C0" }} />
      等級說明：
    </h3>
    <ul>
      {levels.map((level, index) => (
        <li
          key={index}
          style={{ fontSize: "20px", margin: "2px" }}
        >{`${level.name} - ${level.points}`}</li>
      ))}
    </ul>
  </section>;
}

function Announce() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [score, setScore] = useState(null); // 狀態用於儲存分數

  useEffect(() => {
    getUserScore()
      .then((data) => {
        // 假設API響應中有一個score字段
        setScore(data.totalScore);
      })
      .catch((error) => {
        console.error("Error fetching score:", error);
      });
  }, []);

  function getUserAchievement(score) {
    if (score >= 30000) {
      return "LV.10 世界公民";
    } else if (score >= 20000) {
      return "LV.9 旅行大使";
    } else if (score >= 15000) {
      return "LV.8 旅行達人";
    } else if (score >= 10000) {
      return "LV.7 冒險家";
    } else if (score >= 5000) {
      return "LV.6 環球旅行者";
    } else if (score >= 3000) {
      return "LV.5 國家征服者";
    } else if (score >= 2000) {
      return "LV.4 文化收藏家";
    } else if (score >= 1000) {
      return "LV.3 探險家";
    } else if (score >= 100) {
      return "LV.2 城市漫步者";
    } else if (score < 100) {
      return "LV.1 新手旅行者";
    } else {
      return "loading";
    }
  }

  return (
    <article className="announce">
      <section className="score">
        <span
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => setModalIsOpen(true)}
        >
          <MdGrade style={{ margin: "10px", color: "#FFD700" }} />
          積分：{score}
        </span>
        <br></br>
        <span
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => setModalIsOpen(true)}
        >
          <FaMedal style={{ margin: "10px", color: "#C0C0C0" }} />
          等級：{getUserAchievement(score)}
        </span>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            padding: "40px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "500px", // 自定义宽度
            height: "600px", // 自定义高度
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)", // 可以调整遮罩层样式
          },
        }}
      >
        <Button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            minWidth: "auto", // 最小宽度调整为auto，防止按钮过宽
          }}
          onClick={() => setModalIsOpen(false)}
        >
          <CloseIcon />
        </Button>
        <ScoreExplanation />
      </Modal>
    </article>
  );
}

export default Announce;
