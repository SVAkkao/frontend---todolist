import React from 'react';
import LeftSide from './LeftSide';
import Fetch from './Fetch';
import LogoutBar from '../MemberSystem/LogoutBar';
import { Container, Row, Col } from 'react-bootstrap';
import IndexMiddle from './IndexMiddle';

function Alist() {
    return (
        <>
            <LogoutBar></LogoutBar>
            <Container fluid className='vh-100' >
                <Row className='h-100'>
                    <Col sm={3}>
                        <Fetch>
                            {(data) => <LeftSide data={data} />}
                        </Fetch>
                    </Col>
                    <Col sm={9} className='bg-color4'>
                        <IndexMiddle></IndexMiddle>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Alist