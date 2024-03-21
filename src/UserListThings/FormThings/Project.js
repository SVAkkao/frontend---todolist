import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';

function Project() {
    return (
        <Row className='m-4' style={{ alignItems: 'center' }}>
            <Col sm={1}></Col>
            <Col sm={10}><Form.Label className='text-left '>項目</Form.Label></Col>
            <Col sm={1}></Col>
            <Col sm={1}></Col>
            <Col className='text-center' sm={10}>
                <Form.Control
                    placeholder="新增項目"
                />
            </Col>
        </Row>
    )
}

export default Project