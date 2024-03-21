import React from 'react'
import {Row, Col, Card} from 'react-bootstrap';

function Mylist({data}) {

    const startDate = new Date(data.start_date).toLocaleDateString();
    const endDate = new Date(data.end_date).toLocaleDateString();

  return (
    <Row className='m-5'>
    <Col>
        <Card className='mt-4'>
            <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#AAD9BB', textAlign: 'center' }}>
                <div style={{ flex: '1', textAlign: 'center' }}>
                    <Card.Text className='text3'>
                    {data.title}
                    </Card.Text>
                </div>
                <div>
                    <img style={{ width: "20px", height: '20px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Icon" />
                </div>
            </Card.Body>
            <Card.Img variant="bottom" src="https://images.pexels.com/photos/17573850/pexels-photo-17573850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ border: 'grey', width: '100%', height: '200px' }} />
        </Card>
    </Col>
    <Row className='mt-3' style={{ alignItems: 'center' }}>
        <Col><p className='text4'>{startDate}</p></Col>
        <Col><img style={{ width: "24px", height: '24px', marginBottom: '12px', paddingBottom: '0' }} src="/UserListSource/to.png" alt="Icon" /></Col>
        <Col><p className='text4'>{endDate}</p></Col>
    </Row>
</Row>
  )
}

export default Mylist