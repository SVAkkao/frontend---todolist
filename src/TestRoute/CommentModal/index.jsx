// react-bootstrap
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
// Local
// import PurestarRating from "./PurestarRating/index";
import { list_modules } from "./utils";
// import { useTranslation } from 'react-i18next';
import "./style.css";

export default function CommentModal({ iid, show, handleClose }) {
    // const { t } = useTranslation();
    const { the_list, ajax_list } = list_modules("/api/test.json");
    const action = (b) => {
        console.log(b);
        // AJAX
        ajax_list();
    };
    return (<Modal id="comment-modal" size="lg" data-iid={iid} show={show} onShow={ajax_list} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>{("todo-comments")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/*  */}
            <ListGroup>
                {the_list.map( (item) => <CommentItem key={item.id} item={item} /> )}
            </ListGroup>
            <hr />
            <div>
                <CommentForm submitAction={action} />
            </div>
        </Modal.Body>
    </Modal>);
}
