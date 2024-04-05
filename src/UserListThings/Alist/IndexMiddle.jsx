import React from 'react'
// import Journey from './Journey'
import CarouselImg from './CarouselImg'
// import JourneyProject from './JourneyProject'
import Pages from '../Pages/Pages'
import { Row, Col, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../color.css';
import { useUserStore } from "../../stores/user";

function IndexMiddle() {
    const { user } = useUserStore();
    return (<Container>
        <Row className='m-4'>
            <Col className='text-center'>
                <p className='text2'>{user.name}，來趟盡興的旅行吧!</p>
            </Col>
        </Row>
        <CarouselImg />
        <Row className='m-4 text-center'>
            <Col sm={1}></Col>
            <Col sm={10} className='m-2'>
                <NavLink to='/list' className='rounded text2 p-4' style={{ borderColor: 'transparent', width: '100%', backgroundColor: 'white', color: 'black' }}>
                    開始建立旅行 to do list
                </NavLink>
            </Col>
            <Col sm={1}></Col>
        </Row>
        <Row className='m-4 text-center'>
            <Col sm={1}></Col>
            <Col sm={10}>
                <Pages />
            </Col>
            <Col sm={1}></Col>
        </Row>
    </Container>);
}

export default IndexMiddle