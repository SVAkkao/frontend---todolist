import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import Split from './Split';
import BudgetManage from './BudgetManage';
import { NavLink } from 'react-router-dom';

function Money() {
    const [budgetActive, setBudgetActive] = useState(true);
    const [splitActive, setSplitActive] = useState(false);
    const handleButtonClick = (activeSetter) => {
        // 将所有按钮的状态设置为非活动状态
        setBudgetActive(false);
        setSplitActive(false);
        activeSetter(true);
    }

    return (
        <>
            <Row className='m-4' style={{ alignItems: 'center' }}>
                <Row className='m-4'>
                    <Col className='text-center'><p className='text1'>費用管理</p></Col>
                </Row>
                <Row className="m-4 text2" style={{ justifyContent: 'space-between' }}>
                    <Col sm={1}></Col>
                    <Col sm={5}>
                        <NavLink to='/money' className="supportColor text-left">
                            <a onClick={() => handleButtonClick(setBudgetActive)} style={{ borderBottom: budgetActive ? 'solid 3px #80BCBD' : '0px', color: budgetActive ? 'black' : '#939393' }}>預算管理</a>
                        </NavLink>
                    </Col>
                    <Col sm={5}>
                        <NavLink to='/money' className="supportColor text-right">
                            <a onClick={() => handleButtonClick(setSplitActive)} style={{ borderBottom: splitActive ? 'solid 3px #80BCBD' : '0px', color: splitActive ? 'black' : '#939393' }}>分帳計算</a>
                        </NavLink>
                    </Col>
                    <Col sm={1}></Col>
                </Row>
                {budgetActive && <BudgetManage />}
                {splitActive && <Split />}
            </Row>


        </>
    )
}

export default Money