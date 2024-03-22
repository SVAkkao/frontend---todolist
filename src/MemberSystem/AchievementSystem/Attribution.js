import React, { useEffect, useState } from "react";
import axios from "axios";
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
import "./Attribution.css";
import Announce from "./Announce";

const API_HOST = process.env.REACT_APP_API_URL;
const API_IMAGE = process.env.REACT_APP_IMAGE_URL;

const userData = {
  contributions: [
    { type: "to-do-list", content: "訪問故宮" },
    { type: "to-do-list", content: "花東之旅" },
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
const getUserListTitle = () => {
  const token = localStorage.getItem("userToken");
  return axios.get(`${API_HOST}/api/touristlist-title`, {
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
  const [listTitles, setListTitles] = useState([]);

  useEffect(() => {
    if (filter === "list") {
      // 当 filter 为 "list" 时，获取清单标题
      getUserListTitle()
        .then((response) => {
          // 假设返回的数据格式是 { titles: ["标题1", "标题2", ...] }
          setListTitles(response.data.titles);
        })
        .catch((error) => {
          console.error("获取清单标题失败：", error);
        });
    }
  }, [filter]);
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
  } else if (filter === "list") {
    // 假設 contributions 是包含 title 的對象陣列
    return listTitles.map((title, index) => (
      <React.Fragment key={index}>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <ContributionIcon type="to-do-list" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={title} />
        </ListItem>
        {index < listTitles.length - 1 && <Divider />}
      </React.Fragment>
    ));
  }

  // return contributions.map((contribution, index, array) => (
  //   <React.Fragment key={index}>
  //     <ListItem>
  //       <ListItemAvatar>
  //         <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
  //           <ContributionIcon type={contribution.type} />
  //         </Avatar>
  //       </ListItemAvatar>
  //       <ListItemText primary={contribution.content} />
  //     </ListItem>
  //     {index < array.length - 1 && <Divider />}
  //   </React.Fragment>
  // ));
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
      <Announce></Announce>
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
      <div className="mainpage">
        <Card
          sx={{
            maxWidth: "800px",
            minHeight: "84vh",
            m: "auto",
          }}
        >
          <UserIntroduction />
          <div className="button-row">
            {/* Repeat the button element for each button you need */}
            <button className="custom-button" onClick={() => setFilter("list")}>
              清單
            </button>
            <button
              className="custom-button"
              onClick={() => setFilter("photo")}
            >
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
    </div>
  );
};

export default AchievementsPage;
