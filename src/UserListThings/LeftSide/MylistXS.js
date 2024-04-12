import React, { useEffect, useState } from 'react'
import { Row, Col, Card, } from 'react-bootstrap';

function DateInfo({ startDate, endDate }) {
    const renderDate = (date) => {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
    }
  
    return (
      <Row className='mt-3' style={{ alignItems: 'center' }}>
        <Col xs={1}></Col>
        <Col className=' text-center'><p className='text4 supportColor'>{renderDate(startDate)}</p></Col>
        <Col className=' text-center'>
          <img style={{ width: "24px", height: '24px', marginBottom: '12px', paddingBottom: '0' }} src="/UserListSource/to.png" alt="Icon" />
        </Col>
        <Col className=' text-center'><p className='text4 supportColor'>{renderDate(endDate)}</p></Col>
        <Col xs={1}></Col>
      </Row>
    );
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
                        <label className="uploadbtn text-center">
                            <input
                                onChange={handleTlphotoUpdate}
                                type="file"
                                accept="image/jpeg"
                                className='d-none'
                                multiple
                            // onChange={(event)=>{handleTlphotoUpdate(event,data.tlid)}}
                            />
                            <img src={data.tlphoto ? `${API_IMAGE}${data.tlphoto}` : "/UserListSource/Mylist.webp"} style={{ width: '100%', maxHeight: '100%' }} alt='Trip list preview' />
                        </label>
                    </div>
                </Card>
            </Col>
            <Col xs={1}></Col>

            <DateInfo startDate={data.start_date} endDate={data.end_date} />
        </Row>
    )
}

export default MylistXS
