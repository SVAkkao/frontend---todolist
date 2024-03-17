import Modal from "react-bootstrap/Modal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import CommentForm from "./CommentForm";
// Local
import { modal_modules, modal_mode_modules } from "./utils";
// import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee, faTrash, faPen } from "@fortawesome/free-solid-svg-icons"

export default function OprationPanel() {
    // const { t } = useTranslation();
    const { show, close_modal, show_modal } = modal_modules();
    const modalmode = modal_mode_modules();
    const open_removing = () => {
        modalmode.set_mode(modalmode.REMOVING);
        show_modal();
    };
    const open_editing = () => {
        modalmode.set_mode(modalmode.EDITING);
        show_modal();
    };
    // HTML
    return <div className="item-panel">
        {/* <i className="click-icon fa-solid fa-trash" onClick={open_removing}></i>
        <i className="click-icon fa-solid fa-pen" onClick={open_editing}></i> */}
        
        <FontAwesomeIcon icon={faTrash} className="click-icon" onClick={open_removing} />
        <FontAwesomeIcon icon={faPen} className="click-icon" onClick={open_editing} />
        <div className="modals">
            <Modal id="edit-form-modal" size="xs" centered show={show} onHide={close_modal}>
                <Modal.Header closeButton>
                    <Modal.Title>{("edit-form")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalmode.mode === modalmode.REMOVING ? <DeleteConfirmModal iid="123" hideModal={close_modal} /> : <div></div>}
                    {modalmode.mode === modalmode.EDITING ? <CommentForm iid="123" submitAction={close_modal} /> : <div></div>}
                </Modal.Body>
            </Modal>
        </div>
    </div>;
}