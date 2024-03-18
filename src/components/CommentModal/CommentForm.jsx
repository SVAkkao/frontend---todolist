import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PurestarRating from "./PurestarRating/index";
import { useState } from "react";

export default function CommentForm({ pid, submitAction }) {
    const action = (b) => {
        b.preventDefault();
        submitAction(b.target);
    }
    return (<Form onSubmit={action}>
        <input type="hidden" name="pid" value={pid} />
        <Form.Group className="mb-3" controlId="formBasicComment">
            <Form.Label>評論</Form.Label>
            <Form.Control type="text" placeholder="輸入評論..." name="comment" required />
        </Form.Group>
        <div className="mb-3 rating">
            <PurestarRating />
        </div>
        <div className="mb-3 panel">
            <Button variant="primary" type="submit">提交</Button>
        </div>
    </Form>);
}