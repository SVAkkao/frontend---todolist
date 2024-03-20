import React from 'react'
import JourneyProject from './JourneyProject'
import Journey from './Journey'
import './color.css'
import { Row, Col, Form} from 'react-bootstrap';

function TwoAreaMiddle() {
    return (
        <>
            <Row className='m-4'><Col className='text-center'><p className='text1'>list's title</p></Col></Row>
            <Row className='m-4'><Col className='text-center'><p className='text2'>總金額: xx元</p></Col></Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col className='text-center' sm={4}>
                    <Form.Control type="date" />
                </Col>
                <Col className='text-center' sm={1}>
                    <img src='/UserListSource/to.png' style={{ width: "24px", height: '24px', paddingBottom: '0' }}></img>
                </Col>
                <Col className='text-center' sm={4}>
                    <Form.Control type="date" />
                </Col>
                <Col className='text-center' sm={1}>
                    <a><img src='/UserListSource/bag.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }}></img></a>
                </Col>
                <Col sm={1}></Col>

                <Journey />
                <JourneyProject />
            </Row>
            <Row className='m-4'>
                <Col sm={1}></Col>
                <Col sm={10} style={{ minHeight: '100vh', position: 'relative' }}>
                    <Form className="d-flex flex-column justify-content-end" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                        <Row className="align-items-center justify-content-center">
                            <Col sm={10}>
                                <Form.Control rounded className='p-3 w-100' type="text" placeholder="輸入項目" />
                            </Col>
                            <Col sm={2}>
                                <a><img src='/UserListSource/send.png' style={{ width: "48px", height: '48px', paddingBottom: '0' }} /></a>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col sm={1}></Col>
            </Row>




        </>
    )
}

export default TwoAreaMiddle