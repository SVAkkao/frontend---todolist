import React, { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Mylist from "./Mylist";
import { useUserStore } from "../../stores/user";

const API_HOST = process.env.REACT_APP_API_URL;
// const API_IMAGE = process.env.REACT_APP_IMAGE_URL
async function ajaxAddList() {
  const token = localStorage.getItem("userToken");
  const r = await fetch(`${API_HOST}/api/POST/addlist`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: "請輸入旅行名稱..."
    })
  });
  return await r.json();
}


// Components
function TripLists({ list, finishedSelected, onButtonClick }) {
  const isEarlierThanToday = (input) => {
    // Today
    const today = new Date();
    today.setHours(23, 59, 59, 0);

    // Input date
    const inputDate = new Date(input);
    inputDate.setHours(23, 59, 59, 0);
    
    return inputDate < today;
  };
  const getList = (list = [], finishedSelected) => {
    if( finishedSelected ) {
      return list.filter( item => isEarlierThanToday(item.end_date) );
    }
    return list.filter( item => !isEarlierThanToday(item.end_date) );
  };
  return getList(list, finishedSelected).map((item, index) => (
    <Mylist key={index} data={item} onButtonClick={onButtonClick} />
  ))
}
function UserInfo() {
  const { user, getUserPhoto } = useUserStore();
  return <Row style={{ alignItems: 'center' }}>
    <Col>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Avatar
          src={getUserPhoto()}
          style={{ width: 150, height: 150, margin: 20 }}
        />
        <Typography variant="h3" sx={{ ml: 2 }}>
          {user.name}
        </Typography>
      </div>
    </Col>
  </Row>;
}
function NavigationLinks({ handleBtnClick, finishedSelected }) {
  const unfinishedStyle = {
    borderBottom: !finishedSelected ? 'solid 3px #80BCBD' : '0px',
    color: !finishedSelected ? 'black' : '#939393'
  };
  const finishedStyle = {
    borderBottom: finishedSelected ? 'solid 3px #80BCBD' : '0px',
    color: finishedSelected ? 'black' : '#939393'
  };
  return <Row className="m-4 text2" style={{ justifyContent: 'space-between' }}>
    <Col sm={5}>
      <span className="supportColor text-left w-100 click-icon">
        <span onClick={() => handleBtnClick(false)} style={unfinishedStyle}>
          未完成
        </span>
      </span>
    </Col>
    <Col sm={5}>
      <span className="supportColor text-left w-100 click-icon">
        <span onClick={() => handleBtnClick(true)} style={finishedStyle}>
          已完成
        </span>
      </span>
    </Col>
  </Row>;
}

function LeftSide({ data, onSelect, update_info }) {
  const [finishedSelected, setFinishedSelected] = useState(false);
  const handleBtnClick = (input = true) => {
    // console.log(input ? "已完成" : "未完成");
    setFinishedSelected(input);
  }
  const postAddList = () => {
    ajaxAddList().then(()=>{
      update_info();
    });
  };
  if (!data) {
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>;
  }
  return (
    <>
      <UserInfo />
      <NavigationLinks
        handleBtnClick={handleBtnClick}
        finishedSelected={finishedSelected}
      />
      <TripLists
        list={data}
        onButtonClick={onSelect}
        finishedSelected={finishedSelected}
      />
      <Row>
        <Col className="text-center">
          <button
            type="button"
            onClick={postAddList}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <img
              className="mb-5"
              style={{ width: '48px', height: '48px' }}
              src="/UserListSource/add.png"
              alt="Icon"
            />
          </button>
        </Col>
      </Row>
    </>
  );
}

export default LeftSide;
