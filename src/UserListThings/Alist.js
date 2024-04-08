// Packages
import React from "react";
import { Row, Col } from "react-bootstrap";
// Components
import Fetch from "./Fetch";
import LogoutBar from "../MemberSystem/LogoutBar";
import IndexMiddle from "./Alist/IndexMiddle";
import IndexMiddleXS from "./Alist/IndexMiddleXS";
// Other
import "./color.css";

function Alist() {

    return (<main className="attraction-list">
        <LogoutBar />
        <div className="d-sm-block d-none">
        <Row>
            <Col className="bg-color4">
                <IndexMiddle />
            </Col>
        </Row>
        </div>

        <div className="d-sm-none d-block">

        <Row>
            <Col className="bg-color4">
                <IndexMiddleXS />
            </Col>
        </Row>
        </div>

    </main>)
}

export default Alist