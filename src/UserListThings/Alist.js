import React from 'react';
import LeftSide from './LeftSide';
import Fetch from './Fetch';
import LogoutBar from '../MemberSystem/LogoutBar';
import { Row, Col } from 'react-bootstrap';
import IndexMiddle from './IndexMiddle';
import './color.css';

function Alist() {
    return (
        <>
            <LogoutBar></LogoutBar>

            <Row>
                <Col sm={3}>
                    <Fetch>
                        {(data) => <LeftSide data={data} />}
                    </Fetch>
                </Col>
                <Col sm={9} className='bg-color4'>
                    <IndexMiddle></IndexMiddle>
                </Col>
            </Row>

        </>
    )
}

export default Alist