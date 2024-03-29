import React from 'react'
import './Pre.css';
import WeatherApp from './components/WeatherApp';
import { PreWrapper } from './components/PreWrapper';
import { Row, Col } from 'react-bootstrap';
import LogoutBar from "../../MemberSystem/LogoutBar";
import '../../UserListThings/color.css';


export default function PreTest() {
  return (
    <>
      <LogoutBar />
      <Row className="App bg-color4 vh-100">
        <Col></Col>
        <Col>
          <PreWrapper />
          <WeatherApp />
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}
