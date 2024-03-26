import React from 'react';
import Fetch from './Fetch';
import LogoutBar from '../MemberSystem/LogoutBar';
import { Row, Col } from 'react-bootstrap';
import IndexMiddle from './Alist/IndexMiddle';
import './color.css';

function Alist() {
    return (
        <>
            <LogoutBar />
            <Row>
                <Col sm={3}>
                    <Fetch />
                </Col>
                <Col sm={9} className='bg-color4'>
                    <IndexMiddle />
                </Col>
            </Row>
        </>
    )
}

export default Alist