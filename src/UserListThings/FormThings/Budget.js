import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';


function Budget() {
    return (
        <Row className='m-4' style={{ alignItems: 'center' }}>
            <Col sm={1}></Col>
            <Col sm={5}><Form.Label className='text-left '>費用名稱</Form.Label></Col>
            <Col sm={5}><Form.Label className='text-left '>費用金額</Form.Label></Col>
            <Col sm={1}></Col>
            <Col sm={1}></Col>
            <Col className='text-center' sm={5}>
                <Form.Control type="text" />
            </Col>
            <Col className='text-center' sm={5}>
                <Form.Control type="number" />
            </Col>
            <Col sm={1}></Col>
        </Row>
    )
}

export default Budget