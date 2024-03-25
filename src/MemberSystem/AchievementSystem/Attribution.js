import React, { useEffect, useState } from "react";
// material conponents
import {
  Dialog,
  DialogTitle,
  DialogContent,
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
// const API_IMAGE = process.env.REACT_APP_IMAGE_URL;

// const userData = {
//   contributions: [
//     { type: "to-do-list", content: "訪問故宮" },
//     { type: "to-do-list", content: "花東之旅" },
//     // 更多贡献...
//   ],
// };

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

// Components
const ContributionIcon = ({ type }) => {
  if (type === "to-do-list") {
    return <ListAltIcon />;
  } else if (type === "comment") {
    return <CommentIcon />;
  }
  return null;
};

const ContributionsPanel = ({ listTitles, comments, filter, onUpdateList }) => {
  if (filter === "comment") {
    return comments.map((comment) => (
      <UsersCommentItem
        key={comment.cid}
        item={comment}
        onEdit={onUpdateList}
        onDelete={onUpdateList}
      />
    ));
  } else if (filter === "list") {
    return (
      <div>
        {listTitles.map((title, index) => (
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
        ))}
      </div>
    );
  }
  return <span>Type unknown</span>;

  // return userData.contributions.map((contribution, index, array) => (
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

  const fetchUserListTitles = () => {
    getUserListTitle()
      .then((response) => {
        // 直接使用response.data來獲取服務器響應的數據
        const titles = response.data.map((item) => item.tourListTitle);
        setListTitles(titles);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
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
  const onUpdateList = () => {
    fetchUserComment();
    fetchUserListTitles();
  };
  useEffect(() => {
    fetchUserComment();
    fetchUserListTitles();
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
              onUpdateList={onUpdateList}
            />
          </List>
        </Card>
      </div>
    </div>
  );
};

export default AchievementsPage;
