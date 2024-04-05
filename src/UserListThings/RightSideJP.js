import React, { useState, useEffect, useRef } from "react";
import Pic from "./FormThings/Pic";
import Project from "./FormThings/Project";
import Budget from "./FormThings/Budget";
import { BiArrowBack } from "react-icons/bi";
import { Row, Col, Form, Spinner, Carousel } from "react-bootstrap";
import "./color.css";
import TextareaAutosize from "react-textarea-autosize";
import { NavLink } from "react-router-dom";
import { FaImages } from "react-icons/fa";
import RatingComponent from "./RatingComponent";
import BudgetJp from "./FormThings/BudgetJp";
import PicJp from "./FormThings/PicJp";
import ImgitemJp from "./FormThings/ImgitemJp";


const API_HOST = process.env.REACT_APP_API_URL;

function RightSideJP({
    changeMoneyClick,
    selectedjid,
    alldata,
    update_info,
    selectedTlid,
    setAllData,
    selectedjpid,
}) {
    // const [thinkvalue, setThinkValue] = useState('');
    // const [memoValue, setMemoValue] = useState('');

    const [journeyProjectData, setJourneyProjectData] = useState({});
    const [journeyData, setJourneyData] = useState({});
    const [sidebarContent, setSidebarContent] = useState("default");
    const changePhotoClick = () => {
        setSidebarContent("addAlbum"); // 更改側邊欄為新增相簿的介面
    };
    // 重置側邊欄內容為默認的介面
    const resetSidebarContent = () => {
        setSidebarContent("default");
    };
    const think = useRef(null);
    const memo = useRef(null);
    const pname = useRef(null);
    const jpStartDate = useRef(null);
    const jpStartTime = useRef(null);
    const jpEndTime = useRef(null);


    useEffect(() => {
        console.log(selectedjid)
        console.log(selectedTlid)
        console.log(selectedjpid)

        const jid = selectedjid;
        const tlid = selectedTlid;
        const jpid = selectedjpid
        const filteredListdData = alldata.filter((item) => item.tlid == tlid);
        const filteredJourneyData = filteredListdData[0].journeys.filter(
            (item) => item.jid == jid
        );
        setJourneyData(filteredJourneyData[0])
        const filteredJourneyProjectData = filteredJourneyData[0].journey_projects.filter((item) => item.jpid == jpid);
        setJourneyProjectData(filteredJourneyProjectData[0]);
    }, [selectedTlid, alldata, selectedjid, selectedjpid]);

    //handle畫面的各種改變
    const handlePnameChange = (event) => {
        setJourneyProjectData({
            ...journeyProjectData,
            project: {
                ...journeyProjectData.project,
                pname: event.target.value,
            },
        });
    };

    // const handleJpStartDateChange = (event) => {
    //     setJourneyProjectData({
    //         ...journeyProjectData,
    //         jpstart_date: event.target.value,
    //     });
    // };

    const handleJpStartTimeChange = (event) => {
        setJourneyProjectData({
            ...journeyProjectData,
            jpstart_time: event.target.value,
        });
    };

    const handleJpEndTimeChange = (event) => {
        setJourneyProjectData({
            ...journeyProjectData,
            jpend_time: event.target.value,
        });
    };

    const handleJprateChange = (newRating) => {
        setJourneyProjectData({
            ...journeyProjectData,
            jprate: newRating,
        });
    };

    const handleJpbnameChange = (event, budgetDatajpbid) => {
        setJourneyProjectData((prevJourneyProjectData) => {
            const updatedJpbudgets = prevJourneyProjectData.jpbudgets.map((item) => {
                if (item.jpbid === budgetDatajpbid) {
                    return {
                        ...item,
                        jpbname: event.target.value,
                    };
                }
                return item;
            });
            return {
                ...prevJourneyProjectData,
                jpbudgets: updatedJpbudgets,
            };
        });
    };

    const handleJpbamountChange = (event, budgetDatajpbid) => {
        setJourneyProjectData((prevJourneyProjectData) => {
            const updatedJpbudgets = prevJourneyProjectData.jpbudgets.map((item) => {
                if (item.jpbid === budgetDatajpbid) {
                    return {
                        ...item,
                        jpbamount: event.target.value,
                    };
                }
                return item;
            });
            return {
                ...prevJourneyProjectData,
                jpbudgets: updatedJpbudgets,
            };
        });
    };
    //
    const deleteJpbamount = (budgetDatajpbid) => {
        fetch(API_HOST + "/api/POST/deletejpbudget", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jpbid: budgetDatajpbid,
            }),
        }).then((r) => {
            setAllData((prevAlldata) => {
                return prevAlldata.map((touristList) => {
                    if (touristList.tlid === selectedTlid) {
                        return {
                            ...touristList,
                            journeys: touristList.journeys.map((journey) => {
                                if (journey.jid === selectedjid) {
                                    return {
                                        ...journey,
                                        journey_projects: journey.journey_projects.map((journeyProject) => {
                                            if (journeyProject.jpid === journeyProjectData.jpid) {
                                                return {
                                                    ...journeyProject,
                                                    jpbudgets: journeyProject.jpbudgets.filter((jpbudget) => {
                                                        return jpbudget.jpbid !== budgetDatajpbid;
                                                    }),
                                                };
                                            } else {
                                                return journeyProject;
                                            }
                                        }
                                        )
                                    };
                                } else {
                                    return journey;
                                }
                            }),
                        };
                    } else {
                        return touristList;
                    }
                });
            });
        });
    };

    const deleteJpimage = (imageDatajpiid) => {
        fetch(API_HOST + "/api/POST/deletejpimage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jpiid: imageDatajpiid,
            }),
        }).then((r) => {
            setAllData((prevAlldata) => {
                return prevAlldata.map((touristList) => {
                    if (touristList.tlid === selectedTlid) {
                        return {
                            ...touristList,
                            journeys: touristList.journeys.map((journey) => {
                                if (journey.jid === selectedjid) {
                                    return {
                                        ...journey,
                                        journey_projects: journey.journey_projects.map((journeyProject) => {
                                            if (journeyProject.jpid === journeyProjectData.jpid) {
                                                return {
                                                    ...journeyProject,
                                                    jpimages: journeyProject.jpimages.filter((jpimages) => {
                                                        return jpimages.jpiid !== imageDatajpiid;
                                                    }),
                                                };
                                            } else {
                                                return journeyProject;
                                            }
                                        }
                                        )
                                    };
                                } else {
                                    return journey;
                                }
                            }),
                        };
                    } else {
                        return touristList;
                    }
                });
            });
        });
    };

    const handleUpdateClick = async () => {
        const updateJourneyProjectData = {
            jpid: journeyProjectData.jpid,
            pname: pname.current.value,
            jpstart_date: journeyData.arrived_date,
            jpstart_time: jpStartTime.current.value,
            jpend_time: jpEndTime.current.value,
            jpmemo: memo.current.value,
            jpreview: think.current.value,
            jprate: journeyProjectData.jprate,
            jpchecked: journeyProjectData.jpchecked,
        };
        // 發送 HTTP 請求，將表單數據提交到服務器
        fetch(API_HOST + "/api/POST/updatejourneyproject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateJourneyProjectData),
        }).then(() => {
            // 發送 HTTP 請求，將費用數據提交到服務器
            journeyProjectData.jpbudgets.forEach((item) => {
                fetch(API_HOST + "/api/POST/updatejpbudget", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        jpbid: item.jpbid,
                        jpbname: item.jpbname,
                        jpbamount: item.jpbamount,
                    }),
                });
            });
            // update journey_info();
            setAllData((prevAlldata) => {
                return prevAlldata.map((touristList) => {
                    if (touristList.tlid === selectedTlid) {
                        return {
                            ...touristList,
                            journeys: touristList.journeys.map((journey) => {
                                if (journey.jid === selectedjid) {
                                    return {
                                        ...journey,
                                        journey_projects: journey.journey_projects.map((journeyProject) => {
                                            if (journeyProject.jpid === journeyProjectData.jpid) {
                                                return {
                                                    ...journeyProject,
                                                    jpstart_date: journeyData.arrived_date,
                                                    jpstart_time: journeyProjectData.jpstart_time,
                                                    jpend_time: journeyProjectData.jpend_time,
                                                    jpmemo: memo.current.value,
                                                    jpreview: think.current.value,
                                                    jprate: journeyProjectData.jprate,
                                                    jpchecked: journeyProjectData.checked,
                                                    jpbudgets: journeyProjectData.jpbudgets,
                                                    project: {
                                                        ...journeyProject.project,
                                                        pname: pname.current.value,
                                                    },
                                                };
                                            } else {
                                                return journeyProject;
                                            }
                                        }
                                        )
                                    };
                                } else {
                                    return journey;
                                }
                            }),
                        };
                    } else {
                        return touristList;
                    }
                });
            });

            //
        });
    };

    const addBudgetClick = () => {
        fetch(API_HOST + "/api/POST/addjpbudget", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jpid: journeyProjectData.jpid,
                jpbname: "未命名",
                jpbamount: "0",
            }),
        }).then((response) => {
            update_info();
        });
    };

    if (!journeyProjectData || !selectedTlid || !selectedjid || !alldata || !selectedjpid) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    return (
        <>
            <Row
                className="sticky-top"
                style={{ backgroundColor: "white", zIndex: 2 }}
            >
                {/* <Row> */}
                <Row className="m-4">
                    {/* <Col sm={1}></Col> */}
                    <Col className="text-center">
                        {journeyProjectData.project && (
                            <Form.Control
                                ref={pname}
                                style={{ borderColor: "transparent" }}
                                className="text1 p-2 m-4 text-center text-truncate"
                                value={journeyProjectData.project.pname}
                                onChange={handlePnameChange}
                                type="text"
                                placeholder="請輸入標題"
                                onBlur={handleUpdateClick}
                            />
                        )}
                    </Col>
                    <Col sm={2}></Col>
                </Row>
                <Row className="text-left">
                    <Col sm={1}></Col>
                    <Col sm={4}>
                        <a onClick={changeMoneyClick}>
                            費用管理
                            <img
                                src="/UserListSource/money.png"
                                style={{ width: "20px", height: "20px", paddingBottom: "0" }}
                                className="m-2"
                            />
                        </a>
                        {/* <NavLink to='/money'>
                        <a id='money' style={{color: '#939393'}}>費用管理<img src='/UserListSource/money.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' /></a>
                    </NavLink> */}
                    </Col>
                    <Col className="text-right" sm={4}>
                        <NavLink to="/ratings">
                            <a id="ratings">
                                留言區
                                <img
                                    src="/UserListSource/comment.png"
                                    style={{ width: "20px", height: "20px", paddingBottom: "0" }}
                                    className="m-2"
                                />
                            </a>
                        </NavLink>
                    </Col>
                    <Col sm={3}>
                        <a onClick={changePhotoClick}>
                            相簿
                            <FaImages
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    paddingBottom: "0",
                                    color: "gray",
                                }}
                                className="m-2"
                            />
                        </a>
                    </Col>
                </Row>
            </Row>
            {sidebarContent === "default" && (
                <div>
                    <Row className="m-4" style={{ alignItems: "center" }}>
                        <Col sm={1}></Col>
                        <Col sm={10}>
                            <Form.Label className="text-left ">出發日期</Form.Label>
                        </Col>
                        <Col sm={1}></Col>

                        <Col sm={1}></Col>
                        <Col className="text-center" sm={10}>
                            <Form.Control
                                ref={jpStartDate}
                                value={journeyData.arrived_date}
                                
                                onBlur={handleUpdateClick}
                                type="date" />
                        </Col>
                        <Col sm={1}></Col>
                    </Row>
                    <Row className="m-4" style={{ alignItems: "center" }}>
                        <Col sm={1}></Col>
                        <Col sm={10}>
                            <Form.Label className="text-left ">時間</Form.Label>
                        </Col>
                        <Col sm={1}></Col>

                        <Col sm={1}></Col>
                        <Col className="text-center" sm={5}>
                            <Form.Control
                                ref={jpStartTime}
                                onChange={handleJpStartTimeChange}
                                onBlur={handleUpdateClick}
                                value={
                                    journeyProjectData.jpstart_time != null
                                        ? journeyProjectData.jpstart_time
                                        : "00:00:00"
                                }
                                type="time"
                            />
                        </Col>
                        <Col className="text-center" sm={5}>
                            <Form.Control
                                ref={jpEndTime}
                                onChange={handleJpEndTimeChange}
                                onBlur={handleUpdateClick}
                                value={
                                    journeyProjectData.jpstart_time != null
                                        ? journeyProjectData.jpend_time
                                        : "00:00:00"
                                }
                                type="time"
                            />
                        </Col>
                        <Col sm={1}></Col>
                    </Row>

                    {journeyProjectData.jpbudgets &&
                        journeyProjectData.jpbudgets.map((item, index) => (
                            <BudgetJp
                                deleteJpbamount={deleteJpbamount}
                                handleJpbnameChange={handleJpbnameChange}
                                handleJpbamountChange={handleJpbamountChange}
                                key={index}
                                budgetData={item}
                                handleUpdateClick={handleUpdateClick}
                            />
                        ))}

                    <Row className="m-4" style={{ alignItems: "center" }}>
                        <Col sm={1}></Col>
                        <Col sm={10}>
                            <Row className="text-right">
                                <Col sm={5} className="d-flex align-items-center">
                                    <Form.Label className="text-left">感想</Form.Label>
                                </Col>
                                <Col sm={7} className="d-flex justify-content-end">

                                    <RatingComponent
                                        handleUpdateClick={handleUpdateClick}
                                        handleJrateChange={handleJprateChange}
                                        jRateData={journeyProjectData.jprate}
                                    />


                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <TextareaAutosize
                                        ref={think}
                                        value={journeyProjectData.jpreview || ""}
                                        onChange={(event) =>
                                            setJourneyProjectData({
                                                ...journeyProjectData,
                                                jpreview: event.target.value,
                                            })
                                        }
                                        placeholder="抒發感想"
                                        className="rounded"
                                        style={{
                                            minRows: "50px",
                                            width: "100%",
                                            padding: ".375rem .75rem",
                                            border:
                                                "var(--bs-border-width) solid var(--bs-border-color)",
                                        }}
                                        onBlur={handleUpdateClick}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={1}></Col>
                    </Row>

                    {/* <Project></Project> */}
                    <Row className="m-4" style={{ alignItems: "center" }}>
                        <Col sm={1}></Col>
                        <Col sm={10}>
                            <Form.Label className="text-left ">備註</Form.Label>
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={1}></Col>
                        <Col className="text-center" sm={10}>
                            <TextareaAutosize
                                ref={memo}
                                value={journeyProjectData.jpmemo || ""}
                                onChange={(event) =>
                                    setJourneyProjectData({ ...journeyProjectData, jpmemo: event.target.value })
                                }
                                placeholder="新增備註"
                                className="rounded"
                                style={{
                                    minRows: "50px",
                                    width: "100%",
                                    padding: ".375rem .75rem",
                                    border: "var(--bs-border-width) solid var(--bs-border-color)",
                                }}
                                onBlur={handleUpdateClick}
                            />
                        </Col>
                        <Col sm={1}></Col>
                    </Row>
                    <Row className="m-4" style={{ alignItems: "center" }}>
                        <Col sm={1}></Col>
                        {/* <Col sm={5}>
                    <a>
                        <img className='text-left m-2' style={{ width: "32px", height: '32px' }} src="/UserListSource/add.png" alt="Icon" />
                        <Form.Label className='text-left '>新增項目</Form.Label>
                    </a>
                </Col> */}
                        <Col sm={10}>
                            <button
                                type="button"
                                onClick={addBudgetClick}
                                style={{ border: "none", backgroundColor: "transparent" }}
                            >
                                <img
                                    className="text-left m-2"
                                    style={{ width: "32px", height: "32px" }}
                                    src="/UserListSource/add.png"
                                    alt="Icon"
                                />
                                <Form.Label className="text-left ">新增費用</Form.Label>
                            </button>
                        </Col>
                        {/* <Col sm={1}>
                    <button
                        type="button"
                        onClick={handleUpdateClick}
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
                </Col> */}
                        <Col sm={1}></Col>
                    </Row>
                </div>
            )}
            {sidebarContent === "addAlbum" && (
                <>
                    <Row className="m-4" style={{ alignItems: "center" }}>
                        <Row>
                            <a onClick={resetSidebarContent}>
                                <BiArrowBack size={20} style={{ margin: "2px" }} />
                                返回上層
                            </a>
                            <PicJp
                                journeyProjectDataJpid={journeyProjectData.jpid}
                                update_info={update_info}
                            ></PicJp>
                        </Row>
                        <Row className="m-4">
                              {/* <Col sm={1}></Col> */}
                              <Col
                                // sm={10}
                                style={{
                                    width: "100%",
                                    height: "400px",
                                    // border: "1px solid gray",
                                    overflowY: "auto",
                                    overflowX: 'hidden'
                                }}
                            >
                                {journeyProjectData.jpimages &&
                                    journeyProjectData.jpimages.map((item) => (
                                        <ImgitemJp
                                            key={item.jpiid}
                                            jpimageData={item}
                                            deleteJpimage={deleteJpimage}
                                        />
                                    ))}
                            </Col>
                            {/* <Col sm={1}></Col> */}
                        </Row>
                    </Row>
                </>
            )}
        </>
    );
}

export default RightSideJP;
