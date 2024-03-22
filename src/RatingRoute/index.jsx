// react-bootstrap
import { Container, Button, Row, Col } from "react-bootstrap";
import CommentModal from "./CommentModal";
import { modal_modules } from "./CommentModal/utils";
import { UsersCommentItem } from "./CommentModal/CommentItem/index";
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
    return <section className="pid-selectors">
        { projects.map( its => <Button key={its.pid}
            variant="secondary" className="m-2"
            data-pid={its.pid} data-aid={its.aid}
            onClick={() => change_action(its.pid)}
        >{ its.pname }</Button> ) }
    </section>
}

function ProjectComponents() {
    const [pid, set_pid] = useState(1);
    const { show, show_modal, close_modal } = modal_modules();
    const change_pid = (id) => {
        set_pid(id);
        show_modal();
    };
    return <article className="project-comment">
        <h2>各景點活動的意見</h2>
        <p>點選項目以顯示意見</p>
        <PidSelector change_action={change_pid} />
        <p>PID: {pid}</p>
        <div className="modal">
            <CommentModal show={show} handleClose={close_modal} pid={pid} />
        </div>
    </article>;
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
    return <article className="user-comment">
        <h2>用戶發表的意見</h2>
        {list.map( (item) => <UsersCommentItem key={item.cid} item={item} onEdit={edit_action} onDelete={delete_action} /> )}
    </article>;
}

function RatingRoute() {
    return <div id="rating-route">
        <LogoutBar />
        <Container className="vh-100">
            <Row>
                <h1 className="text-center mb-3">評價系統</h1>
            </Row>
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
