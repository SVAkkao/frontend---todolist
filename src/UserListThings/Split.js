import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import SplitMember from './SplitMember';
import { NavLink } from 'react-router-dom';

function Split() {

    return (
        <>
            <Row style={{ alignItems: 'center' }} className='m-4'>
                <Col sm={1} xs={0}></Col>
                <Col sm={5} xs={5}><Form.Label className='text-left'>費用名稱</Form.Label></Col>
                <Col sm={5} xs={5}><Form.Label className='text-left'>費用金額</Form.Label></Col>
                <Col sm={1} xs={1}></Col>

                <Col sm={1} xs={1}></Col>
                <Col className='text-center' sm={5} xs={5}>
                    <Form.Control type="text" placeholder='費用名稱' />
                </Col>
                <Col className='text-center' sm={5} xs={5}>
                    <Form.Control type="number" placeholder='費用金額' />
                </Col>
                <Col sm={1} xs={1}></Col>
            </Row>
            <Row className='mt-4 ms-4'>
                <Col sm={1} xs={0}></Col>
                <Col className="d-flex align-items-center">
                    <Form.Label className='text-left'>同行人員</Form.Label>
                </Col>
                <Col sm={1} xs={1}></Col>
            </Row>
            <SplitMember />
            <Row style={{ alignItems: 'center' }} className='m-4'>
                <Col sm={1} xs={0}></Col>
                <Col sm={5} xs={5}>
                    <a>
                        <img className='text-left m-2' style={{ width: "32px", height: '32px' }} src="/UserListSource/add.png" alt="Icon" />
                        <Form.Label className='text-left'>新增成員</Form.Label>
                    </a>
                </Col>
                <Col><button className='bg-color1 text-right p-2 rounded' style={{ border: 'transparent', color: 'white' }}>計算費用</button></Col>
                <Col sm={1} xs={1}>
                    <a><img src='/UserListSource/delete.png' style={{ width: "32px", height: '32px', paddingBottom: '0' }} /></a>
                </Col>
                <Col sm={1} xs={1}></Col>

            </Row>


        </>
    )
}

export default Split