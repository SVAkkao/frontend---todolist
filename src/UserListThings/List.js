import React from 'react';
import LogoutBar from '../MemberSystem/LogoutBar';
import { Container, Row, Col} from 'react-bootstrap';
import RightSide from './RightSide';
import LeftSide from './LeftSide';
import './color.css';
import TwoAreaMiddle from './TwoAreaMiddle';
import Fetch from './Fetch';



const List = () => {
  return (
    <>
      <LogoutBar></LogoutBar>
      <Container fluid className='vh-100' >
        <Row className='h-100'>
          <Col sm={3}>
          <Fetch>
              {(data) => <RightSide data={data} />}
            </Fetch>
          </Col>
          <Col sm={6} className='bg-color4'>
            <TwoAreaMiddle></TwoAreaMiddle>
          </Col>
          <Col sm={3}>
            <LeftSide></LeftSide>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default List;