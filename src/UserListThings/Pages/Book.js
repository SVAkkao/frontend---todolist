import React from 'react'
import Card from 'react-bootstrap/Card';
import { Row, Col } from "react-bootstrap";

function Book() {
    return (
        <>
            <Row>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book1.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>老宅後院</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book2.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>歷史博物館</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book3.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>古典咖啡廳</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book4.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>傳統城鎮</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book5.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>寧靜廣場</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book6.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>熱鬧老街</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book7.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>莊嚴廟宇</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book8.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>舒適校園</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book9.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>廣闊公園</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book10.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>傳統城鎮</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book11.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>傳統工藝區</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/book12.avif" />
                        <Card.Body>
                            <Card.Title className='text-center'>自然農場</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        </>
    )
}

export default Book