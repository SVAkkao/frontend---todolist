import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Mylist from "./Mylist";

const API_HOST = process.env.REACT_APP_API_URL;
const API_IMAGE = process.env.REACT_APP_IMAGE_URL;

function LeftSide({ data, onSelect }) {
  const [selectedTlid, setSelectedTlid] = useState(null);

  //呼叫使用者資料API
  const getUserApi = () => {
    const token = localStorage.getItem("userToken");
    return axios.get(`${API_HOST}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

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

  
  if (onSelect && typeof onSelect === "function" && selectedTlid !== null) {
    onSelect(selectedTlid);
    //   console.log(onSelect);
    //   console.log("到底");
  }

  const handleButtonClick = (tlid) => {
    setSelectedTlid(tlid);
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <Row style={{ alignItems: "center" }}>
        <Col>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          >
            <Avatar
              src={
                userPhoto ? `${API_IMAGE}${userPhoto}` : "avatar-template.svg"
              }
              style={{ width: 150, height: 150, margin: 20 }}
            />
            <Typography variant="h3" sx={{ ml: 2 }}>
              {userName}
            </Typography>
          </div>
        </Col>
      </Row>
      <Row className="m-5 text2" style={{ justifyContent: "space-between" }}>
        <Col>
          <a className="supportColor">未完成</a>
        </Col>
        <Col>
          <a className="supportColor">已完成</a>
        </Col>
      </Row>
      {data.map((item, index) => (
        <Mylist key={index} data={item} onButtonClick={handleButtonClick} />
      ))}
      <Row>
        <Col className="text-center">
          <img
            className="mb-5"
            style={{ width: "48px", height: "48px" }}
            src="/UserListSource/add.png"
            alt="Icon"
          />
        </Col>
      </Row>
    </>
  );
}

export default LeftSide;
