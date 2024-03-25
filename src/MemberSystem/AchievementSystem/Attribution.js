import React, { useEffect, useState } from "react";
// material conponents
import {
  Avatar,
  Card, CardContent,
  Typography,
  List, ListItem, ListItemAvatar, ListItemText,
  Divider,
} from "@mui/material";
// material icons
import { blue } from "@mui/material/colors";
import CommentIcon from "@mui/icons-material/Comment";
import ListAltIcon from "@mui/icons-material/ListAlt";
// Other
import axios from "axios";
import "./Attribution.css";
import Announce from "./Announce";
import LogoutBar from "../LogoutBar";
import { useUserStore } from "../../stores/user";
// Comment components
import { UsersCommentItem } from "../../RatingRoute/CommentModal/CommentItem/index";

const API_HOST = process.env.REACT_APP_API_URL;

// API calls
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
const getPhotos = () => {
  const token = localStorage.getItem("userToken");
  return axios.get(`${API_HOST}/api/uploaded-images`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
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

const ContributionsPanel = ({ listTitles, comments, photoList, filter, onUpdateList }) => {
  switch (filter) {
    case "comment": return comments.map((comment) => (
        <UsersCommentItem
          key={comment.cid} item={comment}
          onEdit={onUpdateList} onDelete={onUpdateList}
        />
    ));
    case "list": return listTitles.map((title, index) => (
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
  
    default: return <span>Type unknown</span>;
  }
};

const UserIntroduction = () => {
  const { user, getUserPhoto } = useUserStore();

  return (
    <CardContent>
      <br />
      <div style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Avatar
          src={getUserPhoto()}
          style={{ width: 100, height: 100, marginRight: 10 }}
        />
        <Typography variant="h3" sx={{ ml: 2 }}>
          {user.name}
        </Typography>
      </div>
      <br />
      <Announce></Announce>
    </CardContent>
  );
};

const AchievementsPage = () => {
  const [filter, setFilter] = useState("list"); // 新的状态变量，用于筛选显示
  const [userComments, setUserComments] = useState([]);
  const [listTitles, setListTitles] = useState([]);
  const [photoList, setPhotoList] = useState([]);
  const fetchUserListTitles = () => {
    getUserListTitle()
    .then((response) => {
      // 假设返回的数据格式是 { titles: ["标题1", "标题2", ...] }
      setListTitles(response.data.titles);
    })
    .catch((error) => {
      console.error("获取清单标题失败：", error);
    });
  };
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
  const fetchPhotos = async () => {
    try {
      const response = await getPhotos();
      setPhotoList(response.data.result);
    } catch (error) {
      console.error("取得相片失敗：", error);
    }
  };
  const onUpdateList = () => {
    fetchUserComment();
    fetchUserListTitles();
    fetchPhotos();
  };
  useEffect(() => {
    fetchUserComment();
    fetchUserListTitles();
    fetchPhotos();
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
              comments={userComments}
              listTitles={listTitles}
              photoList={photoList}
              onUpdateList={onUpdateList}
            />
          </List>
        </Card>
      </div>
    </div>
  );
};

export default AchievementsPage;
