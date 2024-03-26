import React, { useState, useEffect } from "react";
import LogoutBar from "../MemberSystem/LogoutBar";
import { Row, Col } from "react-bootstrap";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide/LeftSide";
import TwoAreaMiddle from "./TwoAreaMiddle";
import Money from "./Money";
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

const RightSpace = ()=>{
  const [showMoney, setShowMoney] = useState(false);

  const changeMoneyClick = () => {
    setShowMoney(true);
  };
  if (showMoney) {
    return <Money />;
  }

  return <RightSide changeMoneyClick={changeMoneyClick} />;

}



const List = () => {

  // 原來的fetch
  const [alldata, setAllData] = useState([]);
  // 拿mylist給的tlid
  const [listSelectedTlid, setSelectedTlid] = useState("");

  const update_info = () => {
    get_all_info().then((data) => {
      setAllData(data);
    });
  };

  useEffect(() => {
    get_all_info().then((data) => {
      setAllData(data);
      setSelectedTlid(data[0].tlid);
    });
  }, []);


  return (
    <>
      <LogoutBar />
      <Row className="h-100">
        <Col sm={3}>
          <LeftSide
            data={alldata}
            onSelect={setSelectedTlid}
            update_info={update_info}
          />
        </Col>
        <Col sm={6} className="bg-color4">
          <TwoAreaMiddle  alldata={alldata} selectedTlid={listSelectedTlid} update_info={update_info}/>
        </Col>
        <Col sm={3}>
          <RightSpace/>
        </Col>
      </Row>
    </>
  );
};

export default List;
