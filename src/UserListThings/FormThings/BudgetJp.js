import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

function BudgetJp({ deleteJpbamount, budgetData, handleUpdateClick, handleJpbnameChange, handleJpbamountChange }) {


    return (
        <Row className='m-4' style={{ alignItems: 'center' }}>
            <Col sm={1} xs={1}></Col>
            <Col sm={5} xs={5}><Form.Label className='text-left '>費用名稱</Form.Label></Col>
            <Col sm={5} xs={5}><Form.Label className='text-left '>費用金額(元)</Form.Label></Col>
            <Col sm={1} xs={1}></Col>
            <Col sm={1} xs={1}></Col>
            <Col className='text-center' sm={5} xs={5}>
                <Form.Control type="text" placeholder='費用名稱' value={budgetData.jpbname} onChange={(event) => handleJpbnameChange(event, budgetData.jpbid)} onBlur={handleUpdateClick} />
            </Col>
            <Col className='text-center' sm={5} xs={5}>
                <Form.Control type="number" placeholder='費用金額' min='0' value={budgetData.jpbamount} onChange={(event) => handleJpbamountChange(event, budgetData.jpbid)} onBlur={handleUpdateClick} />
            </Col>
            <Col sm={1} xs={1} title='delete'>
                <button
                    type="button"
                    onClick={() => { deleteJpbamount(budgetData.jpbid) }}
                    style={{ border: "none", backgroundColor: "transparent" }}
                >
                    <div>
                        <img style={{ width: "20px", height: '20px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Delete icon" />
                    </div>
                </button>
            </Col>
        </Row>
    );

}

export default BudgetJp;