// react-bootstrap
import { Container, Button, Row, Col } from "react-bootstrap";
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
  const [projects, set_projects] = useState([]);
  const get_projects = () => {
    get_project_api().then((response) => {
      set_projects(response.result);
    });
  };
  useEffect(() => {
    get_projects();
  }, []);
  const btn_item = (its) => (<Button
      key={its.pid}
      variant="secondary"
      className="m-2"
      data-pid={its.pid}
      data-aid={its.aid}
      onClick={() => change_action(its.pid)}
    >
    {its.pname}
  </Button>);
  // DOM render
  return (
    <section className="pid-selectors">
      {projects.map(btn_item)}
    </section>
  );
}

function ProjectComponents() {
  const [pid, set_pid] = useState(1);
  const { show, show_modal, close_modal } = modal_modules();
  const change_pid = (id) => {
    set_pid(id);
    show_modal();
  };
  return (
    <article className="project-comment">
      <h2 style={{ padding: "10px 0px" }}>各景點活動的意見</h2>

      <h5>點選項目以顯示意見</h5>
      <PidSelector change_action={change_pid} />
      <p>PID: {pid}</p>
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
