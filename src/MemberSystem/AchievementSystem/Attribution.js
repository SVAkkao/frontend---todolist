import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import LogoutBar from "../LogoutBar";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { blue } from "@mui/material/colors";
import CommentIcon from "@mui/icons-material/Comment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import "./Attribution.css";
import { FaMedal } from "react-icons/fa";
import { MdGrade } from "react-icons/md";
// import PointsModal from "./PointsModal";

const API_HOST = process.env.REACT_APP_API_URL;
const API_IMAGE = process.env.REACT_APP_IMAGE_URL;

const userData = {
  points: 1200,
  level: "LV.3‧探險家",
  contributions: [
    { type: "to-do-list", content: "访问故宫" },
    { type: "comment", content: "这里的风景真是太美了！" },
    // 更多贡献...
  ],
};

// API calls
const getUserApi = () => {
  const token = localStorage.getItem("userToken");
  return axios.get(`${API_HOST}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const getUserCommentApi = () => {
  const token = localStorage.getItem("userToken");
  return axios.get(`${API_HOST}/api/user-comment`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Components
const ContributionIcon = ({ type }) => {
  if (type === "to-do-list") {
    return <ListAltIcon />;
  } else if (type === "comment") {
    return <CommentIcon />;
  }
  return null;
};
const ContributionsPanel = ({ contributions, comments, filter }) => {
  if (filter === "comment") {
    return comments.map((comment, index, array) => (
      <React.Fragment key={comment.cid}>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <ContributionIcon type="comment" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={comment.comment} />
        </ListItem>
        {index < array.length - 1 && <Divider />}
      </React.Fragment>
    ));
  }
  return contributions.map((contribution, index, array) => (
    <React.Fragment key={index}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
            <ContributionIcon type={contribution.type} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={contribution.content} />
      </ListItem>
      {index < array.length - 1 && <Divider />}
    </React.Fragment>
  ));
};

const UserIntroduction = () => {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const fetchUser = async () => {
    try {
      const response = await getUserApi();
      setUserName(response.data.name);
      setUserPhoto(response.data.photo);
    } catch (error) {
      console.error("取得用戶訊息失敗：", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

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
    <CardContent>
      <br />
      <div style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Avatar
          src={userPhoto ? `${API_IMAGE}${userPhoto}` : "avatar-template.svg"}
          style={{ width: 100, height: 100, marginRight: 10 }}
        />
        <Typography variant="h3" sx={{ ml: 2 }}>
          {userName}
        </Typography>
      </div>
      <br />
      <h5>
        <MdGrade
          style={{ margin: "10px", color: "#FFD700", cursor: "pointer" }}
          onClick={() => setModalIsOpen(true)}
        />
        積分：{userData.points}
      </h5>
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
      <h5>
        <FaMedal
          style={{ margin: "10px", color: "#C0C0C0", cursor: "pointer" }}
          onClick={() => setModalIsOpen(true)}
        />
        等級：{userData.level}
      </h5>
    </CardContent>
  );
};

const AchievementsPage = () => {
  const [filter, setFilter] = useState("all"); // 新的状态变量，用于筛选显示
  const [userComments, setUserComments] = useState([]);
  /**
   * Get the user's comments and add it into the list.
   */
  const fetchUserComment = async () => {
    try {
      const response = await getUserCommentApi();
      setUserComments(response.data.result);
    } catch (error) {
      console.error("取得留言失敗：", error);
    }
  };
  useEffect(() => {
    fetchUserComment();
  }, []);

  return (
    <div style={{ backgroundColor: "#fffeef" }}>
      <LogoutBar />
      <br />
      <br />
      <Card sx={{ maxWidth: "50%", minHeight: "84vh", m: "auto" }}>
        <UserIntroduction />
        <div className="button-row">
          {/* Repeat the button element for each button you need */}
          <button className="custom-button" onClick={() => setFilter("list")}>
            清單
          </button>
          <button className="custom-button" onClick={() => setFilter("photo")}>
            相片
          </button>
          <button
            className="custom-button"
            onClick={() => setFilter("comment")}
          >
            評論
          </button>
        </div>
        <List style={{ padding: 20 }}>
          <ContributionsPanel
            filter={filter}
            contributions={userData.contributions}
            comments={userComments}
          />
        </List>
      </Card>
    </div>
  );
};

export default AchievementsPage;
