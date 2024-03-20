import React from 'react'
import {Row, Col, Card} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Mylist from './Mylist';


function RightSide() {
    return (
        <>
            <Row style={{ alignItems: 'center' }}>
                <Col>
                    <Image className='m-4' src='https://images.pexels.com/photos/20147042/pexels-photo-20147042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' roundedCircle style={{ border: 'grey', width: '150px', height: '150px' }}></Image>
                </Col>
                <Col>
                    <p className='text2'> userName</p>
                </Col>
            </Row>
            <Row className='m-5 text2' style={{justifyContent: 'space-between' }}>
                <Col><a className='supportColor'>未完成</a></Col>
                <Col><a className='supportColor'>已完成</a></Col>
            </Row>
            <Mylist />
            <Mylist />
            <Row>
                <Col className="text-center"><img className='mb-5' style={{ width: "48px", height: '48px' }} src="/UserListSource/add.png" alt="Icon" /></Col>
            </Row>
        </>
    )
}

export default RightSide