import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';

function Exchange() {
    return (
        <>
            <Row className='text-left m-4' style={{ alignItems: 'center' }}>
                <Row className='text-left mt-3'>
                    <Col sm={1}></Col>
                    <Col sm={10}>
                        <Form.Label className='text-left '>日期</Form.Label>
                    </Col>
                    <Col sm={1}></Col>
                    <Col sm={1}></Col>
                    <Col sm={10}>
                        <Form.Control type="date" placeholder='換匯日期' />
                    </Col>
                    <Col sm={1}></Col>
                </Row>
                <Row className='text-left mt-3'>
                    <Col sm={1}></Col>
                    <Col sm={5}>
                        <Form.Label className='text-left '>原有幣別</Form.Label>
                    </Col>
                    <Col sm={5}>
                        <Form.Label className='text-left '>金額</Form.Label>
                    </Col>
                    <Col sm={1}></Col>
                    <Col sm={1}></Col>
                    <Col sm={5}>
                        <Form.Select placeholder='原有幣別'>
                            <option value='NTD'>新台幣NTD</option>
                            <option value='USD'>美金USD</option>
                            <option value='EUR'>歐元EUR</option>
                            <option value='JPY'>日圓JPY</option>
                            <option value='KRW'>韓元KRW</option>
                            <option value='CNY'>人民幣CNY</option>
                            <option value='HKD'>港幣HKD</option>
                            <option value='AUD'>澳幣AUD</option>
                            <option value='SGD'>新加坡幣SGD</option>
                            <option value='CHF'>瑞士法郎CHF</option>
                            <option value='ZAR'>南非幣ZAR</option>
                            <option value='MYR'>馬來幣MYR</option>
                            <option value='SEK'>瑞典幣SEK</option>
                            <option value='NZD'>紐元NZD</option>
                            <option value='THB'>泰幣THB</option>
                            <option value='CAD'>加拿大幣CAD</option>
                            <option value='PHP'>菲國比索PHP</option>
                            <option value='IDR'>印尼幣IDR</option>
                            <option value='VND'>印尼盾VND</option>
                        </Form.Select>
                    </Col>
                    <Col sm={5}><Form.Control type="number" placeholder='金額' min='0' /></Col>
                    <Col sm={1}></Col>
                </Row>
                <Row className='text-left mt-3'>
                    <Col sm={1}></Col>
                    <Col sm={5}>
                        <Form.Label className='text-left '>目標幣別</Form.Label>
                    </Col>
                    <Col sm={5}>
                        <Form.Label className='text-left '>金額</Form.Label>
                    </Col>
                    <Col sm={1}></Col>
                    <Col sm={1}></Col>
                    <Col sm={5}>
                        <Form.Select placeholder='目標幣別'>
                            <option value='NTD'>新台幣NTD</option>
                            <option value='USD' selected>美金USD</option>
                            <option value='EUR'>歐元EUR</option>
                            <option value='JPY'>日圓JPY</option>
                            <option value='KRW'>韓元KRW</option>
                            <option value='CNY'>人民幣CNY</option>
                            <option value='HKD'>港幣HKD</option>
                            <option value='AUD'>澳幣AUD</option>
                            <option value='SGD'>新加坡幣SGD</option>
                            <option value='CHF'>瑞士法郎CHF</option>
                            <option value='ZAR'>南非幣ZAR</option>
                            <option value='MYR'>馬來幣MYR</option>
                            <option value='SEK'>瑞典幣SEK</option>
                            <option value='NZD'>紐元NZD</option>
                            <option value='THB'>泰幣THB</option>
                            <option value='CAD'>加拿大幣CAD</option>
                            <option value='PHP'>菲國比索PHP</option>
                            <option value='IDR'>印尼幣IDR</option>
                            <option value='VND'>印尼盾VND</option>
                        </Form.Select>
                    </Col>
                    <Col sm={5}><Form.Control type="number" placeholder='金額' min='0' /></Col>
                    <Col sm={1}></Col>
                </Row>
                <Row className='my-3'>
                    <Col sm={7}></Col>
                    <Col sm={4}><button className='bg-color1 p-2 rounded' style={{ border: 'transparent', color: 'white' }}>轉換幣別</button></Col>

                    <Col sm={1} title='delete'>
                        <button
                            type="button"
                            style={{ border: "none", backgroundColor: "transparent" }}
                        >
                            <div>
                                <img style={{ width: "32px", height: '32px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Delete icon" />
                            </div>
                        </button>
                    </Col>
                    {/* <Col sm={1}></Col> */}
                </Row>
                <hr />
            </Row>
        </>
    )
}

export default Exchange