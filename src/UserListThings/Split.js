import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import SplitMember from './SplitMember';
import { NavLink } from 'react-router-dom';

const API_HOST = process.env.REACT_APP_API_URL;


function BudgetManageList({ alldata, budgetManage, selectedTlid, setAllData, update_info, deleteBudgetManage }) {
    const [singleBudgetManageData, setSingleBudgetManageData] = useState([]);
    const [averageAmountData, setAverageAmountData] = useState("");



    useEffect(() => {
        setSingleBudgetManageData(budgetManage);
    }, [selectedTlid, alldata, budgetManage]);


    const handleBmnameChange = (event) => {
        setSingleBudgetManageData({
            ...singleBudgetManageData,
            bmname: event.target.value
        });
    };
    const handleBmamountChange = (event) => {
        setSingleBudgetManageData({
            ...singleBudgetManageData,
            bmamount: event.target.value
        });
    };

    const handlePnnameChange = (event, partnerDatapnid) => {
        setSingleBudgetManageData((prevSingleBudgetManageData) => {
            const updatedePartners = prevSingleBudgetManageData.partners.map((item) => {
                if (item.pnid === partnerDatapnid) {
                    return {
                        ...item,
                        pnname: event.target.value,
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

    const handlePnamountChange = (event, partnerDatapnid) => {
        setSingleBudgetManageData((prevSingleBudgetManageData) => {
            const updatedePartners = prevSingleBudgetManageData.partners.map((item) => {
                if (item.pnid === partnerDatapnid) {
                    return {
                        ...item,
                        pnamount: event.target.value,
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

    const handlePncheckedChange = (event, partnerDatapnid) => {
            setSingleBudgetManageData((prevSingleBudgetManageData) => {
                const updatedePartners = prevSingleBudgetManageData.partners.map((item) => {
                    if (item.pnid === partnerDatapnid) {
                        return {
                            ...item,
                            pnchecked: event.target.value,
                        };
                    }
                    return item;
                });
                return {
                    ...prevSingleBudgetManageData,
                    partners: updatedePartners,
                };
            });
            // updateBudgetManage();
       

    };

    const updateBudgetManage = () => {
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

    const averageAmount = () => {
       let pay = Number(singleBudgetManageData.bmamount)
       let peopleCounts = singleBudgetManageData.partners.length
       let Answer = Math.round(pay/peopleCounts*10) /10;
       setAverageAmountData(Answer)
    };


    if (!alldata) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;
    }

    return (
        <>
            <Row style={{ alignItems: 'center' }} className='m-4'>
                <Col sm={1} xs={0}></Col>
                <Col sm={5} xs={5}><Form.Label className='text-left'>費用名稱</Form.Label></Col>
                <Col sm={5} xs={5}><Form.Label className='text-left'>費用金額</Form.Label></Col>
                <Col sm={1} xs={1}></Col>

                <Col sm={1} xs={1}></Col>
                <Col className='text-center' sm={5} xs={5}>
                    <Form.Control type="text"
                        placeholder='費用名稱'
                        onChange={handleBmnameChange}
                        value={singleBudgetManageData.bmname}
                        onBlur={updateBudgetManage}
                    />
                </Col>
                <Col className='text-center' sm={5} xs={5}>
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
                <Col sm={1} xs={0}></Col>
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
                <Col sm={1} xs={0}></Col>
                <Col sm={5} xs={5}>
                    <a
                        onClick={addPartner}
                    >
                        <img className='text-left m-2' style={{ width: "32px", height: '32px' }} src="/UserListSource/add.png" alt="Icon" />
                        <Form.Label className='text-left'>新增成員</Form.Label>
                    </a>
                </Col>
                <Col><button 
                onClick={averageAmount}
                className='bg-color1 text-right p-2 rounded' style={{ border: 'transparent', color: 'white' }}>計算平均費用</button></Col>
                <Col sm={1} xs={1}>
                    <a
                        onClick={(event) => { deleteBudgetManage(singleBudgetManageData.bmid) }}
                    ><img src='/UserListSource/delete.png' style={{ width: "32px", height: '32px', paddingBottom: '0' }} /></a>
                </Col>
                <Col sm={1} xs={1}></Col>
                <Col sm={12} xs={12}>

                    {averageAmountData && (
                        <p>每人應付{averageAmountData}元</p>
                    )
                    }
                </Col>
            </Row>


        </>


    )
}



function Split({ alldata, selectedTlid, setAllData, update_info }) {

    const [budgetManageData, setBudgetManageData] = useState([]);
    // const [mData, setMData] = useState([0, 0, 0, 0, 0]);
    // const [xmLabels, setXmLabels] = useState([0, 0, 0, 0, 0]);



    useEffect(() => {
        const tlid = selectedTlid;
        const filteredListdData = alldata.filter((item) => item.tlid == tlid);
        setBudgetManageData(filteredListdData[0].budgetmanages)
    }
        , [alldata, selectedTlid])

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