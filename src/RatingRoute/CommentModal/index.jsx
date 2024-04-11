// react-bootstrap
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import CommentForm from "./CommentForm";
import { ModalCommentItem } from "./CommentItem/index";
// Local
import { list_modules } from "./utils";
import { create_comment_api } from "./api";
import "./style.css";

export default function CommentModal({ show, handleClose, pid, pname }) {
    const requesting_api = `${process.env.REACT_APP_API_URL}/api/project/${pid}/comments`;
    const { the_list, ajax_list } = list_modules(requesting_api);
    const submit_action = (form_dom) => {
        create_comment_api(form_dom).then( (response) => {
            console.log(response);
            ajax_list();
        }).catch( (response) => {
            console.error(response);
            alert(response.message);
        });
    };
    const render_title = (pname = "") => pname ? `${pname}的評論` : "評論";
    const is_empty = (array = []) => array.length < 1;
    return (<Modal
        id="comment-modal" size="lg"
        show={show} data-pid={pid}
        onShow={ajax_list} onHide={handleClose}
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>{ render_title(pname)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className={ is_empty(the_list) ? "text-center" : ""}>
                { is_empty(the_list) ? "沒有評論" : "" }
            </p>
            <ListGroup>
                {the_list.map( (item) => <ModalCommentItem
                    key={item.cid}
                    item={item}
                    onEdit={ajax_list}
                    onDelete={ajax_list}
                /> )}
            </ListGroup>
            <hr />
            <div>
                <CommentForm
                    submitAction={submit_action}
                    pid={pid}
                    method="POST"
                />
            </div>
        </Modal.Body>
    </Modal>);
}

