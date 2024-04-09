import React from 'react'
import './Pre.css';
import WeatherApp from './components/WeatherApp';
import { PreWrapper } from './components/PreWrapper';
import { Row, Col } from 'react-bootstrap';
import LogoutBar from "../../MemberSystem/LogoutBar";
import '../../UserListThings/color.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function PreTest() {
  return (
    <div className='vh-100'>
      <LogoutBar />
      <Row className="App bg-color4 h-100" style={{ overflowY: 'auto' }}>
       
        <Col md={4} className="h-100 WeatherApp">
          <WeatherApp / >
        </Col> 
        <Col md={4} className="h-100">
          <DndProvider backend={HTML5Backend}>
            <PreWrapper />
          </DndProvider>
        </Col>
        <Col md={4} className="h-100">
          {/* 在這裡添加行前建議組件或內容 */}
          <h3>行前建議</h3>
          <p>這裡是一些行前建議的內容...</p>
        </Col>
      </Row>
    </div>
  );
}