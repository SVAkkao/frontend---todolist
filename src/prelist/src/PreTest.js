import React, { useState } from 'react';
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
  const [recommendations, setRecommendations] = useState({});

  return (
    <div className='vh-100'>
      <LogoutBar />
      <Row className="App bg-color4 h-100" style={{ overflowY: 'auto' }}>
        <Col md={4} className="h-100">
          <Card className="h-100">
            <Card.Body>
              <WeatherApp setRecommendations={setRecommendations} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="h-100 overflow-y-auto" data-bs-spy="scroll">
          <DndProvider backend={HTML5Backend}>
            <PreWrapper />
          </DndProvider>
        </Col>
        <Col md={4} className="h-100">
          <Card className="h-100">
            <Card.Body>
              <h3>規畫行程建議</h3>
              <p>以下依據所選的位置以及當前天氣提供一些行前建議以及景點推薦</p>
              <RecommendationsList recommendations={recommendations} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}