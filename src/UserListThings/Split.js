import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import SplitMember from './SplitMember';
import { NavLink } from 'react-router-dom';

const API_HOST = process.env.REACT_APP_API_URL;


function BudgetManageList({ alldata, budgetManage, selectedTlid, setAllData, update_info, deleteBudgetManage }) {
    const [singleBudgetManageData, setSingleBudgetManageData] = useState([]);
    const [averageAmountData, setAverageAmountData] = useState("");


//獲取分帳資料
    useEffect(() => {
        setSingleBudgetManageData(budgetManage);
    }, [selectedTlid, alldata, budgetManage]);

//改變該分帳花費名稱時，改變本區域的JSON資料(未完全改完成)
    const handleBmnameChange = (event) => {
        setSingleBudgetManageData({
            ...singleBudgetManageData,
            bmname: event.target.value
        });
    };
//改變該分帳花費金額時，改變本區域的JSON資料(未完全改完成)
    const handleBmamountChange = (event) => {
        setSingleBudgetManageData({
            ...singleBudgetManageData,
            bmamount: event.target.value
        });
    };


    //改變該分帳夥伴名稱時，改變本區域的JSON資料(未完全改完成)
    const handlePnnameChange = (event, partnerDatapnid) => {
        setSingleBudgetManageData((prevSingleBudgetManageData) => {
             //修改夥伴名稱資料成為更新後的夥伴資料
            const updatedePartners = prevSingleBudgetManageData.partners.map((item) => {
                if (item.pnid === partnerDatapnid) {
                    return {
                        ...item,
                        pnname: event.target.value,
                    };
                }
                return item;
            });
             //將更新後的夥伴資料放入本區域的JSON資料
            return {
                ...prevSingleBudgetManageData,
                partners: updatedePartners,
            };
        });
    };
//改變該夥伴花費金額時，改變本區域的JSON資料(未完全改完成)
    const handlePnamountChange = (event, partnerDatapnid) => {
        setSingleBudgetManageData((prevSingleBudgetManageData) => {
            //修改夥伴金額資料成為更新後的夥伴資料
            const updatedePartners = prevSingleBudgetManageData.partners.map((item) => {
                if (item.pnid === partnerDatapnid) {
                    return {
                        ...item,
                        pnamount: event.target.value,
                    };
                }
                return item;
            });
            //將更新後的夥伴資料放入本區域的JSON資料
            return {
                ...prevSingleBudgetManageData,
                partners: updatedePartners,
            };
        });
    };
    
//改變該夥伴欠錢與否時，改變本區域的JSON資料(未完全改完成)
    const handlePncheckedChange = (event, partnerDatapnid) => {
        setSingleBudgetManageData((prevSingleBudgetManageData) => {
            //修改夥伴欠錢與否資料成為更新後的夥伴資料
            const updatedePartners = prevSingleBudgetManageData.partners.map((item) => {
                if (item.pnid === partnerDatapnid) {
                    return {
                        ...item,
                        pnchecked: event.target.value,
                    };
                }
                return item;
            });
            //將更新後的夥伴資料放入本區域的JSON資料
            return {
                ...prevSingleBudgetManageData,
                partners: updatedePartners,
            };
        });
        // updateBudgetManage();


    };
//改變完成時，將改變完成的資料使用API更新資料庫資料，並改變總資料的資料
    const updateBudgetManage = () => {
        //對分帳資料做更新
        fetch(API_HOST + "/api/POST/updatebudgetmanage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bmid: singleBudgetManageData.bmid,
                bmname: singleBudgetManageData.bmname,
                bmamount: singleBudgetManageData.bmamount
            }),
        }).then(() => {
            //對每個夥伴資料做更新
            singleBudgetManageData.partners.forEach((item) => {
                fetch(API_HOST + "/api/POST/updatepartner", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pnid: item.pnid,
                        pnname: item.pnname,
                        pnamount: item.pnamount,
                        pnchecked: item.pnchecked,
                    }),
                });
            });

            setAllData((prevAlldata) => {
                return prevAlldata.map((touristList) => {
                    if (touristList.tlid === selectedTlid) {
                        return {
                            ...touristList,
                            budgetmanages: touristList.budgetmanages.map((budgetmanage) => {
                                if (budgetmanage.bmid === singleBudgetManageData.bmid) {
                                    return {
                                        ...budgetmanage,
                                        bmname: singleBudgetManageData.bmname,
                                        bmamount: singleBudgetManageData.bmamount,
                                        partners: singleBudgetManageData.partners,
                                    };
                                } else {
                                    return budgetmanage;
                                }
                            }),
                        };
                    } else {
                        return touristList;
                    }
                });
            });


        });
    }

//刪除資料庫夥伴資料與總資料夥伴資料
    const deletePartner = (partnerpnid) => {
        fetch(API_HOST + "/api/POST/deletepartner", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pnid: partnerpnid,
            }),
        }).then((r) => {
            setAllData((prevAlldata) => {
                return prevAlldata.map((touristList) => {
                    if (touristList.tlid === selectedTlid) {
                        return {
                            ...touristList,
                            budgetmanages: touristList.budgetmanages.map((budgetmanage) => {
                                if (budgetmanage.bmid === singleBudgetManageData.bmid) {
                                    return {
                                        ...budgetmanage,
                                        partners: budgetmanage.partners.filter((partner) => {
                                            return partner.pnid !== partnerpnid;
                                        }),
                                    };
                                } else {
                                    return budgetmanage;
                                }
                            }),
                        };
                    } else {
                        return touristList;
                    }
                });
            });
        });
    };

    //新增資料庫夥伴資料並進行總資料更新
    const addPartner = () => {
        fetch(API_HOST + "/api/POST/addpartner", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bmid: singleBudgetManageData.bmid,
                pnname: "未命名",
                pnamount: "0"
            }),
        }).then((response) => {
            update_info();
        });
    }
    
//計算平均金額，並將該金額填入夥伴金額框(本區域資料)
    const averageAmount = () => {
        let pay = Number(singleBudgetManageData.bmamount)
        let peopleCounts = singleBudgetManageData.partners.length
        let answer = Math.round(pay / peopleCounts * 10) / 10;
        setAverageAmountData(answer)

        setSingleBudgetManageData((prevSingleBudgetManageData) => {
            const updatedePartners = prevSingleBudgetManageData.partners.map((item) => {
                if (item.pnid) {
                    return {
                        ...item,
                        pnamount:answer,
                    };
                }
                return item;
            });
            return {
                ...prevSingleBudgetManageData,
                partners: updatedePartners,
            };
        });


    };


    if (!alldata) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;
    }

    return (
        <>
            <Row style={{ alignItems: 'center' }} className='m-4'>
                {/* <Col sm={1} xs={0}></Col> */}
                <Col sm={5} xs={5}><Form.Label className='text-left'>費用名稱</Form.Label></Col>
                <Col sm={5} xs={5}><Form.Label className='text-left'>費用金額(元)</Form.Label></Col>
                <Col sm={0} xs={1}></Col>

                {/* <Col sm={0} xs={1}></Col> */}
                <Col className='text-left' sm={5} xs={5}>
                    <Form.Control type="text"
                        placeholder='費用名稱'
                        onChange={handleBmnameChange}
                        value={singleBudgetManageData.bmname}
                        onBlur={updateBudgetManage}
                    />
                </Col>
                <Col className='text-left' sm={5} xs={5}>
                    <Form.Control type="number"
                        placeholder='費用金額'
                        onChange={handleBmamountChange}
                        value={singleBudgetManageData.bmamount}
                        onBlur={updateBudgetManage}
                    />
                </Col>
                <Col sm={1} xs={1}></Col>
            </Row>
            <Row className='mt-4 ms-4'>
                {/* <Col sm={0} xs={0}></Col> */}
                <Col className="d-flex align-items-center">
                    <Form.Label className='text-left'>同行人員</Form.Label>
                </Col>
                <Col sm={1} xs={1}></Col>
            </Row>


            {singleBudgetManageData.partners && singleBudgetManageData.partners.map((data, index) => {
                return (
                    <SplitMember
                        key={index}
                        partnerData={data}
                        handlePnnameChange={handlePnnameChange}
                        handlePnamountChange={handlePnamountChange}
                        updateBudgetManage={updateBudgetManage}
                        deletePartner={deletePartner}
                        handlePncheckedChange={handlePncheckedChange}
                    />
                );
            })}

            <Row style={{ alignItems: 'center' }} className='m-4'>
                {/* <Col sm={0} xs={0}></Col> */}
                <Col sm={6} xs={5}>
                    <a
                        onClick={addPartner}
                    >
                        <img className='text-left m-2' style={{ width: "32px", height: '32px' }} src="/UserListSource/add.png" alt="Icon" />
                        <Form.Label className='text-left'>新增成員</Form.Label>
                    </a>
                </Col>
                <Col><button
                    onClick={averageAmount}
                    className='bg-color1 text-right p-2 rounded' style={{ border: 'transparent', color: 'white' }}>平均費用</button></Col>
                <Col sm={1} xs={1}>
                    <a
                        onClick={(event) => { deleteBudgetManage(singleBudgetManageData.bmid) }}
                    ><img src='/UserListSource/delete.png' style={{ width: "32px", height: '32px', paddingBottom: '0' }} /></a>
                </Col>
                <Col sm={1} xs={1}></Col>
                <Col sm={12} xs={12}>

                    {averageAmountData && (
                        <p className='m-2'>每人應付{averageAmountData}元</p>
                    )
                    }
                    <hr />
                </Col>
            </Row>


        </>


    )
}



function Split({ alldata, selectedTlid, setAllData, update_info }) {

    const [budgetManageData, setBudgetManageData] = useState([]);
    // const [mData, setMData] = useState([0, 0, 0, 0, 0]);
    // const [xmLabels, setXmLabels] = useState([0, 0, 0, 0, 0]);


  獲取所有分帳資料
    useEffect(() => {
        const tlid = selectedTlid;
        const filteredListdData = alldata.filter((item) => item.tlid == tlid);
        setBudgetManageData(filteredListdData[0].budgetmanages)
    }
        , [alldata, selectedTlid])

    新增分帳資料
    const addBudgetManage = () => {
        fetch(API_HOST + "/api/POST/addbudgetmanage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tlid: selectedTlid,
                bmname: "未命名",
                bmamount: "0"
            }),
        }).then((response) => {
            update_info();
        });
    }

    刪除分帳資料
    const deleteBudgetManage = (budgetManagebmid) => {
        fetch(API_HOST + "/api/POST/deletebudgetmanage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bmid: budgetManagebmid,
            }),
        }).then((r) => {
            setAllData((prevAlldata) => {
                return prevAlldata.map((touristList) => {
                    if (touristList.tlid === selectedTlid) {
                        return {
                            ...touristList,
                            budgetmanages: touristList.budgetmanages.filter((budgetmanage) => {
                                return budgetmanage.bmid !== budgetManagebmid;
                            }),
                        };
                    } else {
                        return touristList;
                    }
                });
            });
        });
    };


    if (!alldata) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;
    }
    return (
        <>
        //將所有分帳資料印出
            {budgetManageData.map((data, index) => {
                return (
                    <BudgetManageList
                        key={index}
                        budgetManage={data}
                        alldata={alldata}
                        selectedTlid={selectedTlid}
                        setAllData={setAllData}
                        deleteBudgetManage={deleteBudgetManage}
                        update_info={update_info}
                    />
                );
            })}
            <Row style={{ alignItems: 'center' }} className='m-4'>
                <Col sm={12} xs={12}>
                    <a onClick={addBudgetManage}>
                        <img className='text-center m-2' style={{ width: "32px", height: '32px' }} src="/UserListSource/add.png" alt="Icon" />
                        <Form.Label className='text-center'>新增分帳費用</Form.Label>
                    </a>
                </Col>
            </Row>
        </>
    )
}

export default Split
