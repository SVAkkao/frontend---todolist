// Packages
import React from "react";
import { Row, Col } from "react-bootstrap";
// Components
import Fetch from "./Fetch";
import LogoutBar from "../MemberSystem/LogoutBar";
import IndexMiddle from "./Alist/IndexMiddle";
// Other
import "./color.css";

function Alist() {
    return (<main className="attraction-list">
            <LogoutBar />
            <Row>
                <Col sm={3}>
                    <Fetch />
                </Col>
                <Col sm={9} className="bg-color4">
                    <IndexMiddle />
                </Col>
            </Row>
    </main>)
}

export default Alist