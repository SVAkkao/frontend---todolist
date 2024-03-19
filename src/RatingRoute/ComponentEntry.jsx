import CommentModal from "../components/CommentModal/index";
import { modal_modules } from "../components/CommentModal/utils";
// react-bootstrap
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

function PidSelector({ change_action }) {
    const [projects, set_projects] = useState([]);
    const get_projects = () => {
        const ajax = fetch(`${process.env.REACT_APP_API_URL}/api/project`, {
            method: "GET",
        }).then( s => s.json() );
        ajax.then( (response) => {
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
    return <select name="pid" onChange={(ev) => change_action(ev.target.value)}>
        {projects.map(its => <option key={its.pid} value={its.pid}>{its.pname} at {its.aid}</option>)}
    </select>;
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

export default ComponentEntry;
