import React, { useState } from 'react';
import LogoutBar from '../MemberSystem/LogoutBar';
import { Container, Row, Col} from 'react-bootstrap';
import RightSide from './RightSide';
import LeftSide from './LeftSide';
import './color.css';
import TwoAreaMiddle from './TwoAreaMiddle';
import Fetch from './Fetch';




const List = () => {

  const [listSelectedTlid, listSetSelectedTlid] = useState(null);
  const giveTlid =  (tlid) => {
    listSetSelectedTlid(tlid);
    // console.log(listSelectedTlid)
};
// console.log(listSelectedTlid)

  return (
    <>
      <LogoutBar></LogoutBar>
      <Container fluid className='vh-100' >
        <Row className='h-100'>
          <Col sm={3}>
          <Fetch onSelect2={giveTlid}>
              {/* {(data,onSelect) => <LeftSide data={data} onSelect={onSelect}/>} */}
            </Fetch>
          </Col>
          <Col sm={6} className='bg-color4'>
            <TwoAreaMiddle selectedTlid ={listSelectedTlid}></TwoAreaMiddle>
          </Col>
          <Col sm={3}>
            <RightSide></RightSide>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default List;