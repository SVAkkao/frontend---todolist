import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoutBar from "./LogoutBar";
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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommentIcon from "@mui/icons-material/Comment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import "./Attribution.css";

const API_HOST = process.env.REACT_APP_API_URL;
const API_IMAGE = process.env.REACT_APP_IMAGE_URL;

const userData = {
  nickname: "旅行者",
  avatar: "/path/to/avatar.jpg", // 替换成用户头像的路径
  points: 1200,
  level: "探索家",
  contributions: [
    { type: "to-do-list", content: "访问故宫" },
    { type: "comment", content: "这里的风景真是太美了！" },
    // 更多贡献...
  ],
};

const ContributionIcon = ({ type }) => {
  if (type === "to-do-list") {
    return <ListAltIcon />;
  } else if (type === "comment") {
    return <CommentIcon />;
  }
  return null;
};

const AchievementsPage = () => {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [filter, setFilter] = useState("all"); // 新的状态变量，用于筛选显示
  useEffect(() => {
    // 函数用于获取当前登录用户信息
    const fetchUser = async () => {
      const token = localStorage.getItem("userToken");
      try {
        const response = await axios.get(`${API_HOST}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(response.data.name);
        setUserPhoto(response.data.photo);
      } catch (error) {
        console.error("获取用户信息失败:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div style={{ backgroundColor: "#fffeef" }}>
      <LogoutBar></LogoutBar>
      <br></br>
      <Card sx={{ maxWidth: 800, minHeight: "90vh", m: "auto" }}>
        <CardContent>
          <br></br>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          >
            <Avatar src={`${API_IMAGE}${userPhoto}`} />
            <Typography variant="h5" sx={{ ml: 2 }}>
              {userName}
            </Typography>
          </div>
          <br></br>
          <Typography variant="subtitle1">積分：{userData.points}</Typography>
          <Typography variant="subtitle1">等級：{userData.level}</Typography>
        </CardContent>
        <div className="button-row">
          <button className="custom-button">全部</button>
          {/* Repeat the button element for each button you need */}
          <button className="custom-button">清單</button>
          <button className="custom-button">相片</button>
          <button className="custom-button">評論</button>
        </div>
        <List>
          {userData.contributions.map((contribution, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <ContributionIcon type={contribution.type} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={contribution.content} />
              </ListItem>
              {index < userData.contributions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default AchievementsPage;
