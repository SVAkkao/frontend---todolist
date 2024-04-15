import React, { useState } from 'react';
import './Pre.css';
import WeatherApp from './components/WeatherApp';
import { PreWrapper } from './components/PreWrapper';
import { Row, Col, Card, Nav } from 'react-bootstrap';
import LogoutBar from "../../MemberSystem/LogoutBar";
import '../../UserListThings/color.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RecommendationsList from './components/RecommendationsList';

export default function PreTest() {
  const [activeTab, setActiveTab] = useState('weather');
  const [recommendations, setRecommendations] = useState({});
  const isMobile = window.innerWidth <= 768; // 根據視窗寬度判斷是否為手機端

  return (
    <div className='vh-100'>
      <LogoutBar />
      {isMobile ? (
        <>
          <Nav variant="tabs" activeKey={activeTab}>
            <Nav.Item>
              <Nav.Link eventKey="weather" onClick={() => setActiveTab('weather')}>
                天氣
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="planner" onClick={() => setActiveTab('planner')}>
                行程規劃
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="recommendations" onClick={() => setActiveTab('recommendations')}>
                建議
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Card className="h-100">
            <Card.Body>
              {activeTab === 'weather' && <WeatherApp setRecommendations={setRecommendations} />}
              {activeTab === 'planner' && (
                <Col md={4} className="h-100 overflow-y-auto" data-bs-spy="scroll">
                  <DndProvider backend={HTML5Backend}>
                    <PreWrapper />
                  </DndProvider>
                </Col>
              )}
              {activeTab === 'recommendations' && (
                <div>
                  <h3>規畫行程建議</h3>
                  <p>以下依據所選的位置以及當前天氣提供一些行前建議以及景點推薦</p>
                  <RecommendationsList recommendations={recommendations} />
                </div>
              )}
            </Card.Body>
          </Card>
        </>
      ) : (
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
      )}
    </div>
  );
}