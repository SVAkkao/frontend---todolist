import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import './color.css';

function LeftSide() {
    return (
        <>
            <Row className='m-4'>
                <Col className='text-center'><p className='text1'>Journey's title</p></Col>
            </Row>
            <Row>
                <Col sm={8}></Col>
                <Col className='text-right' sm={4}>
                    <a>留言區<img src='/UserListSource/comment.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }} className='m-2' /></a>
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
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
                <Col className='text-center' sm={10}>
                    <Form.Label>感想</Form.Label>
                    <Form.Control type="text" placeholder='抒發感想' />
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col className='text-center' sm={10}>
                    <Form.Label>圖片</Form.Label>
                    <Form.Control type="file" placeholder='上傳圖片' />
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col className='text-center' sm={10}>
                    <Form.Label>備註</Form.Label>
                    <Form.Control type="date" placeholder='新增備註' />
                </Col>
                <Col sm={1}></Col>
            </Row>
        </>
    )
}

export default LeftSide