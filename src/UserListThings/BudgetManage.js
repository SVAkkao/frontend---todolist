import React, { useRef, useState, useEffect } from 'react'
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts';


const API_HOST = process.env.REACT_APP_API_URL;


function BudgetManage({ totalAmount, alldata, selectedTlid, setAllData, update_info }) {
    const [listData, setListData] = useState({});
    const [mData, setMData] = useState([0, 0, 0, 0, 0]);
    const [xmLabels, setXmLabels] = useState([0, 0, 0, 0, 0]);

    const amount = useRef(0);


    useEffect(() => {
        const tlid = selectedTlid;
        const filteredListdData = alldata.filter((item) => item.tlid == tlid);
        //獲取清單資料
        setListData(filteredListdData[0])

        //檢查JBudget與JPProjectBudget是否存在
        let hasJBudget = false;
        let hasJPProjectBudget = false;

        // 檢查 filteredListdData[0] 清單資料 的所有 journeys 的所有 jbudgets 是否存在
        for (let i = 0; i < filteredListdData[0].journeys.length; i++) {
            if (filteredListdData[0].journeys[i].jbudgets && filteredListdData[0].journeys[i].jbudgets.length > 0) {
                hasJBudget = true;
                break;
            }
        }

        // 檢查 filteredListdData[0]  清單資料 的所有 journeys 的所有 journey_projects 的所有 jpbudgets 是否存在
        for (let i = 0; i < filteredListdData[0].journeys.length; i++) {
            for (let j = 0; j < filteredListdData[0].journeys[i].journey_projects.length; j++) {
                if (filteredListdData[0].journeys[i].journey_projects[j].jpbudgets && filteredListdData[0].journeys[i].journey_projects[j].jpbudgets.length > 0) {
                    hasJPProjectBudget = true;
                    break;
                }
            }
            if (hasJPProjectBudget) {
                break;
            }
        }
        
        // 如果JBudget或JPProjectBudget存在，進行前五名金額的設置，並將前五名的數據放到MUI長條圖中
        if (hasJBudget || hasJPProjectBudget) {
            //藉由getTopFiveCosts函式獲取前五大金額
            const topFiveCosts = getTopFiveCosts(filteredListdData[0]);
            if (topFiveCosts) {
                //如果前五大金額存在，設置數據到長條圖
                setMData(topFiveCosts.map((cost) => cost.amount));
                setXmLabels(topFiveCosts.map((cost) => cost.name));
            }
        } else {
            如果前五大金額不存在，將長條圖數據設置為0
            setMData([0, 0, 0, 0, 0])
            setXmLabels([0, 0, 0, 0, 0])
        }

    }
              //如果總資料、選擇清單、總消費額(表示有新的BUDGET新增了)、有變動，也進行變動
        , [alldata, selectedTlid, totalAmount])

    // 圓餅圖樣式設置
    const pieParams = { height: 200, margin: { right: 5 } };

    // 改變本區塊總預算的函式
    const inputAmount = (event) => {
        setListData({
            ...listData,
            totalamount: event.target.value,
        });
    }

    // 更新清單總預算的函式
    const handleUpdateListClick = async () => {
        // 要給更新API的資料
        const updateListData = {
            tlid: selectedTlid,
            title: listData.title,
            start_date: listData.start_date,
            end_date: listData.end_date,
            totalamount: listData.totalamount,
            tlphoto: listData.tlphoto,
        };
        //更新清單資料的API所需的USER TOKEN
        const token = localStorage.getItem("userToken");

        //用FETCH更新資料庫資料，並且更新總JSON資料
        fetch(API_HOST + "/api/POST/updatelist",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateListData),
            }
        )
            .then((response) => {
                console.log(response)
                //update list_info();
                setAllData(prevAlldata => {
                    return prevAlldata.map(
                        (touristList) => {
                            if (touristList.tlid === selectedTlid) {

                                return {
                                    ...touristList,
                                    title: listData.title,
                                    start_date: listData.start_date,
                                    end_date: listData.end_date,
                                    totalamount: listData.totalamount,
                                    tlphoto: listData.tlphoto,
                                }
                            } else {
                                return touristList
                            }
                        }
                    )
                }
                )
                //
            })
    }



    //算出剩餘預算 = 總預算 - 總消費額
    let retainEarning = listData.totalamount - totalAmount;
    let neg = 0;
    let cost = 0;
    //如果剩餘預算為正
    if (retainEarning >= 0) {
        //沒有超出預算neg
        neg = 0;
        //設置剩餘預算與已用預算
        retainEarning = listData.totalamount - totalAmount;
        cost = totalAmount;
    } else {
        //剩餘預算為負，設置已用預算與超出預算，並設置剩餘預算為0
        cost = listData.totalamount;
        neg = totalAmount - listData.totalamount;
        retainEarning = 0;
    }
    const data = [
        { value: cost, label: '已用預算' },
        { value: retainEarning, label: '剩餘預算' },
        { value: neg, label: '超出預算' }
    ];

// 獲取前五金額的函式
    function getTopFiveCosts(listData) {
        const costs = [];


        // 將 journeys 中的 jbamount 與 jbname 加入 costs 陣列中

            listData.journeys.forEach((journey) => {
                journey.jbudgets.forEach((budget) => {
                    const existingCost = costs.find((cost) => cost.name === budget.jbname);

                    if (existingCost) {
                        existingCost.amount += Number(budget.jbamount);
                    } else {
                        costs.push({ name: budget.jbname, amount: Number(budget.jbamount) });
                    }
                });
            });

        // 將 journey_projects 中的 jpbamount 與 jpbname 加入 costs 陣列中

            listData.journeys.forEach((journey) => {
                journey.journey_projects.forEach((project) => {
                    project.jpbudgets.forEach((budget) => {
                        const existingCost = costs.find((cost) => cost.name === budget.jpbname);

                        if (existingCost) {
                            existingCost.amount += Number(budget.jpbamount);
                        } else {
                            costs.push({ name: budget.jpbname, amount: Number(budget.jpbamount) });
                        }
                    });
                });
            });
        
        // 對 costs 陣列中的費用金額進行排序
        costs.sort((a, b) => b.amount - a.amount);

        // 返回前五大的費用名稱和金額
        return costs.slice(0, 5);
    }




    //當缺少清單資料或是選擇的清單ID時，進行loading
    if (!listData || !selectedTlid) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    return (
        <>
            <Row className='m-4'>

                <Col sm={1} xs={0}></Col>
                <Col sm={10} xs={10}><Form.Label className='text-left'>預算金額(元)</Form.Label></Col>
                <Col sm={1} xs={1}></Col>

                <Col sm={1} xs={1}></Col>
                <Col className='text-left' sm={10} xs={10}>
                    <Form.Control className='w-100' type="number" placeholder='預算金額'
                        value={listData.totalamount ? listData.totalamount : 0}
                        ref={amount}
                        onChange={inputAmount}
                        onBlur={handleUpdateListClick}
                    />
                </Col>
                <Col sm={1} xs={1}></Col>

                <Col sm={1} xs={0}></Col>
                <Col sm={10} xs={12} className='mt-4' style={{ display: listData.totalamount ? 'block' : 'none' }}>
                    <PieChart
                        style={{ width: '100%' }}
                        height='300'
                        colors={['#939393', '#80BCBD', '#D2302B']}
                        series={[
                            {
                                arcLabel: (item) => `${item.label}: ${item.value.toLocaleString()}元`,
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
                <Col sm={1} xs={1}></Col>
                <Col sm={12} xs={12} className='mt-4'>
                    <BarChart
                        height={300}
                        colors={['#F9F7C9']}
                        series={[{
                            data: mData,
                            id: 'uvId',
                            label: '金額(元)',
                            type: 'bar',
                            cx: 150,
                            cy: 100,
                        }]}
                        style={{ width: '100%' }}
                        xAxis={[{ scaleType: 'band', data: xmLabels }]}
                    />
                </Col>
                {/* <Col sm={12} className='mt-4'>
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
                </Col> */}
            </Row>

        </>
    )
}

export default BudgetManage
