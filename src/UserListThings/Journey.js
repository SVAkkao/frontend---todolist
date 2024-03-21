import React,{useState,useEffect} from 'react'
import './color.css'
import { Row, Col, Form } from 'react-bootstrap';

const API_HOST = process.env.REACT_APP_API_URL;


function Journey(data) {
    
    //拿aname
    const [attraction, setAttraction] = useState([]);

    useEffect(() => {
        
        fetch(API_HOST + '/api/POST/searchattraction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({ aid: data.aid })
          })
          .then(response => response.json())
          .then(data => {
            setAttraction(data)
          })
          .catch(error => console.error(error));
        }, [data]);

        useEffect(() => {  
            console.log(data.aid);
            console.log(attraction)
        }, [attraction]);
        //


    return (
        <Row className='mt-4'>
            <Col sm={1}></Col>
            <Col sm={10}>
                <button className='bg-color2 rounded p-3' style={{ borderColor: 'transparent', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: '1', textAlign: 'center' }}>
                            <Form>
                                <Form.Check
                                    type='checkbox'
                                    label={<div style={{ textAlign: 'center' }}>{attraction.aname}</div>}
                                    className='text2'
                                />
                            </Form>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img style={{ width: "24px", height: '24px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Icon" />
                        </div>
                    </div>
                </button>
            </Col>
            <Col sm={1}></Col>
        </Row>
    )
}

export default Journey