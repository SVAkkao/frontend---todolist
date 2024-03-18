// react-bootstrap
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
// Local
import { list_modules } from "./utils";
import "./style.css";

export default function CommentModal({ show, handleClose, pid }) {
    const requesting_api = `${process.env.REACT_APP_API_URL}/api/project-comment/${pid}`;
    const { the_list, ajax_list } = list_modules(requesting_api);
    const submit_action = (form_dom) => {
        const ajax_api = `${process.env.REACT_APP_API_URL}/api/comment`;
        const token = localStorage.getItem("userToken");
        const ajax = fetch( ajax_api, {
            method: form_dom.dataset.method,
            body: new FormData(form_dom),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        }).then( r => r.json() );
        ajax.then( (response) => {
            console.log(response);
            ajax_list();
        }).catch( (response) => {
            console.error(response);
            alert(response.message);
        });
    };
    return (<Modal id="comment-modal" size="lg" show={show} onShow={ajax_list} onHide={handleClose} data-pid={pid} centered>
        <Modal.Header closeButton>
            <Modal.Title>評論</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className="as">{ the_list.length < 1 ? "NO DATA" : "" }</p>
            <ListGroup>
                {/* onEdit, onDelete */}
                {the_list.map( (item) => <CommentItem key={item.cid} item={item} onEdit={ajax_list} onDelete={ajax_list} /> )}
            </ListGroup>
            <hr />
            <div>
                <CommentForm submitAction={submit_action} pid={pid} method="POST" />
            </div>
        </Modal.Body>
    </Modal>);
}
