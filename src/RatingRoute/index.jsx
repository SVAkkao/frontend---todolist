// react-bootstrap
import { Container, Button, ListGroup, Row, Col } from "react-bootstrap";
import CommentModal from "./CommentModal";
import { modal_modules } from "./CommentModal/utils";
import CommentItem from "./CommentModal/CommentItem";
import LogoutBar from "../MemberSystem/LogoutBar";
import { useState, useEffect } from "react";
import { get_user_comments_api } from "./CommentModal/api";

async function get_project_api() {
    const r = await fetch(
        `${process.env.REACT_APP_API_URL}/api/project`,
        { method: "GET", }
    );
    return await r.json();
}

function PidSelector({ change_action }) {
    const [projects, set_projects] = useState([]);
    const get_projects = () => {
        get_project_api().then( (response) => {
            set_projects(response.result);
        });
    };
    useEffect(() => {
        let mounted = true;
        if( mounted ) {
            get_projects();
        }
        return () => mounted = false;
    }, []);
    // DOM render
    return <ul style={{ listStyle: "none" }}>
        {/* { "pid": 1, "aid": 3, "pname": "金融中心遺址" } */}
        { projects.map( its => <li key={its.pid} className="m-2">
            <Button
                data-pid={its.pid} data-aid={its.aid} variant="secondary"
                onClick={() => change_action(its.pid)}
            >{ its.pname }</Button>
        </li> ) }
    </ul>
}

function ProjectComponents() {
    const [pid, set_pid] = useState(1);
    const { show, show_modal, close_modal } = modal_modules();
    return <div className="project-comment">
        <h2>各景點活動的意見</h2>
        <PidSelector change_action={set_pid} />
        <p>PID: {pid}</p>
        <div>
            <Button variant="primary" size="sm" onClick={show_modal}>Read comment</Button>
        </div>
        <div className="modal">
            <CommentModal show={show} handleClose={close_modal} pid={pid} />
        </div>
    </div>;
}

function UserComments() {
    const [list, set_list] = useState([]);
    const edit_action = (e) => {
        request_list();
    };
    const delete_action = (e) => {
        request_list();
    };
    const request_list = () => {
        get_user_comments_api().then( ({ result }) => set_list(result) );
    };
    useEffect(() => {
        request_list();
    }, []);
    return <div className="user-comment">
        <h2>用戶發表的意見</h2>
        <ListGroup>
            {list.map( (item) => <CommentItem key={item.cid} item={item} onEdit={edit_action} onDelete={delete_action} /> )}
        </ListGroup>
    </div>;
}

function RatingRoute() {
    return <div id="rating-route">
        <LogoutBar></LogoutBar>
        <Container fluid className="vh-100">
            <h1 className="text-center mb-3">評價系統</h1>
            <Row className="h-100">
                <Col sm={6}>
                    <ProjectComponents />
                </Col>
                <Col sm={6}>
                    <UserComments />
                </Col>
            </Row>
        </Container>
    </div>;
}

export default RatingRoute;
