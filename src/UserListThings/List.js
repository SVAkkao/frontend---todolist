import React, { useState, useEffect } from "react";
import LogoutBar from "../MemberSystem/LogoutBar";
import { Container, Row, Col } from "react-bootstrap";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";
import TwoAreaMiddle from "./TwoAreaMiddle";
// import Fetch from "./Fetch";
import "./color.css";

const API_HOST = process.env.REACT_APP_API_URL;

function get_all_info() {
  const getRequestHeaders = () => {
    const token = localStorage.getItem("userToken");
    const headers = new Headers({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    });
    return headers;
  };
  const ajax = fetch(API_HOST + "/api/user_all_informations", {
    method: "GET",
    headers: getRequestHeaders(),
  }).then(response => response.json());
  return ajax;
}

const List = () => {
  // 拿mylist給的tlid
  const [listSelectedTlid, setSelectedTlid] = useState(null);
  // 原來的fetch
  const [alldata, setAllData] = useState([]);
  useEffect(() => {
    const ajax = get_all_info();
    ajax.then((data)=>{
      // console.log(data)
      setAllData(data)
    });
  }, []);
  return (
    <>
      <LogoutBar />
      <Container fluid className="vh-100" >
        <Row className="h-100 w-100">
          <Col sm={3}>
            <LeftSide data={alldata} onSelect={setSelectedTlid} />
          </Col>
          <Col sm={6} className="bg-color4">
            <TwoAreaMiddle selectedTlid={listSelectedTlid} />
          </Col>
          <Col sm={3}>
            <RightSide />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default List;
