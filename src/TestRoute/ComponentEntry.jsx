import CommentModal from "../components/CommentModal/index";
import { modal_modules } from "../components/CommentModal/utils";
// react-bootstrap
import Button from "react-bootstrap/Button";

function ComponentEntry() {
    const { show, show_modal, close_modal } = modal_modules();
    return <div className="asd">
        <Button variant="primary" size="sm" onClick={show_modal}>Comment</Button>
        <div className="modal">
            <CommentModal show={show} handleClose={close_modal} iid="1" />
        </div>
    </div>;
}

export default ComponentEntry;
