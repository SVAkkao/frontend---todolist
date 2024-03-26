import React, { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Mylist from "./Mylist";
import { useUserStore } from "../../stores/user";
import { ajaxAddList, ajaxRemoveList } from "./api";

// Components
function TripLists({ list, finishedSelected, onButtonClick, onRemove }) {
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
    <Mylist
      key={item.tlid}
      data={item}
      onButtonClick={onButtonClick}
      onRemove={onRemove}
    />
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
  const nonDefaultBtnStyle = {
    backgroundColor: 'transparent',
    border: 'none'
  };
  return <Row className="m-4 text2" style={{ justifyContent: 'space-between' }}>
    <Col sm={5}>
      <button type="button" className="supportColor text-left w-100 click-icon" style={nonDefaultBtnStyle}>
        <span onClick={() => handleBtnClick(false)} style={unfinishedStyle}>
          未完成
        </span>
      </button>
    </Col>
    <Col sm={5}>
      <button type="button" className="supportColor text-left w-100 click-icon" style={nonDefaultBtnStyle}>
        <span onClick={() => handleBtnClick(true)} style={finishedStyle}>
          已完成
        </span>
      </button>
    </Col>
  </Row>;
}
function AddListBtn({ postAddList }) {
  return <Row>
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
          alt="Add icon"
        />
      </button>
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
  const onRemove = (tlid) => {
    ajaxRemoveList(tlid).then( () => {
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
        onRemove={onRemove}
        finishedSelected={finishedSelected}
      />
      <AddListBtn
        postAddList={postAddList}
      />
    </>
  );
}

export default LeftSide;

