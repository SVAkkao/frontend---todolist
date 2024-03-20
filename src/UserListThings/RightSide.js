import React from 'react'
import {Row, Col, Card} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';


function RightSide() {
    return (
        <>
            <Row style={{ alignItems: 'center' }}>
                <Col>
                    <Image className='m-4' src='https://images.pexels.com/photos/20147042/pexels-photo-20147042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' roundedCircle style={{ border: 'grey', width: '150px', height: '150px' }}></Image>
                </Col>
                <Col>
                    <p style={{ fontSize: "32px" }}> userName</p>
                </Col>
            </Row>
            <Row className='m-5' style={{ fontSize: "28px", justifyContent: 'space-between' }}>
                <Col><a className='supportColor'>未完成</a></Col>
                <Col><a className='supportColor'>已完成</a></Col>
            </Row>
            <Row className='m-5'>
                <Col>
                    <Card className='mt-4'>
                        <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#AAD9BB', textAlign: 'center' }}>
                            <div style={{ flex: '1', textAlign: 'center' }}>
                                <Card.Text style={{ fontSize: "24px" }}>
                                    title
                                </Card.Text>
                            </div>
                            <div>
                                <img style={{ width: "20px", height: '20px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Icon" />
                            </div>
                        </Card.Body>
                        <Card.Img variant="bottom" src="https://images.pexels.com/photos/17573850/pexels-photo-17573850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ border: 'grey', width: '100%', height: '200px' }} />
                    </Card>
                </Col>
                <Row className='mt-1' style={{ alignItems: 'center' }}>
                    <Col><p style={{ fontSize: "20px" }}>yyyy/mm/dd</p></Col>
                    <Col><img style={{ width: "20px", height: '20px', marginBottom: '12px', paddingBottom: '0' }} src="/UserListSource/to.png" alt="Icon" /></Col>
                    <Col><p style={{ fontSize: "20px" }}>yyyy/mm/dd</p></Col>
                </Row>
            </Row>
            <Row className='m-5'>
                <Col>
                    <Card className='mt-4'>
                        <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#AAD9BB', textAlign: 'center' }}>
                            <div style={{ flex: '1', textAlign: 'center' }}>
                                <Card.Text style={{ fontSize: "24px" }}>
                                    title
                                </Card.Text>
                            </div>
                            <div>
                                <img style={{ width: "20px", height: '20px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Icon" />
                            </div>
                        </Card.Body>
                        <Card.Img variant="bottom" src="https://images.pexels.com/photos/17573850/pexels-photo-17573850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ border: 'grey', width: '100%', height: '200px' }} />
                    </Card>
                </Col>
                <Row className='mt-3' style={{ alignItems: 'center' }}>
                    <Col><p style={{ fontSize: "20px" }}>yyyy/mm/dd</p></Col>
                    <Col><img style={{ width: "24px", height: '24px', marginBottom: '12px', paddingBottom: '0' }} src="/UserListSource/to.png" alt="Icon" /></Col>
                    <Col><p style={{ fontSize: "20px" }}>yyyy/mm/dd</p></Col>
                </Row>
            </Row>
            <Row>
                <Col className="text-center"><img className='mb-5' style={{ width: "48px", height: '48px' }} src="/UserListSource/add.png" alt="Icon" /></Col>
            </Row>
        </>
    )
}

export default RightSide