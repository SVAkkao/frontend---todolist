import React, { useRef, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts';

function BudgetManage({ totalAmount }) {

    // 圓餅圖
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
    if (retainEarning >= 0) {
        neg = 0;
        retainEarning = amountValue - totalAmount;
        cost = totalAmount;
    } else {
        cost = amountValue;
        neg = totalAmount - amountValue;
        retainEarning = 0;
    }
    const data = [
        { value: cost, label: '已用預算' },
        { value: retainEarning, label: '剩餘預算' },
        { value: neg, label: '超出預算' }
    ];


    // 金額長條圖
    const mData = [40, 30, 20, 27, 18];
    const xmLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
    ];

    // 頻率長條圖
    const rData = [40, 30, 20, 27, 18];
    const xrLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
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
                <Col sm={10} className='mt-4'>
                    <PieChart
                        style={{ width: '100%' }}
                        height='300'
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
                    />
                </Col>
                <Col sm={1}></Col>
                <Col sm={12} className='mt-4'>
                    <BarChart
                        height={300}
                        colors={['#F9F7C9']}
                        series={[{
                            data: mData, 
                            id: 'uvId', 
                            label: '金額', 
                            type: 'bar',
                            cx: 100,
                            cy: 100,
                        }]}
                        style={{ width: '100%' }}
                        xAxis={[{ scaleType: 'band', data: xmLabels }]}
                    />
                </Col>
                <Col sm={12} className='mt-4'>
                    <BarChart
                        height={300}
                        colors={['#80BCBD']}
                        series={[{
                            data: rData, 
                            id: 'uvId', 
                            label: '頻率', 
                            type: 'bar',
                            cx: 100,
                            cy: 100,
                        }]}
                        style={{ width: '100%' }}
                        xAxis={[{ scaleType: 'band', data: xrLabels }]}
                    />
                </Col>
            </Row>

        </>
    )
}

export default BudgetManage