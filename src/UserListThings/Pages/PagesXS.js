import React, { useState } from 'react';
import Book from './Book';
import Aboard from './Aboard';
import History from './History';
import Water from './Water';
import Outdoor from './Outdoor';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
export function Pages() {
    const [bookActive, setBookActive] = useState(true);
    const [aboardActive, setAboardActive] = useState(false);
    const [hikingActive, setHikingActive] = useState(false);
    const [shipActive, setShipActive] = useState(false);
    const [historyActive, setHistoryActive] = useState(false);

    const handleButtonClick = (activeSetter) => {
        // 将所有按钮的状态设置为非活动状态
        setBookActive(false);
        setAboardActive(false);
        setHikingActive(false);
        setShipActive(false);
        setHistoryActive(false);
        // 将点击的按钮状态设置为活动状态
        activeSetter(true);
    }

    return (
        <>
            <Row>
                <Col>
                    <NavLink to="/alist">
                        <span className='click-icon book' onClick={() => handleButtonClick(setBookActive)}>
                            <img src={bookActive ? '/UserListSource/book-a.png' : '/UserListSource/book.png'} style={{ width: "36px", height: '36px', paddingBottom: '0' }} alt='A book icon' />
                        </span>
                        <p style={{ color: bookActive ? '#80BCBD' : '#939393' }} className='bookTitle'>文藝</p>
                    </NavLink>
                </Col>
                <Col>
                    <NavLink to="/alist">
                        <span className='click-icon aboard' onClick={() => handleButtonClick(setAboardActive)}>
                            <img src={aboardActive ? '/UserListSource/aboard-a.png' : '/UserListSource/aboard.png'} style={{ width: "36px", height: '36px', paddingBottom: '0' }} alt='A flight icon' />
                        </span>
                        <p style={{ color: aboardActive ? '#80BCBD' : '#939393' }} className='aboardTitle'>出國</p>
                    </NavLink>
                </Col>
                <Col>
                    <NavLink to="/alist">
                        <span className='click-icon hiking' onClick={() => handleButtonClick(setHikingActive)}>
                            <img src={hikingActive ? '/UserListSource/hiking-a.png' : '/UserListSource/hiking.png'} style={{ width: "36px", height: '36px', paddingBottom: '0' }} alt='A hiker icon' />
                        </span>
                        <p style={{ color: hikingActive ? '#80BCBD' : '#939393' }} className='hikingTitle'>戶外</p>
                    </NavLink>
                </Col>
                <Col>
                    <NavLink to="/alist">
                        <span className='click-icon ship' onClick={() => handleButtonClick(setShipActive)}>
                            <img src={shipActive ? '/UserListSource/ship-a.png' : '/UserListSource/ship.png'} style={{ width: "36px", height: '36px', paddingBottom: '0' }} alt='A ship icon' />
                        </span>
                        <p style={{ color: shipActive ? '#80BCBD' : '#939393' }} className='shipTitle'>水上</p>
                    </NavLink>
                </Col>
                <Col>
                    <NavLink to="/alist">
                        <span className='click-icon history' onClick={() => handleButtonClick(setHistoryActive)}>
                            <img src={historyActive ? '/UserListSource/castle-a.png' : '/UserListSource/castle.png'} style={{ width: "36px", height: '36px', paddingBottom: '0' }} alt='A castle icon' />
                        </span>
                        <p style={{ color: historyActive ? '#80BCBD' : '#939393' }} className='historyTitle'>文化</p>
                    </NavLink>
                </Col>
            </Row>

            {bookActive && <Book />}
            {aboardActive && <Aboard />}
            {hikingActive && <Outdoor />}
            {shipActive && <Water />}
            {historyActive && <History />}

        </>

    )
}

export default Pages

