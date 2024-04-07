import React, { useState, useEffect } from "react";
import LogoutBar from "../MemberSystem/LogoutBar";
import { Row, Col, Spinner } from "react-bootstrap";
import RightSide from "./RightSide";
import RightSideJP from "./RightSideJP";
import RightSideJPXS from "./RightSideJPXS";
import RightSideXS from "./RightSideXS";
import LeftSide from "./LeftSide/LeftSide";
import LeftSideXS from "./LeftSide/LeftSideXS";
import TwoAreaMiddle from "./TwoAreaMiddle";
import TwoAreaMiddleXS from "./TwoAreaMiddleXS";
import Money from "./Money";
// import Fetch from "./Fetch";
import "./color.css";
import { ajaxAddList } from "./LeftSide/api"

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

const RightSpace = ({ setrwdShow, showJourney, selectedjid, alldata, update_info, selectedTlid, totalAmount, setAllData, selectedjpid }) => {
  const [showMoney, setShowMoney] = useState(false);

  const changeMoneyClick = () => {
    setShowMoney(true);
  };

  if (!alldata || !selectedTlid || !selectedjid) {
    return (
      <Spinner animation="border" role="status">
        <span >Loading...</span>
      </Spinner>
    );
  } else {
    if (showMoney) {
      return <Money alldata={alldata} selectedTlid={selectedTlid}  totalAmount={totalAmount} setAllData={setAllData} setShowMoney={setShowMoney} />;
    }

    if (showJourney) {
      return (
        <>
          <div className='d-sm-block d-none'>
            <RightSide setAllData={setAllData} changeMoneyClick={changeMoneyClick} selectedjid={selectedjid} alldata={alldata} update_info={update_info} selectedTlid={selectedTlid} />
          </div>
          <div className='d-sm-none'>
            <RightSideXS setrwdShow={setrwdShow} setAllData={setAllData} changeMoneyClick={changeMoneyClick} selectedjid={selectedjid} alldata={alldata} update_info={update_info} selectedTlid={selectedTlid} />
          </div>
        </>

      );
    }

    return (
      <>
        <div className='d-sm-block d-none'>
          <RightSideJP setAllData={setAllData} changeMoneyClick={changeMoneyClick} selectedjid={selectedjid} alldata={alldata} update_info={update_info} selectedTlid={selectedTlid} selectedjpid={selectedjpid} />
        </div>
        <div className='d-sm-none'>
          <RightSideJPXS setrwdShow={setrwdShow} setAllData={setAllData} changeMoneyClick={changeMoneyClick} selectedjid={selectedjid} alldata={alldata} update_info={update_info} selectedTlid={selectedTlid} selectedjpid={selectedjpid} />
        </div>
      </>
    );
  }
}

const XSArea = ({ onSelect, setAllData, setShowJourney, alldata, selectedjid, selectedTlid, update_info, onFocusJourney, setTotalAmount, onFocusJourneyProject }) => {


  return (

    <LeftSideXS
      data={alldata}
      onSelect={onSelect}
      update_info={update_info}
    />

    // <TwoAreaMiddleXS setAllData={setAllData} setShowJourney={setShowJourney} alldata={alldata} selectedjid={selectedjid} selectedTlid={selectedTlid} update_info={update_info} onFocusJourney={onFocusJourney} setTotalAmount={setTotalAmount} onFocusJourneyProject={onFocusJourneyProject} />

  )

}

const List = () => {

  const [showJourney, setShowJourney] = useState(true);

  // 原來的fetch
  const [alldata, setAllData] = useState([]);
  // 拿mylist給的tlid
  const [listSelectedTlid, setSelectedTlid] = useState("");
  const [selectedjid, setSelectedjid] = useState("");
  const [selectedjpid, setSelectedjpid] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [rwdShow, setrwdShow] = useState("TwoAreaMiddleXS");


  const update_info = () => {
    get_all_info().then((data) => {
      setAllData(data);
    });
  };

  useEffect(() => {
    get_all_info().then((data) => {
      setAllData(data);
      console.log(data)
      setSelectedTlid(data[0].tlid);
      setSelectedjid(data[0].journeys[0].jid);
    });
  }, []);

  const setSelectedTlidAndOther = (data) => {
    setSelectedTlid(data);
    const filtereListdData = alldata.filter((item) => item.tlid == data);
    if (filtereListdData[0].journeys[0] != null) {
      setSelectedjid(filtereListdData[0].journeys[0].jid);
    }
  }

  return (
    <>
      <div className="d-sm-block d-none">
        <Row className="h-100">
          <LogoutBar />
          <Col sm={3} style={{ overflowY: 'scroll', maxHeight: '89.5vh', overflowX: 'hidden' }}>
            <LeftSide
              data={alldata}
              onSelect={setSelectedTlidAndOther}
              update_info={update_info}
            />
          </Col>
          <Col sm={6} xs={12} className="bg-color4" style={{ overflowY: 'auto', maxHeight: '89.5vh', overflowX: 'hidden', zIndex: 2 }}>
            <TwoAreaMiddle setAllData={setAllData} setShowJourney={setShowJourney} alldata={alldata} selectedjid={selectedjid} selectedTlid={listSelectedTlid} update_info={update_info} onFocusJourney={setSelectedjid} setTotalAmount={setTotalAmount} onFocusJourneyProject={setSelectedjpid} />
          </Col>
          <Col sm={3} xs={12} style={{ overflowY: 'scroll', maxHeight: '89.5vh', overflowX: 'hidden', zIndex: 2 }}>
            <RightSpace showJourney={showJourney} setAllData={setAllData} selectedjid={selectedjid} alldata={alldata} update_info={update_info} selectedTlid={listSelectedTlid} totalAmount={totalAmount} selectedjpid={selectedjpid} />
          </Col>
        </Row>
      </div>


      <div className="d-sm-none w-100">
        <Row className="h-100">
          <LogoutBar />
          {/* <Col xs={12} style={{ overflowY: 'scroll', maxHeight: '89.5vh', overflowX: 'auto', display: 'none' }}>
            <LeftSideXS
              data={alldata}
              onSelect={setSelectedTlidAndOther}
              update_info={update_info}
            />
          </Col> */}
          <Col xs={12} className="bg-color4" style={{ overflowY: 'auto', maxHeight: '89.5vh', overflowX: 'auto', zIndex: 2, display: (rwdShow == "LeftSideXS") ? 'block' : 'none' }}>
            <LeftSideXS
              data={alldata}
              onSelect={setSelectedTlidAndOther}
              update_info={update_info}
              setrwdShow={setrwdShow}
            />
          </Col>
          <Col xs={12} className="bg-color4" style={{ overflowY: 'auto', maxHeight: '89.5vh', overflowX: 'auto', zIndex: 2, display: (rwdShow == "TwoAreaMiddleXS") ? 'block' : 'none' }}>
            <TwoAreaMiddleXS 
            onSelect={setSelectedTlidAndOther} 
            setAllData={setAllData} 
            setShowJourney={setShowJourney} 
            alldata={alldata} 
            selectedjid={selectedjid} 
            selectedTlid={listSelectedTlid} 
            update_info={update_info} 
            onFocusJourney={setSelectedjid} 
            setTotalAmount={setTotalAmount} 
            onFocusJourneyProject={setSelectedjpid}
            setrwdShow={setrwdShow}
            />
          </Col>
          <Col xs={12} className="bg-color4" style={{ overflowY: 'auto', maxHeight: '89.5vh', overflowX: 'auto', zIndex: 2, display: (rwdShow == "RightSpace") ? 'block' : 'none' }}>
            <RightSpace 
            showJourney={showJourney} 
            setAllData={setAllData} 
            selectedjid={selectedjid} 
            alldata={alldata} 
            update_info={update_info} 
            selectedTlid={listSelectedTlid} 
            totalAmount={totalAmount} 
            selectedjpid={selectedjpid} 
            setrwdShow={setrwdShow}
            
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default List;
