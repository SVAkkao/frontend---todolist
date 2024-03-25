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
import Spinner from "react-bootstrap/Spinner";
// Other
import { useUserStore } from "../../stores/user";
import "./Attribution.css";
import { getUserListTitle, getPhotos, getUserCommentApi } from "./api";

const EmptyList = () => <p className="text-center m-2">
  沒有資料！要不要試試加點東西看看呢 ;-)
</p>;

function RenderedList({ list }) {
  if (list.length > 0) {
    return <List style={{ padding: 20 }}>{
      list.map((title, index) => (<React.Fragment key={index}>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <ListAltIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={title} />
        </ListItem>
        {index < list.length - 1 && <Divider />}
      </React.Fragment>)
      )
    }</List>;
  }
  return <EmptyList />;
}

function RenderedImageList({ list }) {
  const imgalt = (photo, index) => `The ${index + 1} photo: ${photo}`;
  const photoslist_comp = list.map((photo, index) => <section key={photo} className="item m-2">
    <img src={photo} alt={imgalt(photo, index)} />
  </section>);
  if (list.length < 1) {
    return <EmptyList />;
  }
  return <article className="images-warpper waterfall-effect m-2">{
    photoslist_comp
  }</article>;
}

function RenderedComments({ list, onUpdateList }) {
  const commentslist_comp = list.map((comment) => (<UsersCommentItem
    key={comment.cid}
    item={comment}
    onEdit={onUpdateList}
    onDelete={onUpdateList}
  />));
  if (list.length < 1) {
    return <EmptyList />;
  }
  return <article className="comments-warpper m-2">
    { commentslist_comp }
  </article>;
}

const LoadingComp = () => <section className="text-center m-3">
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
</section>;

const ContributionsPanel = ({ listTitles, comments, photoList, filter, onUpdateList, loading }) => {
  if( loading ) {
    return <LoadingComp />;
  }  
  switch (filter) {
    case "list": return <RenderedList list={listTitles} />
    case "photo": return <RenderedImageList list={photoList} />;
    case "comment": return <RenderedComments list={comments} onUpdateList={onUpdateList} />
    default: return <EmptyList />;
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
  const [loading, setLoading] = useState(false);

  // AJAX lists
  const [listTitles, setListTitles] = useState([]);
  const [photoList, setPhotoList] = useState([]);
  const [userComments, setUserComments] = useState([]);

  // Actions
  const onUpdateList = () => {
    setLoading(true);
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
    }).catch( (e) => {
      alert(e);
    }).finally( () => {
      setLoading(false);
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
            loading={loading}
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
