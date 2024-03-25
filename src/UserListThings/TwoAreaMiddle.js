import React, { useState, useEffect } from 'react'
import JourneyProject from './JourneyProject'
import Journey from './Journey'
import './color.css'
import { Row, Col, Form } from 'react-bootstrap';

const API_HOST = process.env.REACT_APP_API_URL;


function TwoAreaMiddle({ selectedTlid }) {
    //tlid詳細內容
    const [areaData, setAreaData] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [projects, setProjects] = useState([]);
    // /attraction

    const fetchAttractions = async () => {
        const response = await fetch(API_HOST + '/api/attraction', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        setAttractions(data.result);
    }

    useEffect(() => {
        fetchAttractions();
    }, []);
    const fetchProjects = async () => {
        const response = await fetch(API_HOST + '/api/project', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        setProjects(data.result);
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchAreaData = async (selectedTlid) => {
        const getParams = (input) => {
            if (input == null) {
                return "";
            }
            return JSON.stringify(input)
        };
        const response = await fetch(
            `${API_HOST}/api/POST/selectlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: getParams(selectedTlid)
        });
        const data = await response.json();
        setAreaData(data);
    }

    useEffect(() => {
        fetchAreaData(selectedTlid);
    }, [selectedTlid]);

    //JourneyData
    const [JourneyData, setJourneyData] = useState([]);

    const fetchJourneyData = async () => {
        const response = await fetch(API_HOST + '/api/POST/selectjourney', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tlid: selectedTlid })
        });
        const data = await response.json();
        setJourneyData(data);
        console.log(data)
        
    }

    useEffect(() => {
        fetchJourneyData();
    }, [selectedTlid]);
    //
    // useEffect(() => {  
    //     console.log(JourneyData)
    // }, [JourneyData]);
    //

    //清單時間日期相關

    const startdate = new Date(areaData.start_date).toLocaleDateString('en-CA');
    const enddate = new Date(areaData.end_date).toLocaleDateString('en-CA');
    //

    //送出景點資料成為行程
    const [searchvalue, setSearchValue] = useState('');

    const handleSearchClick = async () => {

        const addjourneydata = {
            tlid: selectedTlid,
            aname: searchvalue,
        };

        // 發送 HTTP 請求，將表單數據提交到服務器
        const response = await fetch(API_HOST + '/api/POST/addjourney', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addjourneydata)
        });
        const data = await response.json();
        console.log('Data submitted successfully!', data);

        // 等待非同步請求完成後再更新畫面
        await fetchAreaData();
        await fetchJourneyData();
    };
    //
    return (
        <>
            <Row className='m-4'><Col className='text-center'><p className='text1'>{areaData.title}</p></Col></Row>
            <Row className='m-4'><Col className='text-center'><p className='text2'>總金額: xx元</p></Col></Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col className='text-center' sm={4}>
                    <Form.Control value={startdate}  type="date" />
                </Col>
                <Col className='text-center' sm={1}>
                    <img src='/UserListSource/to.png' style={{ width: "24px", height: '24px', paddingBottom: '0' }}></img>
                </Col>
                <Col className='text-center' sm={4}>
                    <Form.Control value={enddate} type="date"  />
                </Col>
                <Col className='text-center' sm={1}>
                    <a><img src='/UserListSource/bag.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }}></img></a>
                </Col>
                <Col sm={1}></Col>
                {JourneyData.map((item, index) => (
                    <Journey key={index} journeydataforjourney={item} attractions={attractions} projects={projects} />
                ))}


            </Row>
            <Row className='m-4'>
                <Col sm={1}></Col>
                <Col sm={10} style={{ minHeight: '100vh', position: 'relative' }}>
                    <Form className="d-flex flex-column justify-content-end" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                        <Row className="align-items-center justify-content-center">
                            <Col sm={10}>
                                <Form.Control value={searchvalue} onChange={(event) => setSearchValue(event.target.value)} rounded className='p-3 w-100' type="text" placeholder="輸入景點" />
                            </Col>
                            <Col sm={2}>
                                <button type="button" onClick={handleSearchClick} style={{ border: "none", backgroundColor: "transparent" }}><img src='/UserListSource/send.png' style={{ width: "48px", height: '48px', paddingBottom: '0' }} /></button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col sm={1}></Col>
            </Row>




        </>
    )
}

export default TwoAreaMiddle