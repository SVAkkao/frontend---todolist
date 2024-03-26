import React from 'react';
import Money from './Money';
import LogoutBar from '../MemberSystem/LogoutBar';
import TwoAreaMiddle from './TwoAreaMiddle';
// import Fetch from './Fetch';
// import LeftSide from './LeftSide';
import { Container, Row, Col} from 'react-bootstrap';

function SplitCost() {
    return (
        <>
            <LogoutBar></LogoutBar>
            <Container fluid className='vh-100' >
                <Row className='h-100 w-100'>
                    <Col sm={3}>
                        {/* <Fetch onSelect2={giveTlid}>
                            {(data,onSelect) => <LeftSide data={data} onSelect={onSelect}/>}
                        </Fetch> */}
                    </Col>
                    <Col sm={6} className='bg-color4'>
                        <TwoAreaMiddle></TwoAreaMiddle>
                    </Col>
                    <Col sm={3}>
                        <Money></Money>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SplitCost