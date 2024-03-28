import React, { useState, useEffect, useRef } from "react";
import JourneyProject from "./JourneyProject";
import Journey from "./Journey";
import "./color.css";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import Day from "./Day";
import { NavLink } from "react-router-dom";

const API_HOST = process.env.REACT_APP_API_URL;

function JourneyList({ journeys, update_info, onFocusJourney, setShowJourney }) {
  if (!journeys) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  // return journeys.map((item, index) => <p key={index}>{JSON.stringify(item)}</p> )
  return journeys.map((item, index) => (
    <Journey
      key={index}
      journeydata={item}
      update_info={update_info}
      onFocusJourney={onFocusJourney}
      setShowJourney={setShowJourney}
    />
  ));
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
    return (<Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>);
  }

  return <div>總共：{totalAmountForTwoAreaMiddle}元</div>;

  //   if (!costData || !costData.journeys) {
  //     return (
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     );
  //   }

  //   console.log(costData);

  //     const jTotalAmount = costData.journeys.reduce((acc, item) => {
  //         if (item.jbudgets) {
  //           return (
  //             acc +
  //             item.jbudgets.reduce((sum, budgetItem) => {
  //             return sum + Number(budgetItem.jbamount);
  //           }, 0)
  //         );
  //     }
  //     return acc;
  // }, 0);

  //       const jpTotalAmount = costData.journeys.reduce((acc, journey) => {
  //         if (journey.journey_projects) {
  //           const projectTotal = journey.journey_projects.reduce((sum, project) => {
  //             if (project.jpbudgets) {
  //               return (
  //                 sum +
  //                 project.jpbudgets.reduce((total, budget) => {
  //                 return total + Number(budget.jpbamount);
  //               }, 0)
  //               );
  //             }
  //             return sum;
  //           }, 0);
  //           return acc + projectTotal;
  //         }
  //         return acc;
  //       }, 0);

  //       const totalAmount = jTotalAmount + jpTotalAmount;
  //       setTotalAmount(totalAmount);

  //       return <div>總共：{totalAmount}元</div>;
}


function TwoAreaMiddle({ selectedTlid, alldata, update_info, onFocusJourney, setTotalAmount, setShowJourney }) {
  const [listdata, setListdata] = useState({
  });
  const [searchvalue, setSearchValue] = useState('');
  const titleName = useRef(null);


  // 過濾出 tlid 為特定值的資料
  useEffect(() => {
    const tlid = selectedTlid;
    const filteredData = alldata.filter((item) => item.tlid == tlid);
    console.log(filteredData[0]);
    setListdata(filteredData[0]);
  }, [selectedTlid, alldata]);

  //清單時間日期相關

  //送出景點資料成為行程

  const handleSearchClick = async () => {
    const addjourneydata = {
      tlid: selectedTlid,
      aname: searchvalue,
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
  // const getDefaultTitle = (listdata) => {
  //     if (listdata) {
  //         return listdata.title;
  //     }
  //     return '';
  // };

  // if (!alldata) {
  //     return <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //     </Spinner>;
  // }
  // if( alldata.length < 1 ) {
  //     return <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //     </Spinner>;
  // }
  if (!listdata || !selectedTlid) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <>
      <Row className="m-4">
        <Col className="text-center">
          <Form.Control
            ref={titleName}
            value={listdata.title}
            className="text1 p-2 m-4 bg-color4 text-center"
            style={{ borderColor: "transparent" }}
            placeholder="請輸入標題"
            onChange={handleTitleChange}
            onBlur={handleClickOutside}
            type="text"
          />
        </Col>
      </Row>
      <Row className="m-4">
        <Col className="text-center">
          <TotalCost costData={listdata} setTotalAmount={setTotalAmount} />
        </Col>
      </Row>
      <Row className="m-4" style={{ alignItems: "center" }}>
        {/* <Col sm={1}></Col> */}
        <Col className="text-center" sm={4}>
          <Form.Control value={listdata.start_date} type="date" />
        </Col>
        <Col className="text-center" sm={1}>
          <img
            src="/UserListSource/to.png"
            style={{ width: "24px", height: "24px", paddingBottom: "0" }}
            alt="The next icon"
          />
        </Col>
        <Col className="text-center" sm={4}>
          <Form.Control value={listdata.end_date} type="date" />
        </Col>
        <Col className="text-center" sm={2}>
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
        <Col sm={1}></Col>
        <JourneyList journeys={listdata.journeys} update_info={update_info} onFocusJourney={onFocusJourney} setShowJourney={setShowJourney} />
        {/* <Day></Day> */}
      </Row>
      <Row className="m-4">
        <Col sm={1}></Col>
        <Col sm={10} style={{ minHeight: "100vh", position: "relative" }}>
          <Form
            className="d-flex flex-column justify-content-end"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <Row className="align-items-center justify-content-center">
              <Col sm={10}>
                {/* rounded */}
                <Form.Control
                  value={searchvalue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  className="p-3 w-100"
                  type="text"
                  placeholder="輸入景點"
                />
              </Col>
              <Col sm={2}>
                <button
                  type="button"
                  onClick={handleSearchClick}
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <img
                    src="/UserListSource/send.png"
                    style={{
                      width: "48px",
                      height: "48px",
                      paddingBottom: "0",
                    }}
                    alt="A sent icon"
                  />
                </button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </>
  );
}

export default TwoAreaMiddle;
