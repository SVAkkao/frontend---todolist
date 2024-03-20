import React from 'react';
import LogoutBar from '../MemberSystem/LogoutBar';
import { Container, Row, Col, Nav, Navbar, Form, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';





const TravelApp = () => {
  return (
    <>
      <LogoutBar></LogoutBar>
      <Container fluid className='vh-100' >
        <Row className='h-100'>
          <Col sm={3}>
            <Row style={{ alignItems: 'center' }}>
              <Col>
                <Image className='m-4' src='https://images.pexels.com/photos/20147042/pexels-photo-20147042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' roundedCircle style={{ border: 'grey', width: '150px', height: '150px' }}></Image>
              </Col>
              <Col>
                <p style={{ fontSize: "32px" }}> userName</p>
              </Col>
            </Row>
            <Row className='m-5' style={{ fontSize: "32px" }}>
              <Col>未完成</Col>
              <Col>已完成</Col>
            </Row>
            <Row className='m-5'>
              <Col>
                <Card className='mt-4'>
                  <Card.Body style={{backgroundColor:'#AAD9BB', textAlign: 'center' }}>
                    <Card.Text style={{ fontSize: "32px"}}>
                      我的壯遊之旅
                    </Card.Text>
                  </Card.Body>
                  <Card.Img variant="bottom" src="https://images.pexels.com/photos/17573850/pexels-photo-17573850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ border: 'grey', width: '100%', height: '300px' }} />
                </Card>
              </Col>
            </Row>
            <Row className='m-5'>
              <Col>
                <Card className='mt-4'>
                  <Card.Body style={{backgroundColor:'#AAD9BB', textAlign: 'center' }}>
                    <Card.Text style={{ fontSize: "32px"}}>
                      我的壯遊之旅
                    </Card.Text>
                  </Card.Body>
                  <Card.Img variant="bottom" src="https://images.pexels.com/photos/17573850/pexels-photo-17573850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ border: 'grey', width: '100%', height: '300px' }} />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col sm={6} style={{ backgroundColor: '#F9F7C9' }}>2 of 2</Col>
          <Col sm={3}>3 of 2</Col>
        </Row>
      </Container>
    </>
  );
};

export default TravelApp;