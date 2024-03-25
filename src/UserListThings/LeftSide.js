import React, { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
// import Image from "react-bootstrap/Image";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Mylist from "./Mylist";
import { useUserStore } from "../stores/user";

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
    return null;
  }
  if (!data.tourist_lists) {
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
      {data.tourist_lists.map((item, index) => (
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
