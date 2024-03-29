import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

function Budget({ budgetData, setJourneyData, handleUpdateClick }) {
    const [jbname, setJbname] = useState("");
    const [jbamount, setJbamount] = useState("0");

    useEffect(() => {
        setJbname(budgetData.jbname);
        setJbamount(budgetData.jbamount);
    }, [
        budgetData
    ])

    useEffect(() => {
        setJourneyData((prevData) => {
            const newJbudgets = prevData.jbudgets.map((item) => {
                if (item.jbid === budgetData.jbid) {
                    return { ...item, jbname, jbamount };
                }
                return item;
            });
            return { ...prevData, jbudgets: newJbudgets };
        });
    }, [setJourneyData]);

    return (
        <Row className='m-4' style={{ alignItems: 'center' }}>
            <Col sm={1}></Col>
            <Col sm={5}><Form.Label className='text-left '>費用名稱</Form.Label></Col>
            <Col sm={5}><Form.Label className='text-left '>費用金額</Form.Label></Col>
            <Col sm={1}></Col>
            <Col sm={1}></Col>
            <Col className='text-center' sm={5}>
                <Form.Control type="text" placeholder='費用名稱' value={jbname} onChange={(e) => setJbname(e.target.value)} onBlur={handleUpdateClick} />
            </Col>
            <Col className='text-center' sm={5}>
                <Form.Control type="number" placeholder='費用金額' min='0' value={jbamount} onChange={(e) => setJbamount(e.target.value)} onBlur={handleUpdateClick} />
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