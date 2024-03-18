import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { useState } from 'react';

function TheModal() {
    const [attractions, set_attractions] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        const get_attractions = async () => {
            const ajax = await fetch( process.env.REACT_APP_API_URL + "/api/attraction", {
                method: "GET"
            }).then( r => r.json() );
            set_attractions( ajax.result );
        };
        setShow(true);
        get_attractions();
    };
    const project_action = async (ev) => {
        ev.preventDefault();
        const formdata = new FormData(ev.target);
        const ajax = await fetch( process.env.REACT_APP_API_URL + "/api/project", {
            method: "POST", body: formdata
        }).then( r => r.json() );
        alert( ajax.message );
    };
    return <div>
        <Button variant="primary" onClick={handleShow}>新增活動</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>新增活動</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <article>
                    <Form method="post" onSubmit={project_action}>
                        <Form.Group className="mb-3" controlId="formAid">
                            <Form.Label>地點</Form.Label>
                            <Form.Select aria-label="Form attractions" name="aid">
                                { attractions.map( its => <option key={its.aid} value={its.aid}>{its.aname}</option> ) }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPname">
                            <Form.Label>名字</Form.Label>
                            <Form.Control name="pname" placeholder="活動名字" />
                        </Form.Group>
                        <div className="mb-3 panel">
                            <Button variant="primary" type="submit">提交活動</Button>
                        </div>
                    </Form>
                </article>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleClose}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    </div>;
}

export default TheModal;
