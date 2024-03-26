import React, { useState } from 'react';
import Pic from './FormThings/Pic';
import Project from './FormThings/Project';
import Budget from './FormThings/Budget';
import { Row, Col, Form } from 'react-bootstrap';
import './color.css';
import TextareaAutosize from 'react-textarea-autosize';
import { NavLink } from 'react-router-dom';

function RightSide({ changeMoneyClick }) {
    const [think, setThink] = useState('');
    const [memo, setMemo] = useState('');

    const handleThinkChange = (event) => {
        setThink(event.target.value);
    };
    const handleMemoChange = (event) => {
        setMemo(event.target.value);
    };


    return (
        <>
            <Row className='m-4'>
                <Col className='text-center'>
                    <Form.Control
                        // ref={titleName}
                        className='text1 p-2 m-4 text-center'
                        style={{ borderColor: 'transparent' }}
                        placeholder='請輸入標題'
                        // value={areaData.title}
                        // onChange={handleTitleChange}
                        // onBlur={handleClickOutside}
                        type="text"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={3}></Col>
                <Col sm={4}>
                    <a onClick={changeMoneyClick}>費用管理<img src='/UserListSource/money.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' /></a>
                </Col>
                <Col className='text-right' sm={4}>
                    <NavLink to='/ratings'>
                        <a>留言區<img src='/UserListSource/comment.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' /></a>
                    </NavLink>
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col sm={10}><Form.Label className='text-left '>出發時間</Form.Label></Col>
                <Col sm={1}></Col>

                <Col sm={1}></Col>
                <Col className='text-center' sm={5}>
                    <Form.Control type="date" />
                </Col>
                <Col className='text-center' sm={5}>
                    <Form.Control type="time" />
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col sm={10}><Form.Label className='text-left '>回歸時間</Form.Label></Col>
                <Col sm={1}></Col>

                <Col sm={1}></Col>
                <Col className='text-center' sm={5}>
                    <Form.Control type="date" />
                </Col>
                <Col className='text-center' sm={5}>
                    <Form.Control type="time" />
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Budget></Budget>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Row className='text-right'>
                        <Col sm={5} className="d-flex align-items-center">
                            <Form.Label className='text-left'>感想</Form.Label>
                        </Col>
                        <Col sm={7} className="d-flex justify-content-end">
                            <img src='/UserListSource/heart.png' style={{ width: "20px", height: '20px', margin: '0 2px' }} />
                            <img src='/UserListSource/heart.png' style={{ width: "20px", height: '20px', margin: '0 2px' }} />
                            <img src='/UserListSource/heart.png' style={{ width: "20px", height: '20px', margin: '0 2px' }} />
                            <img src='/UserListSource/heart.png' style={{ width: "20px", height: '20px', margin: '0 2px' }} />
                            <img src='/UserListSource/heart.png' style={{ width: "20px", height: '20px', margin: '0 2px' }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <TextareaAutosize
                                value={think}
                                onChange={handleThinkChange}
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
            <Project></Project>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col sm={10}><Form.Label className='text-left '>備註</Form.Label></Col>
                <Col sm={1}></Col>
                <Col sm={1}></Col>
                <Col className='text-center' sm={10}>
                    <TextareaAutosize
                        value={memo}
                        onChange={handleMemoChange}
                        placeholder="新增備註"
                        className='rounded'
                        style={{ minRows: '50px', width: '100%', padding: '.375rem .75rem', border: 'var(--bs-border-width) solid var(--bs-border-color)' }}
                    />
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col sm={5}>
                    <a>
                        <img className='text-left m-2' style={{ width: "32px", height: '32px' }} src="/UserListSource/add.png" alt="Icon" />
                        <Form.Label className='text-left '>新增項目</Form.Label>
                    </a>
                </Col>
                <Col sm={5}>
                    <a>
                        <img className='text-left m-2' style={{ width: "32px", height: '32px' }} src="/UserListSource/add.png" alt="Icon" />
                        <Form.Label className='text-left '>新增費用</Form.Label>
                    </a>
                </Col>
                <Col sm={1}>
                    <a><img src='/UserListSource/send.png' style={{ width: "32px", height: '32px', paddingBottom: '0' }} /></a>
                </Col>
                <Col sm={1}></Col>
            </Row>
        </>
    )
}

export default RightSide