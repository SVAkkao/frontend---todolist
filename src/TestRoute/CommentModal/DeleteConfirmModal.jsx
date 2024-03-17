import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
// import { useTranslation, Trans } from "react-i18next";

export default function DeleteConfirmModal({ hideModal, iid }) {
    // const { t } = useTranslation();
    const close = () => {
        console.log(iid);
        hideModal();
    };
    return (<div>
        {/* <p> <Trans i18nKey="delete-check" components={{ bolds: <strong className="allcaps"></strong> }} /> </p> */}
        <p>WARNING</p>
        <ButtonGroup aria-label="Basic example">
            <Button onClick={close} variant="danger">{("delete-form")}</Button>
            <Button onClick={close} variant="secondary">{("cancel-action")}</Button>
        </ButtonGroup>
    </div>);
}