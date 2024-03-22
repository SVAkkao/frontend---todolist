import React,{useState,useEffect} from 'react'
import './color.css'
import { Row, Col, Form } from 'react-bootstrap';
import JourneyProject from './JourneyProject';

const API_HOST = process.env.REACT_APP_API_URL;


function Journey({ journeydataforjourney, attractions, projects }) {
    

    //拿aname
    const [attractionname, setAttraction] = useState([]);
    // attractions
    useEffect(() => {
      // const aas = [{
      //     "aid": 20,
      //     "aname": "111"
      // }];
      const data = attractions.filter( ({ aid }) => aid === journeydataforjourney.aid )[0];
      setAttraction(data);
      // journeydataforjourney.aid
      // debugger
        // fetch(API_HOST + '/api/POST/searchattraction', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //       },
        //     body: JSON.stringify({ aid: journeydataforjourney.aid })
        //   })
        //   .then(response => response.json())
        //   .then(data => {
        //     setAttraction(data)
        //   })
        //   .catch(error => console.error(error));
        
        //
    }, [journeydataforjourney]);
    //

    //拿jpid
    const [journeyproject, setJourneyProject] = useState([]);
    

    useEffect(() => {
        
        fetch(API_HOST + '/api/POST/selectjourneyproject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({ jid: journeydataforjourney.jid })
          })
          .then(response => response.json())
          .then(data => {
            setJourneyProject(data)
            console.log(data)
          })
          .catch(error => console.error(error));
        
        },
        [journeydataforjourney]);
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
                                    label={<div style={{ textAlign: 'center' }}>{attractionname.aname}</div>}
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
            {journeyproject.map((item, index) => (
        <JourneyProject key={index} journeyprojectdataforjourneyproject={item} projects={projects} />
      ))}
        </Row>
    )
}

export default Journey