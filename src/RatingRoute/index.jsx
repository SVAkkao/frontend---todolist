import { modal_modules } from "../components/CommentModal/utils";
import CommentModal from "../components/CommentModal";
// Other components
import AttractionAndProject from "../components/AttractionAndProject";
import CreateComment from "../components/CreateComment";
// react-bootstrap
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

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
    const it_comp = its => <option key={its.pid} value={its.pid}>{its.pname} at {its.aid}</option>;
    const ca_actn = (ev) => change_action(ev.target.value);
    return <select name="pid" onChange={ca_actn}>{projects.map(it_comp)}</select>;
}

function ComponentEntry() {
    const [pid, set_pid] = useState(1);
    const { show, show_modal, close_modal } = modal_modules();
    return <div className="asd">
        <PidSelector change_action={set_pid} />
        <Button variant="primary" size="sm" onClick={show_modal}>Comment</Button>
        <div className="modal">
            <CommentModal show={show} handleClose={close_modal} pid={pid} />
        </div>
    </div>;
}

function RatingRoute() {
    return <div id="rating-route" className="m-2">
        <h1>評價系統</h1>
        <ComponentEntry />
        <div className="m-2" hidden>
            <AttractionAndProject />
            <hr />
            <CreateComment />
        </div>
    </div>;
}

export default RatingRoute;
