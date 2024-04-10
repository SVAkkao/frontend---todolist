import React from 'react';
import './Pre.css';
import WeatherApp from './components/WeatherApp';
import { PreWrapper } from './components/PreWrapper';
import { Row, Col, Card } from 'react-bootstrap';
import LogoutBar from "../../MemberSystem/LogoutBar";
import '../../UserListThings/color.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RecommendationsList from './components/RecommendationsList';

export default function PreTest() {
  return (
    <div className='vh-100'>
      <LogoutBar />
      <Row className="App bg-color4 h-100" style={{ overflowY: 'auto' }}>
        <Col md={4} className="h-100">
          <Card className="h-100">
            <Card.Body>
              <WeatherApp />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="h-100" data-bs-spy="scroll"> 
          
         
              <DndProvider backend={HTML5Backend}>
                <PreWrapper />
              </DndProvider>
           
          
        </Col>
        <Col md={4} className="h-100">
          <Card className="h-100">
            <Card.Body>
              <h3>行前建議</h3>
              <p>這裡是一些行前建議的內容...</p>
              <RecommendationsList />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}