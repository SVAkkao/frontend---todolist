import React,{useState,useEffect} from 'react'
import JourneyProject from './JourneyProject'
import Journey from './Journey'
import './color.css'
import { Row, Col, Form} from 'react-bootstrap';

const API_HOST = process.env.REACT_APP_API_URL;


function TwoAreaMiddle({ selectedTlid}) {


    //tlid詳細內容
    const [areaData, setAreaData] = useState([]);



    useEffect(() => {
        fetch(API_HOST + '/api/POST/selectlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({ tlid: selectedTlid })
          })
          .then(response => response.json())
          .then(data => {
            setAreaData(data)
          })
          .catch(error => console.error(error));
        }, [selectedTlid]);
//



//JourneyData
    const [JourneyData, setJourneyData] = useState([]);

useEffect(() => {
        fetch(API_HOST + '/api/POST/selectjourney', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({ tlid: selectedTlid })
          })
          .then(response => response.json())
          .then(data => {
            setJourneyData(data)
          })
          .catch(error => console.error(error));
        }, [selectedTlid]);
//
        // useEffect(() => {  
        //     console.log(JourneyData)
        // }, [JourneyData]);
        //

//送出景點資料成為行程
const [searchvalue, setSearchValue] = useState('');
const [startdatevalue, setStartDateValue] = useState('');
const [enddatevalue, setEndDateValue] = useState('');
setStartDateValue(new Date(areaData.start_date).toLocaleDateString('en-CA'));
setEndDateValue(new Date(areaData.end_date).toLocaleDateString('en-CA'));

const  handleSearchClick = () => {
    const addjourneydata = {
        tlid: selectedTlid, 
        title: searchvalue, 
      };

    // 發送 HTTP 請求，將表單數據提交到服務器
    fetch(API_HOST + '/api/POST/addlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({ inputValue })
      })
      .then((response) => response.json())
      .then((data) => {
        // 在這裡處理服務器回應，並更新界面狀態
        console.log('Form submitted successfully!', data);
        setInputValue('');
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };
//
return (
        <>
            <Row className='m-4'><Col className='text-center'><p className='text1'>{areaData.title}</p></Col></Row>
            <Row className='m-4'><Col className='text-center'><p className='text2'>總金額: xx元</p></Col></Row>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col className='text-center' sm={4}>
                    <Form.Control value={startdatevalue} onChange={(event) => setStartDateValue(event.target.value)} type="date"/>
                </Col>
                <Col className='text-center' sm={1}>
                    <img src='/UserListSource/to.png' style={{ width: "24px", height: '24px', paddingBottom: '0' }}></img>
                </Col>
                <Col className='text-center' sm={4}>
                    <Form.Control type="date"   value={enddatevalue} onChange={(event) => setEndDateValue(event.target.value)}/>
                </Col>
                <Col className='text-center' sm={1}>
                    <a><img src='/UserListSource/bag.png' style={{ width: "20px", height: '20px', paddingBottom: '0' }}></img></a>
                </Col>
                <Col sm={1}></Col>
                {JourneyData.map((item, index) => (
        <Journey key={index} journeydataforjourney={item}/>
      ))}
                
            
            </Row>
            <Row className='m-4'>
                <Col sm={1}></Col>
                <Col sm={10} style={{ minHeight: '100vh', position: 'relative' }}>
                    <Form className="d-flex flex-column justify-content-end" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                        <Row className="align-items-center justify-content-center">
                            <Col sm={10}>
                                <Form.Control  value={searchValue} onChange={(event) => setSearchValue(event.target.value)}  rounded className='p-3 w-100' type="text" placeholder="輸入景點"/>
                            </Col>
                            <Col sm={2}>
                            <button type="button" onClick={handleSearchClick} style={{border: "none",backgroundColor: "transparent"}}><img src='/UserListSource/send.png' style={{ width: "48px", height: '48px', paddingBottom: '0' }} /></button>
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