import React from 'react'
import Journey from './Journey'
import CarouselImg from './CarouselImg'
import JourneyProject from './JourneyProject'
import { Row, Col, Form } from 'react-bootstrap';
import './color.css';
import './hover.css';


function IndexMiddle() {
    return (
        <>
            <Row className='m-4'><Col className='text-center'><p className='text2'>來趟盡興的旅行吧!</p></Col></Row>
            <CarouselImg />

            <Row className='mt-4'>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <button className='rounded p-3 text2' style={{ borderColor: 'transparent', width: '100%', backgroundColor: 'white' }}>
                        開始建立旅行 to do list
                    </button>
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Row className='m-4 text-center'>
                <Col sm={1}></Col>
                <Col>
                    <a className='book'><img src='/UserListSource/book.png' style={{ width: "48px", height: '48px', paddingBottom: '0' }}></img></a>
                    <p className='bookTitle'>文藝</p>
                </Col>
                <Col>
                    <a className='aboard'><img src='/UserListSource/aboard.png' style={{ width: "48px", height: '48px', paddingBottom: '0' }}></img></a>
                    <p className='aboardTitle'>國外旅行</p>
                </Col>
                <Col>
                    <a className='hiking'><img src='/UserListSource/hiking.png' style={{ width: "48px", height: '48px', paddingBottom: '0' }}></img></a>
                    <p className='hikingTitle'>戶外</p>
                </Col>
                <Col>
                    <a className='history'><img src='/UserListSource/castle.png' style={{ width: "48px", height: '48px', paddingBottom: '0' }}></img></a>
                    <p className='historyTitle'>歷史</p>
                </Col>
                <Col>
                    <a className='ship'><img src='/UserListSource/ship.png' style={{ width: "48px", height: '48px', paddingBottom: '0' }}></img></a>
                    <p className='shipTitle'>水上</p>
                </Col>
                <Col>
                    <a className='camping'><img src='/UserListSource/campping.png' style={{ width: "48px", height: '48px', paddingBottom: '0' }}></img></a>
                    <p className='campingTitle'>露營</p>
                </Col>
                <Col sm={1}></Col>
            </Row>

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
        </>
    )
}

export default IndexMiddle