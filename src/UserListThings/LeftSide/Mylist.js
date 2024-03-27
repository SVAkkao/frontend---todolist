import React, {useState} from 'react'
import { Row, Col, Card, } from 'react-bootstrap';

function DateInfo({ startDate, endDate }) {
    const renderDate = (date) => {
        return new Date(date).toLocaleDateString();
    }
    return <Row className='mt-3' style={{ alignItems: 'center' }}>
        <Col sm={1}></Col>
        <Col><p className='text4 supportColor'>{renderDate(startDate)}</p></Col>
        <Col>
            <img style={{ width: "24px", height: '24px', marginBottom: '12px', paddingBottom: '0' }} src="/UserListSource/to.png" alt="Icon" />
        </Col>
        <Col><p className='text4 supportColor'>{renderDate(endDate)}</p></Col>
        <Col sm={1}></Col>
    </Row>;
}

function Mylist({ data, onButtonClick, onRemove }) {
    const [image, setImage] = useState(null);
    const previewImg = image ? URL.createObjectURL(image) : "/UserListSource/Mylist.webp";
    return (
        <Row className='m-5'>
            <Col>
                <Card className='mt-4'>
                    <Card.Body className='click-icon'
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#AAD9BB', textAlign: 'center' }}
                    >
                        <div style={{ flex: '1', textAlign: 'center' }} onClick={() => onButtonClick(data.tlid)}>
                            <Card.Text className='text3 text-truncate' style={{ maxWidth: '80%' }}>
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
                        <label className="uploadbtn text-center" htmlFor="upload">
                            <img src={previewImg} style={{ width: '100%', maxHeight: '200px'}} alt='Trip list preview' />
                        </label>
                        <input
                            type="file"
                            accept="image/jpeg"
                            id="upload"
                            className='d-none'
                            multiple
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    {/* <input id="upload" type="file" /> */}
                    {/* <label type="button" for="upload" class="uploadImg" style={{ border: 'grey', width: '100%', height: '200px' }}></label> */}
                    {/* <Card.Img variant="bottom" src="/UserListSource/Mylist.webp" style={{ border: 'grey', width: '100%', height: '200px' }} /> */}
                </Card>
            </Col>
            <DateInfo startDate={data.start_date} endDate={data.end_date} />
        </Row>
    )
}

export default Mylist
