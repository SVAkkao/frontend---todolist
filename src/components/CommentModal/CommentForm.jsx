import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PurestarRating from "./PurestarRating/index";
// import { useTranslation } from "react-i18next";

export default function CommentForm({ iid, submitAction, rateControlId }) {
    // const { t } = useTranslation();
    const onrate = (ev) => {
        const rate = Number(ev.target.value);
        console.log(rate);
    };
    const action = (b) => {
        b.preventDefault();
        submitAction(b);
    }
    return (<Form onSubmit={action}>
        <input type="hidden" name="id" value={iid} />
        <Form.Group className="mb-3" controlId="formBasicComment">
            <Form.Label>評論</Form.Label>
            <Form.Control type="text" placeholder="輸入評論..." />
        </Form.Group>
        <div className="mb-3 rating">
            <PurestarRating onrate={onrate} rateControlId={rateControlId} />
        </div>
        <div className="mb-3 panel">
            <Button variant="primary" type="submit">提交</Button>
        </div>
    </Form>);
}