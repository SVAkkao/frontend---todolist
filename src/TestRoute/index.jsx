// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee } from "@fortawesome/free-solid-svg-icons"
// Local components
import TheModal from "./Modal";
import RatingItem from "./RatingItem";
// CommentModal
import CommentModal from "../components/CommentModal/index";
import { modal_modules } from "../components/CommentModal/utils";
// react-bootstrap
import Button from "react-bootstrap/Button";

function TestRoute() {
    const { show, show_modal, close_modal } = modal_modules();
    return <div id="test-route" className="m-2">
        <h1>Developer's console</h1>
        <p>
            <cite>Hello Dolly</cite>:
            <FontAwesomeIcon icon={faCoffee} />
        </p>
        <Button variant="primary" size="sm" onClick={show_modal}>Comment</Button>
        <div className="modal">
            <CommentModal show={show} handleClose={close_modal} iid="1" />
        </div>
        <RatingItem />
        <TheModal />
    </div>
}

export default TestRoute;
