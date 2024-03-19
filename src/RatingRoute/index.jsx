import CommentModal from "./CommentModal";
import { modal_modules } from "./CommentModal/utils";
// Other components
import CreateComment from "../components/CreateComment";
import AttractionAndProject from "../components/AttractionAndProject";
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
    // DOM render
    return <ul>
        {/* { "pid": 1, "aid": 3, "pname": "金融中心遺址" } */}
        { projects.map( its => <li key={its.pid} className="m-2">
            <Button
                data-pid={its.pid} data-aid={its.aid} variant="secondary"
                onClick={() => change_action(its.pid)}
            >{ its.pname }</Button>
        </li> ) }
    </ul>
}

function ComponentEntry() {
    const [pid, set_pid] = useState(1);
    const { show, show_modal, close_modal } = modal_modules();
    return <div className="asd">
        <PidSelector change_action={set_pid} />
        <p>
            <Button variant="primary" size="sm" onClick={show_modal}>Comment</Button>
            PID: {pid}
        </p>
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
