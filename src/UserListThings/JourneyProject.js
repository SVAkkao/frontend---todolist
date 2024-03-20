import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';

function JourneyProject() {
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
                            label={<div style={{ textAlign: 'center' }}>吃牛奶冰淇淋</div>}
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