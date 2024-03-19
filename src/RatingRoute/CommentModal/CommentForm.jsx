import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PurestarRating from "./PurestarRating/index";
import { useState, useRef, useEffect } from "react";

export default function CommentForm({ pid, submitAction, method, preloadDatas }) {
    const formref = useRef(null);
    const [preloaded_comment, set_preloaded_comment] = useState("");
    const action = (b) => {
        b.preventDefault();
        submitAction(b.target);
    };

    const cover_preloaded_data = (preloadDatas) => {
        if (!preloadDatas || !formref.current) {
            console.log(formref.current);
            return;
        }
        if (preloadDatas.comment) {
            console.log(preloadDatas.comment);
            set_preloaded_comment(preloadDatas.comment);
        }
        if (preloadDatas.rate) {
            const rate_dom = `input[name="rate"]`;
            const preloaded_rate = preloadDatas.rate || "1";
            formref.current.querySelector(`${rate_dom}:checked`).removeAttribute("checked");
            formref.current.querySelector(`${rate_dom}[value="${preloaded_rate}"]`).checked = "true";
        }
    }
    useEffect(() => {
        cover_preloaded_data(preloadDatas);
    }, [preloadDatas]);
    return (<Form onSubmit={action} data-method={method} ref={formref}>
        <input type="hidden" name="pid" value={pid} />
        <Form.Group className="mb-3" controlId="formBasicComment">
            <Form.Label>評論</Form.Label>
            <Form.Control
                name="comment"
                type="text"
                placeholder="輸入評論..."
                required
                value={preloaded_comment}
                onChange={ev => set_preloaded_comment(ev.target.value)}
            />
        </Form.Group>
        <div className="mb-3 rating">
            <PurestarRating  />
        </div>
        <div className="mb-3 panel">
            <Button variant="primary" type="submit">提交</Button>
        </div>
    </Form>);
}