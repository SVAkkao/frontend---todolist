// react-bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
// Local
import CommentForm from "./CommentForm";
import { modal_modules, modal_mode_modules } from "./utils";

function DeleteConfirmModal({ hideModal, iid }) {
    const close = () => {
        console.log(iid);
        hideModal();
    };
    return (<div>
        <p>您確定要刪除嗎？<strong className="allcaps">此操作無法撤銷</strong>！</p>
        <ButtonGroup aria-label="Basic example">
            <Button onClick={close} variant="danger">刪除</Button>
            <Button onClick={close} variant="secondary">取消</Button>
        </ButtonGroup>
    </div>);
}

export default function OprationPanel({ pid, cid, onDelete, onEdit, preloadDatas }) {
    const { show, close_modal, show_modal } = modal_modules();
    const modalmode = modal_mode_modules();
    // Removing actions
    const open_removing = () => {
        modalmode.set_mode(modalmode.REMOVING);
        show_modal();
    };
    const close_removing = () => {
        const ajax_api = `${process.env.REACT_APP_API_URL}/api/comment/${cid}`;
        const token = localStorage.getItem("userToken");
        const ajax = fetch( ajax_api, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        }).then( r => r.json() );
        ajax.then( (response) => {
            console.log(response);
            onDelete();
            close_modal();
        }).catch( (response) => {
            console.error(response);
            alert(response.message);
        });
    };
    // Editing actions
    const open_editing = () => {
        modalmode.set_mode(modalmode.EDITING);
        show_modal();
    };
    const close_editing = (form_dom) => {
        const ajax_api = `${process.env.REACT_APP_API_URL}/api/comment/${cid}`;
        const token = localStorage.getItem("userToken");
        function get_request_params(form_dom) {
            const result = new FormData();
            result.append("comment", form_dom.comment.value);
            result.append("rate", form_dom.rate.value);
            return result;
        }
        console.log(form_dom.method);
        const ajax = fetch( ajax_api, {
            method: form_dom.dataset.method,
            body: get_request_params(form_dom),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        }).then( r => r.json() );
        ajax.then( (response) => {
            console.log(response);
            onEdit();
            close_modal();
        }).catch( (response) => {
            console.error(response);
            alert(response.message);
        });
    };
    // HTML
    return <div className="item-panel">
        <FontAwesomeIcon icon={faTrash} className="click-icon" onClick={open_removing} />
        <FontAwesomeIcon icon={faPen} className="click-icon" onClick={open_editing} />
        <div className="modals">
            <Modal id="edit-form-modal" size="xs" centered show={show} onHide={close_modal}>
                <Modal.Header closeButton>
                    <Modal.Title>編輯</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalmode.mode === modalmode.REMOVING ? <DeleteConfirmModal hideModal={close_removing} /> : <div></div>}
                    {modalmode.mode === modalmode.EDITING ? <CommentForm pid={pid} submitAction={close_editing} preloadDatas={preloadDatas} method="PATCH" /> : <div></div>}
                </Modal.Body>
            </Modal>
        </div>
    </div>;
}