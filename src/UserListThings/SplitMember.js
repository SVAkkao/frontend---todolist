import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';

function SplitMember({ partnerData, handlePnnameChange, handlePnamountChange, updateBudgetManage, deletePartner,handlePncheckedChange }) {
    return (
        <>
            <Row className='text-center'>
                <Col sm={1} xs={1}></Col>
                <Col sm={10} xs={10}>
                    <Row>
                        <Col sm={4} xs={4}>
                            <Form.Control
                                type='text'
                                placeholder='人員'
                                onChange={(event) => handlePnnameChange(event, partnerData.pnid)}
                                value={partnerData.pnname}
                                onBlur={updateBudgetManage}
                            />
                        </Col>
                        <Col sm={4} xs={4}>
                            <Form>
                                <Form.Select value={partnerData.pnchecked === '0' ? 'pay' : 'owe'} 
                                onChange={(event) => handlePncheckedChange(event, partnerData.pnid)}
                                
                                >
                                    <option value='pay' selected={partnerData.pnchecked === '0'}>付錢</option>
                                    <option value='owe' selected={partnerData.pnchecked === '1'}>分攤</option>
                                </Form.Select>
                            </Form>
                        </Col>
                        <Col sm={4} xs={4}>
                            <Form.Control
                                type='number'
                                placeholder='金額'
                                min='0'
                                onChange={(event) => handlePnamountChange(event, partnerData.pnid)}
                                value={partnerData.pnamount}
                                onBlur={updateBudgetManage}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col sm={1} xs={1}>
                    <a
                        onClick={(event) => { deletePartner(partnerData.pnid) }}
                    ><img src='/UserListSource/delete.png' style={{ width: "32px", height: '32px', paddingBottom: '0' }} /></a>
                </Col>
            </Row>
        </>
    )
}

export default SplitMember