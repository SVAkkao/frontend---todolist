import React from 'react'
import './Pre.css';
import WeatherApp from './components/WeatherApp';
import { PreWrapper } from './components/PreWrapper';
import { Row, Col } from 'react-bootstrap';
import LogoutBar from "../../MemberSystem/LogoutBar";
import '../../UserListThings/color.css';


export default function PreTest() {
  return (
    <div className='vh-100'>
      <LogoutBar />
      <Row className="App bg-color4 h-100"  style={{ overflowY: 'auto'}}>
        <Col></Col>
        <Col>
          <PreWrapper />
          <WeatherApp />
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}
