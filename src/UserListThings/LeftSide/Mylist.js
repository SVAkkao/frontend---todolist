import React, {useState} from 'react'
import { Row, Col, Card, } from 'react-bootstrap';

function Mylist({ data, onButtonClick }) {
    const startDate = new Date(data.start_date).toLocaleDateString();
    const endDate = new Date(data.end_date).toLocaleDateString();
    const [image, setImage] = useState(null);
    const previewImg = image ? URL.createObjectURL(image) : "/UserListSource/Mylist.webp"
    return (
        <Row className='m-5'>
            <Col>
                <Card className='mt-4'>
                    <a onClick={() => onButtonClick(data.tlid)}>
                        <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#AAD9BB', textAlign: 'center' }}>
                            <div style={{ flex: '1', textAlign: 'center' }}>
                                <Card.Text className='text3'>
                                    {data.title}
                                </Card.Text>
                            </div>
                            {/* <div>
                            <Button variant="light" onClick={() => onButtonClick(data.tlid)}>選擇</Button>
                        </div> */}
                            <div>
                                <img style={{ width: "20px", height: '20px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Icon" />
                            </div>
                        </Card.Body>
                    </a>

                    <div className="flex">
                        <div className="imgwrap">
                            
                        </div>
                        <label className="uploadbtn text-center" htmlFor="upload"><img src={previewImg} style={{width: '100%', height: '200px'}} /></label>
                        <input type="file" accept="image/jpeg" id="upload" className='d-none' multiple
                            onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    {/* <input id="upload" type="file" /> */}
                    {/* <label type="button" for="upload" class="uploadImg" style={{ border: 'grey', width: '100%', height: '200px' }}></label> */}
                    {/* <Card.Img variant="bottom" src="/UserListSource/Mylist.webp" style={{ border: 'grey', width: '100%', height: '200px' }} /> */}
                </Card>
            </Col>
            <Row className='mt-3' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col><p className='text4 supportColor'>{startDate}</p></Col>
                <Col><img style={{ width: "24px", height: '24px', marginBottom: '12px', paddingBottom: '0' }} src="/UserListSource/to.png" alt="Icon" /></Col>
                <Col><p className='text4 supportColor'>{endDate}</p></Col>
                <Col sm={1}></Col>
            </Row>
        </Row>
    )
}

export default Mylist