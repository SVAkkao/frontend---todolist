import React, { useState, useEffect, useRef } from "react";
import JourneyProject from "./JourneyProject";
import Journey from "./Journey";
import "./color.css";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import Day from "./Day";
import { NavLink } from "react-router-dom";

const API_HOST = process.env.REACT_APP_API_URL;

function JourneyList({ journeys, onFocusJourneyProject, update_info, onFocusJourney, setShowJourney, onRemoveJourney, setOutOfTheJourney, setrwdShow }) {
  const journeyListRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON' &&
        event.target.tagName !== "IMG"
      ) {
        if (journeyListRef.current && !journeyListRef.current.contains(event.target)) {
          console.log('You clicked outside of journey list!');
          setOutOfTheJourney(true);
        } else {
          setOutOfTheJourney(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [journeyListRef]);



  if (!journeys) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  // return journeys.map((item, index) => <p key={index}>{JSON.stringify(item)}</p> )
  return (
    <div ref={journeyListRef}>
    {journeys.sort((a, b) => {
      const dateA = new Date(a.arrived_date);
      const dateB = new Date(b.arrived_date);
      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        const timeA = a.arrived_time.split(':').reduce((acc, cur) => acc * 60 + +cur, 0);
        const timeB = b.arrived_time.split(':').reduce((acc, cur) => acc * 60 + +cur, 0);
        if (timeA < timeB) {
          return -1;
        } else if (timeA > timeB) {
          return 1;
        } else {
          return 0;
        }
      }
    }).map((item, index) => (
      <Journey
        key={index}
        journeydata={item}
        update_info={update_info}
        onFocusJourney={onFocusJourney}
        setShowJourney={setShowJourney}
        onRemoveJourney={onRemoveJourney}
        onFocusJourneyProject={onFocusJourneyProject}
        setrwdShow={setrwdShow}
      />
    ))}
  </div>
  );
}

function TotalCost({ costData, setTotalAmount }) {
  const [totalAmountForTwoAreaMiddle, setTotalAmountForTwoAreaMiddle] = useState('');

  useEffect(() => {
    const jTotalAmount = costData.journeys.reduce((acc, item) => {
      if (item.jbudgets) {
        return (
          acc +
          item.jbudgets.reduce((sum, budgetItem) => {
            return sum + Number(budgetItem.jbamount);
          }, 0)
        );
      }
      return acc;
    }, 0);

    const jpTotalAmount = costData.journeys.reduce((acc, journey) => {
      if (journey.journey_projects) {
        const projectTotal = journey.journey_projects.reduce((sum, project) => {
          if (project.jpbudgets) {
            return (
              sum +
              project.jpbudgets.reduce((total, budget) => {
                return total + Number(budget.jpbamount);
              }, 0)
            );
          }
          return sum;
        }, 0);
        return acc + projectTotal;
      }
      return acc;
    }, 0);

    const totalAmount = jTotalAmount + jpTotalAmount;
    setTotalAmount(totalAmount);
    setTotalAmountForTwoAreaMiddle(totalAmount)

  }
    , [costData])


  if (!costData || !costData.journeys || !totalAmountForTwoAreaMiddle) {
    return <div>總共：0元</div>;
  }

  return <div>總共：{totalAmountForTwoAreaMiddle}元</div>;

}


function TwoAreaMiddleXS({ setAllData, selectedTlid, selectedjid, alldata, setrwdShow, update_info, onFocusJourney, setTotalAmount, setShowJourney, onFocusJourneyProject }) {
  const [listdata, setListdata] = useState({
  });
  const [searchJourneyValue, setSearchJourneyValue] = useState('');
  const [searchJourneyProjectValue, setSearchJourneyProjectValue] = useState('');
  const [outOfTheJourney, setOutOfTheJourney] = useState(true);
  const titleName = useRef(null);
  const startDate = useRef(null);
  const endDate = useRef(null);


  // 過濾出 tlid 為特定值的資料
  useEffect(() => {
    const tlid = selectedTlid;
    const filteredData = alldata.filter((item) => item.tlid == tlid);
    console.log(filteredData[0]);
    setListdata(filteredData[0]);
  }, [selectedTlid, alldata]);



  //清單時間日期相關

  const handleStartDateChange = (event) => {
    setListdata({
      ...listdata,
      start_date: event.target.value,
    });
  };

  const handleEndDateChange = (event) => {
    setListdata({
      ...listdata,
      end_date: event.target.value,
    });
  };

  const handleUpdateListClick = async () => {
    const updateListData = {
      tlid: selectedTlid,
      title: titleName.current.value,
      start_date: startDate.current.value,
      end_date: endDate.current.value,
      totalamount: listdata.totalamount,
      tlphoto: listdata.tlphoto,
    };

    const token = localStorage.getItem("userToken");

    fetch(API_HOST + "/api/POST/updatelist",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateListData),
      }
    )
      .then((response) => {
        console.log(response)
        //update list_info();
        setAllData(prevAlldata => {
          return prevAlldata.map(
            (touristList) => {
              if (touristList.tlid === selectedTlid) {

                return {
                  ...touristList,
                  title: titleName.current.value,
                  start_date: startDate.current.value,
                  end_date: endDate.current.value,
                  totalamount: listdata.totalamount,
                  tlphoto: listdata.tlphoto,
                }


              } else {
                return touristList
              }


            }
          )
        }
        )
        //

      })


  };


  //

  //送出景點資料成為行程

  const handleSearchJourneyClick = async () => {
    const addjourneydata = {
      tlid: selectedTlid,
      aname: searchJourneyValue
    };
    // 發送 HTTP 請求，將表單數據提交到服務器
    fetch(API_HOST + "/api/POST/addjourney", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addjourneydata),
    }).then((response) => {
      console.log(response.json());
      update_info();
    });
  };

  //送出項目資料成為行程項目

  const handleSearchJourneyProjectClick = async () => {
    console.log(selectedjid)
    console.log(searchJourneyProjectValue)

    const addjourneyProjectdata = {
      jid: selectedjid,
      pname: searchJourneyProjectValue
    };
    // 發送 HTTP 請求，將表單數據提交到服務器
    fetch(API_HOST + "/api/POST/addjourneyproject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addjourneyProjectdata),
    }).then((response) => {
      console.log(response.json());
      update_info();
    });
  };

  //改title名
  // 監聽滑鼠點擊事件
  function handleClickOutside(event) {
    // 檢查點擊事件是否發生在input元素之外
    if (titleName.current && !titleName.current.contains(event.relatedTarget)) {
      const inputValue = titleName.current.value;
      console.log(inputValue);
      const token = localStorage.getItem("userToken");
      fetch(`${API_HOST}/api/POST/updatelist`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tlid: selectedTlid,
          title: inputValue,
          start_date: listdata.start_date,
          end_date: listdata.end_date
        }),
      }).then(() => {
        update_info();
      });
    }
  }
  // 將滑鼠點擊事件添加到document上

  // 監聽input的改變事件
  const handleTitleChange = (event) => {
    setListdata({
      ...listdata,
      title: event.target.value,
    });
  };




  const onRemoveJourney = (selectedjid) => {
    // 找到要刪除的 tlid 所在的索引
    const index = listdata.journeys.findIndex((item) => item.jid === selectedjid);
    // 使用 filter() 方法過濾出除了被刪除的 tlid 外的其他 tlid
    const otherjids = listdata.journeys.filter((item, i) => i !== index).map((item) => item.jid);
    // 調用 onSelect() 函式來切換到其他的 tlid 清單
    if (otherjids.length > 0) {
      onFocusJourney(otherjids[0]);
    }

    fetch(`${API_HOST}/api/POST/deletejourney`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jid: selectedjid
      })
    })
      .then(() => {
        update_info();
      })
      ;
  }





  if (!listdata || !selectedTlid) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <Row className="sticky-top bg-color4">
        <Row className="m-1">
          <Col className="text-left">
            {/* <a onClick={changeMoneyClick}><img src='/UserListSource/list.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' />返回</a> */}
            <a onClick={() => (setrwdShow("LeftSideXS"))}>
              <img src='/UserListSource/list.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' />
              其他清單</a>
          </Col>
          <Col className="text-left">
            {/* <a onClick={changeMoneyClick}><img src='/UserListSource/list.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' />返回</a> */}
            <a onClick={() => (setrwdShow("RightSpace"))}>
              <img src='/UserListSource/list.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' />
              細部資訊</a>
          </Col>
        </Row>
        <Row className="m-1 justify-content-end">
          <Col xs={11} className="text-center">
            <Form.Control
              ref={titleName}
              value={listdata.title}
              className="text2 p-2 m-4 bg-color4 text-center text-truncate"
              style={{ borderColor: "transparent", justifyContent: 'center' }}
              placeholder="請輸入標題"
              onChange={handleTitleChange}
              onBlur={handleUpdateListClick}
              type="text"
            />
          </Col>
          <Col xs={1}></Col>
        </Row>
        <Row className="m-1">
          <Col xs={5} className="text-center">
            <TotalCost costData={listdata} setTotalAmount={setTotalAmount} />
          </Col>
          <Col xs={1}></Col>
          <Col className="text-center">
            <NavLink to="/prelist">
              <a id="prelist">
                <img
                  src="/UserListSource/bag.png"
                  style={{ width: "20px", height: "20px", paddingBottom: "0" }}
                  className="m-2"
                />
                行前準備
              </a>
            </NavLink>
          </Col>
          <Col xs={1}></Col>
        </Row>
        <Row className="m-2" style={{ alignItems: "center" }}>
          {/* <Col></Col> */}
          <Col className="text-center" xs={5}>
            <Form.Control ref={startDate} value={listdata.start_date} type="date" onChange={handleStartDateChange} onBlur={handleUpdateListClick} />
          </Col>
          <Col className="text-center" xs={1}>
            <img
              src="/UserListSource/to.png"
              style={{ width: "24px", height: "24px", paddingBottom: "0" }}
              alt="The next icon"
            />
          </Col>
          <Col className="text-center" xs={5}>
            <Form.Control ref={endDate} value={listdata.end_date} onChange={handleEndDateChange} type="date" onBlur={handleUpdateListClick} />
          </Col>
          {/* <Col></Col> */}

          {/* <Col></Col> */}
        </Row>
      </Row>
      <JourneyList
        onFocusJourneyProject={onFocusJourneyProject}
        setOutOfTheJourney={setOutOfTheJourney}
        journeys={listdata.journeys}
        update_info={update_info}
        onFocusJourney={onFocusJourney}
        setShowJourney={setShowJourney}
        onRemoveJourney={onRemoveJourney}
        setrwdShow={setrwdShow}
      />
      {/* <Day></Day> */}
      <Row>
        <Col
          style={{
            width: "36px",
            height: "108px",
          }}
          xs={12}></Col>
      </Row>

      <Row className="m-1">
        {/* <Col xs={1}></Col> */}
        <Col xs={12} className="text-center">
          <Form
            className="d-flex flex-column justify-content-end"
          // style={{
          //   position: "absolute",
          //   top: 0,
          //   bottom: 0,
          //   left: 0,
          //   right: 0,
          // }}
          >
            <Row>
              {outOfTheJourney ?
                <Row className="align-items-center justify-content-center p-3"
                  style={{ position: 'fixed', bottom: 10 }}
                >
                  <Col xs={11}>
                    {/* rounded */}
                    <Form.Control

                      value={searchJourneyValue}
                      onChange={(event) => setSearchJourneyValue(event.target.value)}
                      className="p-4 text-center"
                      type="text"
                      placeholder="輸入景點"
                    />
                  </Col>
                  <Col xs={1}>
                    <button
                      type="button"
                      onClick={handleSearchJourneyClick}
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <img
                        src="/UserListSource/send.png"
                        style={{
                          width: "36px",
                          height: "36px",
                          paddingBottom: "0",
                        }}
                      />
                    </button>
                  </Col>
                </Row>
                :
                <Row className="align-items-center justify-content-center p-3"
                  style={{ position: 'fixed', bottom: 10 }}
                >
                  <Col xs={11}>
                    {/* rounded */}
                    <Form.Control

                      value={searchJourneyProjectValue}
                      onChange={(event) => setSearchJourneyProjectValue(event.target.value)}
                      className="p-4 text-center"
                      type="text"
                      placeholder="輸入活動項目"
                    />
                  </Col>
                  <Col xs={1}>
                    <button
                      type="button"
                      onClick={handleSearchJourneyProjectClick}
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <img
                        src="/UserListSource/send.png"
                        style={{
                          width: "36px",
                          height: "36px",
                          paddingBottom: "0",
                        }}
                      />
                    </button>
                  </Col>
                </Row>
              }
            </Row>
          </Form>
        </Col>
        <Col sm={1}></Col>
      </Row >
    </>
  );
}

export default TwoAreaMiddleXS;