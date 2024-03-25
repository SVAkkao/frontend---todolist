import React, { useRef, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import { PieChart } from '@mui/x-charts/PieChart';
function BudgetManage() {
    const pieParams = { height: 200, margin: { right: 5 } };
    const amount = useRef(0);
    const [amountValue, setAmountValue] = useState(0);
    const inputAmount = (event)=>{
        setAmountValue(
            amount.current.value
        );
    }
    return (
        <>
            <Row>
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={10}><Form.Label className='text-left'>預算金額</Form.Label></Col>
                    <Col sm={1}></Col>

                    <Col sm={1}></Col>
                    <Col className='text-center' sm={10}>
                        <Form.Control type="number" placeholder='預算金額' ref={amount} onChange={inputAmount} />
                    </Col>
                    <Col sm={1}></Col>
                </Row>
                <Row>
                    <Col sm={1}></Col>
                    <Col><PieChart
                        series={[{ data: [{ value: amountValue }, { value: 15 }, { value: 20 }] }]}
                        {...pieParams}
                    /></Col>
                    <Col sm={1}></Col>
                </Row>
            </Row>

        </>
    )
}

export default BudgetManage