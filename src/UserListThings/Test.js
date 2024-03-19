import React from 'react';
import LogoutBar from '../MemberSystem/LogoutBar';
import { Container, Row, Col, Nav, Navbar, Form, Card } from 'react-bootstrap';






const TravelApp = () => {
  return (
    <>
    <LogoutBar></LogoutBar>
    <Container fluid className="bg-light min-vh-100 d-flex flex-column">
      <Row className="flex-grow-1">
        <Col md={3} className="p-4" style={{backgroundColor:'white'}}>
          <div className="mb-4 text-dark">金城武</div>
          <div className="mb-2 text-dark">未完成</div>
          <div className="mb-2 text-dark">已完成</div>
          <div className="mb-4 text-dark font-weight-bold">{}</div>
          <div className="mb-2 text-dark">臺南之旅</div>
        </Col>

        <Col md={9} className="pt-8" style={{backgroundColor:'#f9f7c9'}}>
          <h2 className="mb-4">來趟盡興的旅行吧!</h2>
          <Row className="mb-4">
            <Col md={4}>
              <Card.Img src="https://images.pexels.com/photos/663487/pexels-photo-663487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Beach" className="rounded" />
            </Col>
            <Col md={4}>
              <Card.Img src="https://images.pexels.com/photos/663487/pexels-photo-663487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Old Town" className="rounded" />
            </Col>
            <Col md={4}>
              <Card.Img src="https://images.pexels.com/photos/663487/pexels-photo-663487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Cityscape" className="rounded" />
            </Col>
          </Row>
          <div className="mt-8">
            <h3 className="mb-2">開始建立旅行 to do list</h3>
            <Form.Control
              type="text"
              placeholder="沒想法嗎?想也可以看看其他人的規劃..."
              className="border border-secondary rounded px-4 py-2"
            />
          </div>
          <Row className="mt-8">
            <Col md={3}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://images.pexels.com/photos/663487/pexels-photo-663487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="City Tour"
                />
                <Card.Body>
                  <Card.Text>城市旅遊</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://images.pexels.com/photos/663487/pexels-photo-663487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Mountain Hiking"
                  />
                <Card.Body>
                <Card.Text>遊覽山水</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://images.pexels.com/photos/663487/pexels-photo-663487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Cultural Tour"
                />
                <Card.Body>
                  <Card.Text>文藝旅行</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default TravelApp;