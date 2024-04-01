import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';

function Pic({update_info, jimageData }) {




    return (
        <>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Col sm={1}></Col>
                <Col sm={10}><Form.Label className='text-left '>圖片</Form.Label></Col>
                <Col sm={1}></Col>
                <Col sm={1}></Col>
                <Col className='text-center' sm={10}>
                    <Form.Control accept="image/jpeg" type="file" multiple />
                </Col>
                <Col sm={1}>
                    <button
                        type="button"
                        // onClick={() => { deleteJbamount(budgetData.jbid) }}
                        style={{ border: "none", backgroundColor: "transparent" }}
                    >
                        <div>
                            <img style={{ width: "20px", height: '20px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Delete icon" />
                        </div>
                    </button>
                </Col>
            </Row>

            <form method="post" enctype="multipart/form-data">
                <input type="file" name="jimg[]" accept="image/jpeg" multiple />
                <button type="submit">Upload</button>
            </form>

        </>
    )
}

export default Pic