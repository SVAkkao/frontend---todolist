import React from 'react'
import './color.css'
import { Row, Col, Form } from 'react-bootstrap';
function Journey() {
    return (
        <Row className='mt-4'>
            <Col sm={1}></Col>
            <Col sm={10}>
                <button className='bg-color2 rounded p-3' style={{ borderColor: 'transparent', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: '1', textAlign: 'center' }}>
                            <Form>
                                <Form.Check
                                    type='checkbox'
                                    label={<div style={{ textAlign: 'center' }}>飛牛牧場</div>}
                                    className='text2'
                                />
                            </Form>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img style={{ width: "24px", height: '24px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Icon" />
                        </div>
                    </div>
                </button>
            </Col>
            <Col sm={1}></Col>
        </Row>
    )
}

export default Journey