import React, { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Mylist from "../Mylist";
import { NavLink } from 'react-router-dom';

import { useUserStore } from "../../stores/user";

const API_HOST = process.env.REACT_APP_API_URL;
// const API_IMAGE = process.env.REACT_APP_IMAGE_URL

// Components
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

function NavigationLinks({ handleBtnClick, setNotFinishActive, notFinishActive, setFinishActive, finishActive }) {
  return <Row className="m-4 text2" style={{ justifyContent: 'space-between' }}>
    <Col sm={5}>
      <NavLink to='/list' className="supportColor text-left w-100">
        <a onClick={() => handleBtnClick(setNotFinishActive)} style={{ borderBottom: notFinishActive ? 'solid 3px #80BCBD' : '0px', color: notFinishActive ? 'black' : '#939393' }}>
          未完成
        </a>
      </NavLink>
    </Col>
    <Col sm={5}>
      <NavLink to='/list' className="supportColor text-right w-100">
        <a onClick={() => handleBtnClick(setFinishActive)} style={{ borderBottom: finishActive ? 'solid 3px #80BCBD' : '0px', color: finishActive ? 'black' : '#939393' }}>
          已完成
        </a>
      </NavLink>
    </Col>
  </Row>;
}

function LeftSide({ data, onSelect, update_info }) {
  const [notFinishActive, setNotFinishActive] = useState(true);
  const [finishActive, setFinishActive] = useState(false);
  const handleBtnClick = (activeSetter) => {
    // 将所有按钮的状态设置为非活动状态
    setNotFinishActive(false);
    setFinishActive(false);
    activeSetter(true);
  }
  const postAddList = () => {
    const token = localStorage.getItem("userToken");
    fetch(`${API_HOST}/api/POST/addlist`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: "請輸入旅行名稱..."
      })
    }).then(r => r.json()).then(()=>{
      update_info();
    }
    );
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
        setNotFinishActive={setNotFinishActive}
        notFinishActive={notFinishActive}
        setFinishActive={setFinishActive}
        finishActive={finishActive}
      />
      {data.map((item, index) => (
        <Mylist key={index} data={item} onButtonClick={onSelect} />
      ))}
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
