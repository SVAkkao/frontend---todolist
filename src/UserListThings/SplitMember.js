import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';

function SplitMember() {
    return (
        <>
            <Row className='text-center'>
                <Col sm={1} xs={1}></Col>
                <Col sm={10} xs={10}>
                    <Row>
                        <Col sm={4} xs={4}>
                            <Form.Control type='text' placeholder='人員' />
                        </Col>
                        <Col sm={4} xs={4}>
                            <Form>
                                <Form.Select>
                                    <option value='pay'>付錢</option>
                                    <option value='owe'>分攤</option>
                                </Form.Select>
                            </Form>
                        </Col>
                        <Col sm={4} xs={4}>
                            <Form.Control type='number' placeholder='金額' min='0' />
                        </Col>
                    </Row>
                </Col>
                <Col sm={1} xs={1}></Col>
            </Row>
        </>
    )
}

export default SplitMember