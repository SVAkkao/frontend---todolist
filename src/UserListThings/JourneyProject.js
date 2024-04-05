import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Spinner } from 'react-bootstrap';
const API_HOST = process.env.REACT_APP_API_URL;

function JourneyProject({ journeyProjectsData, onRemoveJourneyProject, setShowJourney, onFocusJourneyProject, onFocusJourney }) {
    const [journeyProjectsDataValue, setJourneyProjectsDataValue] = useState({});
    const [checkedValue, setCheckedValue] = useState(false);


    useEffect(() => {
        setJourneyProjectsDataValue(journeyProjectsData)
        if (journeyProjectsData.jpchecked == 1) {
            setCheckedValue(true)
        } else {
            setCheckedValue(false)
        }

    }, [journeyProjectsData]);




    const updateJourneyProjectsChecked = (checked) => {

        fetch(`${API_HOST}/api/POST/updatejourneyproject`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jpid: journeyProjectsDataValue.jpid,
                pname: journeyProjectsDataValue.project.pname,
                jpstart_date: journeyProjectsDataValue.jpstart_date,
                jpstart_time: journeyProjectsDataValue.jpstart_time,
                jpend_time: journeyProjectsDataValue.jpend_time,
                jpmemo: journeyProjectsDataValue.jpmemo,
                jpreview: journeyProjectsDataValue.jpreview,
                jprate: journeyProjectsDataValue.jprate,
                jpchecked: checked,
            })
        })
            .then((r) => { console.log(r) })
            ;
    }

    function checked(event) {
        setCheckedValue(event.target.checked);
        updateJourneyProjectsChecked(event.target.checked);
        // console.log(event.target.checked); // 這將在控制檯中打印出checkbox的當前狀態（true表示勾選，false表示未勾選）
    }


    const JpItemAction = (event) => {
        // console.log(ev, ev.currentTarget, ev.target.dataset.action);
        const action = event.target.dataset.action;
        switch (action) {
            case "Jpselect":
                console.log(journeyProjectsDataValue.jpid);
                onFocusJourneyProject(journeyProjectsDataValue.jpid);
                onFocusJourney(journeyProjectsDataValue.jid);
                setShowJourney(false);
                break;
            case "Jpcheck":
                checked(event);
                break;
            case "Jpdelete":
                onRemoveJourneyProject(journeyProjectsDataValue.jpid);
                break;
            default:
                if (event.target.classList.contains("parent-label")) {
                    console.log(journeyProjectsDataValue.jpid);
                    onFocusJourneyProject(journeyProjectsDataValue.jpid);
                    onFocusJourney(journeyProjectsDataValue.jid);
                    setShowJourney(false);

                    break;
                }
                // throw new Error("Action unknown:" + action);
                break;
        }
        console.log();
    };

    if (!journeyProjectsDataValue) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    return (
        <Row className='mt-4'>
            <Col sm={2}></Col>
            <Col sm={9} onClick={JpItemAction} data-action="Jpselect">
                <div className='bg-color3 rounded p-2' style={{ borderColor: 'transparent', width: '100%' }} data-action="Jpselect">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} data-action="Jpselect">
                        <div style={{ flex: '1', textAlign: 'center' }}
                            data-action="Jpselect">
                            <Form data-action="Jpselect">
                                <Form.Check
                                    type='checkbox'
                                    label={<div className='the-label' data-action="Jpselect" style={{ textAlign: 'center' }}>{journeyProjectsData.project.pname}</div>}
                                    className='text2 parent-label'
                                    onChange={checked}
                                    data-action="Jpcheck"
                                    checked={checkedValue}
                                />
                            </Form>
                        </div>
                        <button className='bg-color3' style={{ display: 'flex', alignItems: 'center', borderColor: 'transparent' }} data-action="Jpselect">
                            <img style={{ width: "24px", height: '24px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Icon"
                                data-action="Jpdelete"
                            />
                        </button>
                    </div>
                </div>
            </Col>
            <Col sm={1}></Col>
        </Row>
    )
}

export default JourneyProject