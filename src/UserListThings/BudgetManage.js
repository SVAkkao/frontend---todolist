import React, { useRef, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import { PieChart } from '@mui/x-charts/PieChart';
function BudgetManage({totalAmount}) {
    const pieParams = { height: 200, margin: { right: 5 } };
    const amount = useRef(0);
    const [amountValue, setAmountValue] = useState(0);
    const inputAmount = (event) => {
        setAmountValue(
            amount.current.value
        );
    }
    let retainEarning = amountValue - totalAmount;
    let neg = 0;
    let cost = 0;
    if (retainEarning >= 0){
        neg = 0;
        retainEarning = amountValue - totalAmount;
        cost = totalAmount;
    }else{
        cost = amountValue;
        neg = totalAmount-amountValue;
        retainEarning = 0;
    }


    const data = [
        { value: cost, label: '已用預算' },
        { value: retainEarning, label: '剩餘預算' },
        { value: neg, label: '超出預算'}
    ];

    return (
        <>
            <Row className='m-4'>

                <Col sm={1}></Col>
                <Col sm={10}><Form.Label className='text-left'>預算金額</Form.Label></Col>
                <Col sm={1}></Col>

                <Col sm={1}></Col>
                <Col className='text-left' sm={10}>
                    <Form.Control className='w-100' type="number" placeholder='預算金額' ref={amount} onChange={inputAmount} />
                </Col>
                <Col sm={1}></Col>

                <Col sm={1}></Col>
                <Col><PieChart
                    colors={['#939393', '#80BCBD', '#D2302B']}
                    series={[
                        {
                            arcLabel: (item) => `${item.label} (${item.value})`,
                            arcLabelMinAngle: 45,
                            data,
                            cx: 150,
                            cy: 100,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    slotProps={{ legend: { hidden: true } }}
                    {...pieParams}
                /></Col>
                <Col sm={1}></Col>

                <Col sm={1}></Col>
            </Row>

        </>
    )
}

export default BudgetManage