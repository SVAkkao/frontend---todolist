import React, { useState, useEffect, useRef } from 'react';
import Pic from './FormThings/Pic';
import Project from './FormThings/Project';
import Budget from './FormThings/Budget';
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import './color.css';
import './likeStyle.css';
import TextareaAutosize from 'react-textarea-autosize';
import { NavLink } from 'react-router-dom';

const API_HOST = process.env.REACT_APP_API_URL;





function RightSide({ changeMoneyClick, selectedjid, alldata, update_info, selectedTlid }) {
    // const [thinkvalue, setThinkValue] = useState('');
    // const [memoValue, setMemoValue] = useState('');
    const [journeyData, setJourneyData] = useState({});
    const think = useRef(null);
    const memo = useRef(null);
    const aname = useRef(null);


    useEffect(() => {
        const jid = selectedjid;
        const tlid = selectedTlid;
        const filtereListdData = alldata.filter((item) => item.tlid == tlid);
        const filtereJourneydData = filtereListdData[0].journeys.filter((item) => item.jid == jid);
        setJourneyData(filtereJourneydData[0]);
    }, [selectedTlid, alldata, selectedjid]);

    useEffect(() => {
        console.log(journeyData.jreview)
    },
        [journeyData])

    const handleAnameChange = (event) => {
        setJourneyData({
            ...journeyData,
            attraction: {
                ...journeyData.attraction,
                aname: event.target.value,
            },
        });
    };

    const handleUpdateClick = async () => {
        const updateJourneyData = {
            jid: journeyData.jid,
            aname: aname.current.value,
            arrived_date: journeyData.arrived_date,
            arrived_time: journeyData.arrived_time,
            leaved_time: journeyData.leaved_time,
            jmemo: memo.current.value,
            jreview: think.current.value,
            jrate: journeyData.jrate,
            jchecked: journeyData.jchecked,
        };
        // 發送 HTTP 請求，將表單數據提交到服務器
        fetch(API_HOST + "/api/POST/updatejourney",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateJourneyData),
            }
        )
            .then((response) => {
                console.log(response.json());
                update_info();
            })
            .then(() => {

            });
    }

    const addBudgetClick = (selectedjid) => {
        fetch(API_HOST + "/api/POST/addjbudget",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        jid: selectedjid,
                        jbname: "",
                        jbamount: 0
                    }
                ),
            }
        )
            .then(() => {
                update_info();
            })
    }


    if (!journeyData || !selectedTlid || !selectedjid || !alldata) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }



    return (
        <>
            <Row className='m-4'>
                <Col className='text-center'>
                    {journeyData.attraction && (
                        <Form.Control
                            ref={aname}
                            style={{ borderColor: 'transparent' }}
                            className='text1 p-2 m-4 text-center'
                            value={journeyData.attraction.aname}
                            onChange={handleAnameChange}
                            type="text"
                            placeholder="請輸入標題"
                        />
                    )}
                </Col>
            </Row>
            <Row>
                <Col sm={3}></Col>
                <Col sm={4}>
                    <a onClick={changeMoneyClick}>費用管理<img src='/UserListSource/money.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' /></a>
                    {/* <NavLink to='/money'>
                        <a id='money' style={{color: '#939393'}}>費用管理<img src='/UserListSource/money.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' /></a>
                    </NavLink> */}
                </Col>
                <Col className='text-right' sm={4}>
                    <NavLink to='/ratings'>
                        <a id='ratings'>留言區<img src='/UserListSource/comment.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' /></a>
                    </NavLink>
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col sm={10}><Form.Label className='text-left '>出發日期</Form.Label></Col>
                <Col sm={1}></Col>

                <Col sm={1}></Col>
                <Col className='text-center' sm={10}>
                    <Form.Control
                        value={journeyData.arrived_date}
                        type="date" />
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col sm={10}><Form.Label className='text-left '>時間</Form.Label></Col>
                <Col sm={1}></Col>

                <Col sm={1}></Col>
                <Col className='text-center' sm={5}>
                    <Form.Control
                        value={journeyData.arrived_time != null ? journeyData.arrived_time : "00:00:00"}
                        type="time" />
                </Col>
                <Col className='text-center' sm={5}>
                    <Form.Control
                        value={journeyData.leaved_time != null ? journeyData.leaved_time : "00:00:00"}
                        type="time" />
                </Col>
                <Col sm={1}></Col>
            </Row>

            {journeyData.jbudgets.map((item, index) => (
                <Budget key={index} budgetData={item} setJourneyData={setJourneyData} />
            ))}

            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Row className='text-right'>
                        <Col sm={5} className="d-flex align-items-center">
                            <Form.Label className='text-left'>感想</Form.Label>
                        </Col>
                        <Col sm={7} className="d-flex justify-content-end">
                            <a><img className='like5' src='/UserListSource/heart.png' style={{ width: "20px", height: '20px', margin: '0 2px' }} /></a>
                            <a><img className='like4' src='/UserListSource/heart.png' style={{ width: "20px", height: '20px', margin: '0 2px' }} /></a>
                            <a><img className='like3' src='/UserListSource/heart.png' style={{ width: "20px", height: '20px', margin: '0 2px' }} /></a>
                            <a><img className='like2' src='/UserListSource/heart.png' style={{ width: "20px", height: '20px', margin: '0 2px' }} /></a>
                            <a><img className='like1' src='/UserListSource/heart.png' style={{ width: "20px", height: '20px', margin: '0 2px' }} /></a>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <TextareaAutosize
                                ref={think}
                                value={journeyData.jreview || ""}
                                onChange={(event) => setJourneyData({ ...journeyData, jreview: event.target.value })}
                                placeholder="抒發感想"
                                className='rounded'
                                style={{ minRows: '50px', width: '100%', padding: '.375rem .75rem', border: 'var(--bs-border-width) solid var(--bs-border-color)' }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Pic></Pic>
            {/* <Project></Project> */}
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col sm={10}><Form.Label className='text-left '>備註</Form.Label></Col>
                <Col sm={1}></Col>
                <Col sm={1}></Col>
                <Col className='text-center' sm={10}>
                    <TextareaAutosize
                        ref={memo}
                        value={journeyData.jmemo || ""}
                        onChange={(event) => setJourneyData({ ...journeyData, jmemo: event.target.value })}
                        placeholder="新增備註"
                        className='rounded'
                        style={{ minRows: '50px', width: '100%', padding: '.375rem .75rem', border: 'var(--bs-border-width) solid var(--bs-border-color)' }}
                    />
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
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
                        <img className='text-left m-2' style={{ width: "32px", height: '32px' }} src="/UserListSource/add.png" alt="Icon" />
                        <Form.Label className='text-left '>新增費用</Form.Label>
                    </button>
                </Col>
                <Col sm={1}>
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
                </Col>
                <Col sm={1}></Col>
            </Row>
        </>
    )
}

export default RightSide