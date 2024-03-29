import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

function Budget({ budgetData, handleUpdateClick, handleJbnameChange,  handleJbamountChange}) {


    return (
        <Row className='m-4' style={{ alignItems: 'center' }}>
            <Col sm={1}></Col>
            <Col sm={5}><Form.Label className='text-left '>費用名稱</Form.Label></Col>
            <Col sm={5}><Form.Label className='text-left '>費用金額</Form.Label></Col>
            <Col sm={1}></Col>
            <Col sm={1}></Col>
            <Col className='text-center' sm={5}>
                <Form.Control type="text" placeholder='費用名稱' value={budgetData.jbname} onChange={(e) => handleJbnameChange(e.target.value,budgetData.jbid)} onBlur={handleUpdateClick} />
            </Col>
            <Col className='text-center' sm={5}>
                <Form.Control type="number" placeholder='費用金額' min='0' value={budgetData.jbamount} onChange={(e) => handleJbamountChange(e.target.value,budgetData.jbid)} onBlur={handleUpdateClick} />
            </Col>
            <Col sm={1}>
                {/* <div onClick={() => onRemove(data.tlid)}> */}
                <div>
                    <img style={{ width: "20px", height: '20px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Delete icon" />
                </div>
            </Col>
        </Row>
    );

}

export default Budget;