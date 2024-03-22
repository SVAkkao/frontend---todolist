import React,{useState,useEffect} from 'react'
import { Row, Col, Form } from 'react-bootstrap';
const API_HOST = process.env.REACT_APP_API_URL;

function JourneyProject({journeyprojectdataforjourneyproject}) {

    
//拿pname
const [journeyprojectname, setJourneyProjectName] = useState([]);

useEffect(() => {

    fetch(API_HOST + '/api/POST/searchprojectname', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({ pid: journeyprojectdataforjourneyproject.pid })
      })
      .then(response => response.json())
      .then(data => {
        setJourneyProjectName(data)
      })
      .catch(error => console.error(error));
    
    }, [journeyprojectdataforjourneyproject]);
//


  return (
    <Row className='mt-4'>
    <Col sm={2}></Col>
    <Col sm={9}>
        <button className='bg-color3 rounded p-2' style={{ borderColor: 'transparent', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: '1', textAlign: 'center' }}>
                    <Form>
                        <Form.Check
                            type='checkbox'
                            label={<div style={{ textAlign: 'center' }}>{journeyprojectname.pname}</div>}
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

export default JourneyProject