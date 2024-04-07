import React, { useState, } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MylistXS from "./MylistXS";
import { useUserStore } from "../../stores/user";
import { ajaxAddList, ajaxRemoveList } from "./api";
import { useMediaQuery } from 'react-responsive'

function TripLists({ list, finishedSelected, onButtonClick, onRemove, update_info, setrwdShow }) {
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
    if (finishedSelected) {
      return list.filter(item => isEarlierThanToday(item.end_date));
    }
    return list.filter(item => !isEarlierThanToday(item.end_date));
  };



  return getList(list, finishedSelected).map((item, index) => (
    <MylistXS
      key={item.tlid}
      data={item}
      onButtonClick={onButtonClick}
      onRemove={onRemove}
      update_info={update_info}
    />
  ))
}
function UserInfo() {
  const { user, getUserPhoto } = useUserStore();
  return <Row style={{ alignItems: 'center' }}>
    <Col xs={1}></Col>
    <Col style={{ marginBottom: 2 }} className="text-right" xs={4}>
      <Avatar
        src={getUserPhoto()}
        style={{ height: '80%', width: '80%' }}
        className="m-4"
      />
    </Col>
    <Col style={{ marginBottom: 2 }} className="text-left" xs={6}>
      <Typography variant="h3" sx={{ ml: 2 }}>
        {user.name}
      </Typography>
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
  return <Row className="m-1 text2" style={{ justifyContent: 'space-between' }}>
    <Col xs={6}>
      <button type="button" className="supportColor text-center w-100" style={nonDefaultBtnStyle} onClick={() => handleBtnClick(false)}>
        <span style={unfinishedStyle}>
          未完成
        </span>
      </button>
    </Col>
    <Col xs={6}>
      <button type="button" className="supportColor text-center w-100" style={nonDefaultBtnStyle} onClick={() => handleBtnClick(true)}>
        <span style={finishedStyle}>
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

export default function LeftSide({ data, onSelect, update_info, setrwdShow }) {

  const [finishedSelected, setFinishedSelected] = useState(false);
  const handleBtnClick = (input = true) => {
    // console.log(input ? "已完成" : "未完成");
    setFinishedSelected(input);
  }
  const postAddList = () => {
    ajaxAddList().then(() => {
      update_info();
    });
  };
  const onRemove = (tlid) => {
    // 找到要刪除的 tlid 所在的索引
    const index = data.findIndex((item) => item.tlid === tlid);

    // 使用 filter() 方法過濾出除了被刪除的 tlid 外的其他 tlid
    const otherTlids = data.filter((item, i) => i !== index).map((item) => item.tlid);

    // 調用 onSelect() 函式來切換到其他的 tlid 清單
    if (otherTlids.length > 0) {
      onSelect(otherTlids[0]);
    }


    ajaxRemoveList(tlid).then(() => {
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
      <Row className="sticky-top text-center" style={{ backgroundColor: 'white', translateX: '-20' }}>
        <UserInfo />
        <NavigationLinks
          handleBtnClick={handleBtnClick}
          finishedSelected={finishedSelected}
        />
      </Row>
      <Row className="m-1">
        <Col className="text-left">
          {/* <a onClick={changeMoneyClick}><img src='/UserListSource/list.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' />返回</a> */}
          <a
            onClick={() => { setrwdShow("TwoAreaMiddleXS") }}
          ><img src='/UserListSource/list.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' />返回行程</a>
        </Col>
      </Row>
      <TripLists
        list={data}
        onButtonClick={onSelect}
        onRemove={onRemove}
        finishedSelected={finishedSelected}
        update_info={update_info}
        setrwdShow={setrwdShow}
      />
      <AddListBtn
        postAddList={postAddList}
      />
    </>
  );
};
