import TheModal from "./Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AttractionAndProject() {
    const attractions_action = async (ev) => {
        ev.preventDefault();
        const formdata = new FormData(ev.target);
        const ajax = await fetch( process.env.REACT_APP_API_URL + "/api/attraction", {
            method: "POST", body: formdata
        }).then( r => r.json() );
        alert( ajax.message );
    };
    return <div>
        <Form onSubmit={attractions_action} style={{ maxWidth: "460px" }}>
            <Form.Group className="mb-3" controlId="formBasicComment">
                <Form.Label>景點</Form.Label>
                <Form.Control type="text" placeholder="輸入景點" name="aname" required />
            </Form.Group>
            <div className="mb-3 panel">
                <Button type="submit">提交景點</Button>
            </div>
        </Form>
        <TheModal />
    </div>
}
