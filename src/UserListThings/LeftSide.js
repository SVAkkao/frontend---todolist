import React, { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
// import Image from "react-bootstrap/Image";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Mylist from "./Mylist";
import { useUserStore } from "../stores/user";

function TripLists({ triplist, handleButtonClick }) {
  if( !Array.isArray(triplist) ) {
    return <p className="text-center">現在還沒有旅遊清單。下一個能悸動你心中地方在哪呢？</p>;
  }
  if( triplist.length < 1 ) {
    return <p className="text-center">現在還沒有旅遊清單。下一個能悸動你心中地方在哪呢？</p>;
  }
  return triplist.map((item, index) => (
    <Mylist key={index} data={item} onButtonClick={handleButtonClick} />
  ));
}

function LeftSide({ data, onSelect }) {
  const [selectedTlid, setSelectedTlid] = useState(null);
  const { user, getUserPhoto } = useUserStore();

  if (onSelect && typeof onSelect === "function" && selectedTlid !== null) {
    onSelect(selectedTlid);
    // console.log(onSelect);
    // console.log("到底");
  }

  const handleButtonClick = (tlid) => {
    setSelectedTlid(tlid);
  };

  if (!data) {
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>;
  }

  return (
    <>
      <Row style={{ alignItems: "center" }}>
        <Col>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          >
            <Avatar
              src={getUserPhoto()}
              style={{ width: 150, height: 150, margin: 20 }}
            />
            <Typography variant="h3" sx={{ ml: 2 }}>
              {user.name}
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
      <TripLists triplist={data.tourist_lists} handleButtonClick={handleButtonClick} />
      <Row>
        <Col className="text-center">
          <img
            className="mb-5"
            style={{ width: "48px", height: "48px" }}
            src="/UserListSource/add.png"
            alt="Add icon"
          />
        </Col>
      </Row>
    </>
  );
}

export default LeftSide;
