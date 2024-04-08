import React from 'react'
import Card from 'react-bootstrap/Card';
import { Row, Col } from "react-bootstrap";

function Outdoor() {
    return (
        <>
            <Row>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor1.avif" />
                        <Card.Body>
                            <Card.Title>登山步行</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor2.avif" />
                        <Card.Body>
                            <Card.Title>自行車旅行</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor3.avif" />
                        <Card.Body>
                            <Card.Title>雪山滑雪</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor4.avif" />
                        <Card.Body>
                            <Card.Title>高爾夫球</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor5.avif" />
                        <Card.Body>
                            <Card.Title>高空跳傘</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor6.avif" />
                        <Card.Body>
                            <Card.Title>沙上駕車</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor7.avif" />
                        <Card.Body>
                            <Card.Title>馬背騎行</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor8.avif" />
                        <Card.Body>
                            <Card.Title>野外烤肉</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor9.avif" />
                        <Card.Body>
                            <Card.Title>公園野餐</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor10.avif" />
                        <Card.Body>
                            <Card.Title>戶外賞鳥</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor11.avif" />
                        <Card.Body>
                            <Card.Title>觀賞日落</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="mb-4 text-center">
                        <Card.Img variant="top" src="/UserListSource/outdoor12.avif" />
                        <Card.Body>
                            <Card.Title>觀測星空</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Outdoor