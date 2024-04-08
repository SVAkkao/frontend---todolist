import React from 'react'
// import Journey from './Journey'
import CarouselImgXS from './CarouselImgXS'
// import JourneyProject from './JourneyProject'
import PagesXS from '../Pages/PagesXS'
import { Row, Col, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../color.css';
import { useUserStore } from "../../stores/user";

function IndexMiddle() {
    const { user } = useUserStore();
    return (<Container>
        <Row className='m-4'>
            <Col className='text-center'>
                <p className='text4'>{user.name}，來趟盡興的旅行吧!</p>
            </Col>
        </Row>
        <CarouselImgXS />
        <Row className='m-4 text-center'>
            {/* <Col xs={1}></Col> */}
            <Col xs={12} className='m-2'>
                <NavLink to='/list' className='rounded text4 p-3' style={{ borderColor: 'transparent', width: '100%', backgroundColor: 'white', color: 'black' }}>
                    開始建立旅行 to do list
                </NavLink>
            </Col>
            {/* <Col xs={1}></Col> */}
        </Row>
        <Row className='m-4 text-center'>
            {/* <Col xs={1}></Col> */}
            <Col xs={12}>
                <PagesXS />
            </Col>
            {/* <Col xs={1}></Col> */}
        </Row>
    </Container>);
}

export default IndexMiddle