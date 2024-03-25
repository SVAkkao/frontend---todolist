import React, { useEffect, useState } from "react";
// material conponents
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
// material icons
import { blue } from "@mui/material/colors";
import ListAltIcon from "@mui/icons-material/ListAlt";
// Components
import Announce from "./Announce";
import LogoutBar from "../LogoutBar";
import { UsersCommentItem } from "../../RatingRoute/CommentModal/CommentItem/index";
// Other
import axios from "axios";
import { useUserStore } from "../../stores/user";
import "./Attribution.css";

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
  return axios.get(`${API_HOST}/api/user-tourlist`, {
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
const ContributionsPanel = ({ listTitles, comments, photoList, filter, onUpdateList }) => {
  const imgalt = (photo, index) => `The ${index + 1} photo: ${photo}`;
  switch (filter) {
    case "comment": return <article className="comments-warpper m-2">
      { comments.map((comment) => ( <UsersCommentItem
          key={comment.cid}
          item={comment}
          onEdit={onUpdateList}
          onDelete={onUpdateList}
        /> )) }
    </article>;
    case "list": return <List style={{ padding: 20 }}>
      {listTitles.map((title, index) => ( <React.Fragment key={index}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <ListAltIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={title} />
          </ListItem>
          {index < listTitles.length - 1 && <Divider />}
      </React.Fragment> ))}
    </List>;
    case "photo": return <article className="images-warpper waterfall-effect m-2">{
        photoList.map( (photo, index) => <section key={photo} className="item m-2">
          <img src={photo} alt={imgalt(photo, index)} />
        </section> )
      }</article>;
    default: return <></>;
  }
};

const UserIntroduction = () => {
  const { user, getUserPhoto } = useUserStore();
  return (<CardContent>
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
    <Announce />
  </CardContent>);
};

const AchievementsPage = () => {
  // 新的状态变量，用于筛选显示
  const [filter, setFilter] = useState("list");
  const [listTitles, setListTitles] = useState([]);
  const [photoList, setPhotoList] = useState([]);
  const [userComments, setUserComments] = useState([]);

  // Actions
  const onUpdateList = () => {
    const api_requestss = Promise.all([
      getUserListTitle(),
      getPhotos(),
      getUserCommentApi(),
    ]);
    api_requestss.then( ([lists, photos, comments]) => {
      // 直接使用response.data來獲取服務器響應的數據
      const titles = lists.data.map((item) => item.tourListTitle);
      setListTitles( titles );
      setPhotoList(photos.data.result);
      setUserComments(comments.data.result);
    });
  };
  
  useEffect(() => {
    onUpdateList();
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
          <ContributionsPanel
            filter={filter}
            comments={userComments}
            listTitles={listTitles}
            photoList={photoList}
            onUpdateList={onUpdateList}
          />
        </Card>
      </div>
    </div>
  );
};

export default AchievementsPage;
