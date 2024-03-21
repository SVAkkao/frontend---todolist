import React, { useState } from 'react'
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
export function Pages() {
    const [bookActive, setBookActive] = useState(false);
    const [aboardActive, setAboardActive] = useState(false);
    const [hikingActive, setHikingActive] = useState(false);
    const [shipActive, setShipActive] = useState(false);
    const [campingActive, setCampingActive] = useState(false);
    const [historyActive, setHistoryActive] = useState(false);

    const handleButtonClick = (activeSetter) => {
        // 将所有按钮的状态设置为非活动状态
        setBookActive(false);
        setAboardActive(false);
        setHikingActive(false);
        setShipActive(false);
        setCampingActive(false);
        setHistoryActive(false);
        // 将点击的按钮状态设置为活动状态
        activeSetter(true);
    }

    return (
        <>
            <Col>
                <NavLink to="/alist">
                    <a className='book' onClick={() => handleButtonClick(setBookActive)}>
                        <img src={bookActive ? '/UserListSource/book-a.png' : '/UserListSource/book.png'} style={{ width: "48px", height: '48px', paddingBottom: '0' }} />
                    </a>
                    <p visibility={bookActive ? 'visible' : 'hidden'} className='bookTitle'>文藝</p>
                </NavLink>
            </Col>
            <Col>
                <NavLink to="/alist">
                    <a className='aboard' onClick={() => handleButtonClick(setAboardActive)}>
                        <img src={aboardActive ? '/UserListSource/aboard-a.png' : '/UserListSource/aboard.png'} style={{ width: "48px", height: '48px', paddingBottom: '0' }} />
                    </a>
                    <p className='aboardTitle'>出國旅行</p>
                </NavLink>
            </Col>
            <Col>
                <NavLink to="/alist">
                    <a className='hiking' onClick={() => handleButtonClick(setHikingActive)}>
                        <img src={hikingActive ? '/UserListSource/hiking-a.png' : '/UserListSource/hiking.png'} style={{ width: "48px", height: '48px', paddingBottom: '0' }} />
                    </a>
                    <p className='hikingTitle'>戶外</p>
                </NavLink>
            </Col>
            <Col>
                <NavLink to="/alist">
                    <a className='ship' onClick={() => handleButtonClick(setShipActive)}>
                        <img src={shipActive ? '/UserListSource/ship-a.png' : '/UserListSource/ship.png'} style={{ width: "48px", height: '48px', paddingBottom: '0' }} />
                    </a>
                    <p className='shipTitle'>水上</p>
                </NavLink>
            </Col>
            <Col>
                <NavLink to="/alist">
                    <a className='camping' onClick={() => handleButtonClick(setCampingActive)}>
                        <img src={campingActive ? '/UserListSource/campping-a.png' : '/UserListSource/campping.png'} style={{ width: "48px", height: '48px', paddingBottom: '0' }} />
                    </a>
                    <p className='campingTitle'>露營</p>
                </NavLink>
            </Col>
            <Col>
                <NavLink to="/alist">
                    <a className='history' onClick={() => handleButtonClick(setHistoryActive)}>
                        <img src={historyActive ? '/UserListSource/castle-a.png' : '/UserListSource/castle.png'} style={{ width: "48px", height: '48px', paddingBottom: '0' }} />
                    </a>
                    <p className='historyTitle'>歷史</p>
                </NavLink>
            </Col>
        </>

    )
}

export default Pages