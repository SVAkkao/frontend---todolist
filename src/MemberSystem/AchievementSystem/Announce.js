import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
// import Modal from "@mui/material/Modal";
import Modal from "react-modal";
import { MdGrade } from "react-icons/md"; // 确保您已经安装了react-icons
import { FaMedal } from "react-icons/fa";

function Announce() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const grade = [
    { name: "創建清單", points: "5積分" },
    { name: "新增景點", points: "5積分" },
    { name: "新增景點中的活動", points: "5積分" },
    { name: "新增相片", points: "20積分" },
    { name: "新增評論", points: "20積分" },
  ];

  const levels = [
    { name: "LV.1 新手旅行者", points: "0積分" },
    { name: "LV.2 城市漫步者", points: "500積分" },
    { name: "LV.3 探險家", points: "1,500積分" },
    { name: "LV.4 文化收藏家", points: "3,000積分" },
    { name: "LV.5 國家征服者", points: "5,000積分" },
    { name: "LV.6 環球旅行者", points: "8,000積分" },
    { name: "LV.7 冒險家", points: "12,000積分" },
    { name: "LV.8 旅行達人", points: "17,000積分" },
    { name: "LV.9 旅行大使", points: "23,000積分" },
    { name: "LV.10 世界公民", points: "30,000積分" },
  ];

  return (
    <>
      <div onClick={() => setModalIsOpen(true)}>
        <h5 style={{ cursor: "pointer" }}>
          <MdGrade style={{ margin: "10px", color: "#FFD700" }} />
          積分：
        </h5>
      </div>
      <div onClick={() => setModalIsOpen(true)}>
        <h5 style={{ cursor: "pointer" }}>
          <FaMedal style={{ margin: "10px", color: "#C0C0C0" }} />
          等級：
        </h5>
      </div>

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
        <br></br>
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
      </Modal>
    </>
  );
}

export default Announce;
