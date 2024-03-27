// react-bootstrap
import { Container, Button, Form } from "react-bootstrap";
import CommentModal from "./CommentModal";
import { modal_modules } from "./CommentModal/utils";
import { UsersCommentItem } from "./CommentModal/CommentItem/index";
import LogoutBar from "../MemberSystem/LogoutBar";
import { useState, useEffect } from "react";
import { get_user_comments_api } from "./CommentModal/api";

async function get_project_api() {
    const r = await fetch(`${process.env.REACT_APP_API_URL}/api/project`, {
        method: "GET",
    });
    return await r.json();
}

function PidSelector({ change_action }) {
    // Get projects
    const [projects, set_projects] = useState([]);
    const get_projects = () => {
        get_project_api().then((response) => {
            set_projects(response.result);
        });
    };
    useEffect(() => {
        get_projects();
    }, []);
    // Search keyword
    const [query, set_query] = useState("");
    // Build result list
    const max_limit = 5;
    const build_list = (source_projects = [], query = "", limit = 5) => {
        return source_projects.filter(({ pname }) => pname.includes(query)).slice(0, limit);
    };
    // DOM rendering
    const result_list = build_list(projects, query, max_limit).map((its) => (<Button
        key={its.pid}
        variant="secondary"
        className="m-2"
        data-pid={its.pid}
        data-aid={its.aid}
        onClick={() => change_action(its.pid)}
    >
        {its.pname}
    </Button>)
    );
    return (<section className="pid-selectors">
        <div className="search-form mb-3">
            <Form.Label htmlFor="search-project-query">請輸入關鍵字</Form.Label>
            <Form.Control
                type="text"
                id="search-project-query"
                aria-describedby="search-project-query-description"
                value={query}
                onChange={(e) => set_query(e.target.value)}
            />
            <Form.Text id="search-project-query-description" muted>
                除了關鍵字以外，還有 {projects.length - result_list.length} 個景點活動等待你發掘
            </Form.Text>
        </div>
        {result_list}
    </section>);
}

function ProjectComponents() {
    const [pid, set_pid] = useState(1);
    const { show, show_modal, close_modal } = modal_modules();
    const change_pid = (id) => {
        set_pid(id);
        show_modal();
    };
    return (
        <article className="project-comment" data-pid={pid}>
            <h2 className="mb-4">各景點活動的意見</h2>
            <PidSelector change_action={change_pid} />
            <div className="modal">
                <CommentModal show={show} handleClose={close_modal} pid={pid} />
            </div>
        </article>
    );
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
        get_user_comments_api().then(({ result }) => set_list(result));
    };
    useEffect(() => {
        request_list();
    }, []);
    const comment_item = (item) => (
        <UsersCommentItem
            key={item.cid}
            item={item}
            onEdit={edit_action}
            onDelete={delete_action} />
    );
    return (
        <article className="user-comment">
            <h2 style={{ padding: "10px 0px" }}>用戶發表的意見</h2>
            {list.map(comment_item)}
        </article>
    );
}

function RatingRoute() {
    return (
        <div
            id="rating-route"
            style={{
                backgroundColor: "#fffeef",
                minHeight: "100vh",
            }}
        >
            <LogoutBar />
            <Container>
                <div
                    style={{
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        padding: "20px",
                        marginTop: "50px",

                        borderRadius: "10px",
                    }}
                >
                    <div style={{ padding: "10px" }}>
                        <ProjectComponents />
                    </div>
                    <hr></hr>
                    <div style={{ padding: "10px" }}>
                        <UserComments />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default RatingRoute;
