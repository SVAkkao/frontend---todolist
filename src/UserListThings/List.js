import React, { useState, useEffect } from "react";
import LogoutBar from "../MemberSystem/LogoutBar";
import { Row, Col, Spinner } from "react-bootstrap";
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

const RightSpace = ({ selectedjid, alldata, update_info, selectedTlid }) => {
  const [showMoney, setShowMoney] = useState(false);

  const changeMoneyClick = () => {
    setShowMoney(true);
  };

  if (!alldata || !selectedTlid || selectedjid) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else {
    if (showMoney) {
      return <Money />;
    }
    console.log("alldata" + alldata);
    console.log(selectedTlid);
    console.log("selectedjid" + selectedjid);
    return <RightSide changeMoneyClick={changeMoneyClick} selectedjid={selectedjid} alldata={alldata} update_info={update_info} selectedTlid={selectedTlid} />;
  }


}



const List = () => {

  // 原來的fetch
  const [alldata, setAllData] = useState([]);
  // 拿mylist給的tlid
  const [listSelectedTlid, setSelectedTlid] = useState("");
  const [selectedjid, setSelectedjid] = useState("");

  const update_info = () => {
    get_all_info().then((data) => {
      setAllData(data);
    });
  };

  useEffect(() => {
    get_all_info().then((data) => {
      setAllData(data);
      setSelectedTlid(data[0].tlid);
      setSelectedjid(data[0].journeys[0]);
    });
  }, []);


  return (
    <>
      <Row className="h-100">
        <LogoutBar />
        <Col sm={3}>
          <LeftSide
            data={alldata}
            onSelect={setSelectedTlid}
            update_info={update_info}
          />
        </Col>
        <Col sm={6} className="bg-color4">
          <TwoAreaMiddle alldata={alldata} selectedTlid={listSelectedTlid} update_info={update_info} onFocusJourney={setSelectedjid} />
        </Col>
        <Col sm={3}>
          <RightSpace selectedjid={selectedjid} alldata={alldata} update_info={update_info} selectedTlid={listSelectedTlid} />
        </Col>
      </Row>
    </>
  );
};

export default List;
