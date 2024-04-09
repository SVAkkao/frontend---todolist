import React, { useEffect, useState } from 'react'
import { Row, Col, Card, } from 'react-bootstrap';

function DateInfo({ startDate, endDate }) {
    const renderDate = (date) => {
        return new Date(date).toLocaleDateString();
    }
    return <Row className='mt-3' style={{ alignItems: 'center' }}>
        <Col xs={1}></Col>
        <Col><p className='text4 supportColor text-center'>{renderDate(startDate)}</p></Col>
        <Col className='text-center'>
            <img style={{ width: "24px", height: '24px', marginBottom: '12px', paddingBottom: '0' }} src="/UserListSource/to.png" alt="Icon" />
        </Col>
        <Col><p className='text4 supportColor text-center'>{renderDate(endDate)}</p></Col>
        <Col xs={1}></Col>
    </Row>;
}

const API_HOST = process.env.REACT_APP_API_URL;
const API_IMAGE = process.env.REACT_APP_IMAGE_URL


function MylistXS({ data, onButtonClick, onRemove, update_info, setrwdShow }) {


    const handleTlphotoUpdate = (event) => {

        // event.preventDefault();

        const formData = new FormData();
        formData.append("tlphoto", event.target.files[0]);
        formData.append("tlid", data.tlid);


        fetch(API_HOST + "/api/listimage/upload", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(() => {
                update_info();
            })
            .catch(error => console.error(error));
    };


    // 
    // const previewImg = image ? URL.createObjectURL(image) : "/UserListSource/Mylist.webp";
    return (
        <Row className='m-5'>
            <Col xs={1}></Col>
            <Col>
                <Card className='mt-5'>
                    <Card.Body className='click-icon'
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#AAD9BB', textAlign: 'center' }}
                    >
                        <div style={{ flex: '1', textAlign: 'center' }}
                        onDoubleClick={()=>{setrwdShow("TwoAreaMiddleXS")}}
                        onClick={() => onButtonClick(data.tlid)} className='text-truncate text-center'>
                            <Card.Text className='text3 text-truncate text-center' style={{ maxWidth: '80%' }}>
                                {data.title}
                            </Card.Text>
                        </div>
                        {/* <div> <Button variant="light" onClick={() => onButtonClick(data.tlid)}>選擇</Button> </div> */}
                        <div onClick={() => onRemove(data.tlid)}>
                            <img style={{ width: "20px", height: '20px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Delete icon" />
                        </div>
                    </Card.Body>
                    <div className="flex">
                        <div className="imgwrap"></div>
                        <label className="uploadbtn" htmlFor="upload">
                            <img className='text-center' src={data.tlphoto ? `${API_IMAGE}${data.tlphoto}` : "/UserListSource/Mylist.webp"} style={{ width: '100%', maxHeight: '100%' }} alt='Trip list preview' />
                        </label>
                        <input
                            type="file"
                            accept="image/jpeg"
                            id="upload"
                            className='d-none'
                            multiple
                            onChange={handleTlphotoUpdate}
                        />
                    </div>
                </Card>
            </Col>
            <Col xs={1}></Col>

            <DateInfo startDate={data.start_date} endDate={data.end_date} />
        </Row>
    )
}

export default MylistXS
