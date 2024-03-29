import React, { useState, useEffect } from 'react'
import './color.css'
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import JourneyProject from './JourneyProject';

const API_HOST = process.env.REACT_APP_API_URL;


function JourneyProjectList({ journeyProjects, setShowJourney }) {
    if (!journeyProjects) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;
    }
    // return journeys.map((item, index) => <p key={index}>{JSON.stringify(item)}</p> )
    return journeyProjects.map((item, index) => (
        <JourneyProject key={index} journeyProjectsdata={item} setShowJourney={setShowJourney} />
    ))

    {/* {journeyproject.map((item, index) => (
        <JourneyProject key={index} journeyprojectdata={item} projects={projects} />
      ))} */}
}



function Journey({ journeydata, update_info, onFocusJourney, setShowJourney }) {
    const [journeyDataValue, setJourneyDataValue] = useState({});
    const [checkedValue, setCheckedValue] = useState(false);

    useEffect(() => {
        setJourneyDataValue(journeydata)
        if (journeydata.jchecked == 1) {
            setCheckedValue(true)
        } else {
            setCheckedValue(false)
        }

    }, [journeydata]);

    if (!journeyDataValue) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }


    const updateJourneyChecked = (checked) => {
        fetch(`${API_HOST}/api/POST/updatejourney`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jid: journeyDataValue.jid,
                aname: journeyDataValue.attraction.aname,
                arrived_date: journeyDataValue.arrived_date,
                arrived_time: journeyDataValue.arrived_time,
                leaved_time: journeyDataValue.leaved_time,
                jmemo: journeyDataValue.jmemo,
                jrate: journeyDataValue.jrate,
                jchecked: checked,
            })
        });
    }

    const onRemoveJourney = () => {
        fetch(`${API_HOST}/api/POST/deletejourney`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jid: journeyDataValue.jid,
            })
        })
            .then(() => {
                update_info();
            })
            ;
    }


    function checked(event) {
        setCheckedValue(event.target.checked);
        updateJourneyChecked(event.target.checked);
        // console.log(event.target.checked); // 這將在控制檯中打印出checkbox的當前狀態（true表示勾選，false表示未勾選）
    }
    // onFocusJourney(journeydata.jid)
    // onClick={onRemoveJourney} 
    const itemAction = (event) => {
        // console.log(ev, ev.currentTarget, ev.target.dataset.action);
        const action = event.target.dataset.action;
        switch (action) {
            case "select":
                console.log(journeydata.jid);
                onFocusJourney(journeydata.jid);
                setShowJourney(true);
                break;
            case "check":
                checked(event);
                break;
            case "delete":
                onRemoveJourney();
                break;
            default:
                if( event.target.classList.contains("parent-label") ) {
                console.log(journeydata.jid);
                    onFocusJourney(journeydata.jid);
                    break;
                }
                // throw new Error("Action unknown:" + action);
                break;
        }
        console.log();
    };

    return (
        <Row className='mt-4'>
            <Col sm={1}></Col>
            <Col sm={10}>
                <button onClick={itemAction} className='bg-color2 rounded p-3' style={{ borderColor: 'transparent', width: '100%' }} data-action="select">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div
                            style={{ flex: '1', textAlign: 'center' }}
                            data-action="select"
                        >
                            <Form data-action="select">
                                <Form.Check
                                    type='checkbox'
                                    label={<div className='the-label' style={{ textAlign: 'center' }} data-action="select">{journeydata.attraction.aname}</div>}
                                    className='text2 parent-label'
                                    onChange={checked}
                                    checked={checkedValue}
                                    data-action="check"
                                />
                            </Form>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                style={{ width: "24px", height: '24px', paddingBottom: '0' }}
                                src="/UserListSource/delete.png" alt="Icon"
                                data-action="delete"
                            />
                        </div>
                    </div>
                </button>
            </Col>
            <Col sm={1}></Col>
            <JourneyProjectList journeyProjects={journeydata.journey_projects
            } />

        </Row>
    )
}

export default Journey