import React from 'react'
import Journey from './Journey'
import CarouselImg from './CarouselImg'
import JourneyProject from './JourneyProject'
import Pages from './Pages'
import { Row, Col, Form } from 'react-bootstrap';
import './color.css';


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
                <Pages></Pages>
                <Col sm={1}></Col>
            </Row>
        </>
    )
}

export default IndexMiddle