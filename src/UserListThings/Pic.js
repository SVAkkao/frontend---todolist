import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';

function Pic() {
    return (
        <Row className='m-4' style={{ alignItems: 'center' }}>
            <Col sm={1}></Col>
            <Col sm={10}><Form.Label className='text-left '>圖片</Form.Label></Col>
            <Col sm={1}></Col>
            <Col sm={1}></Col>
            <Col className='text-center' sm={10}>
                <Form.Control accept="image/jpeg" type="file" />
            </Col>
            <Col sm={1}></Col>
        </Row>
    )
}

export default Pic