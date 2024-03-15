import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalf, faTrash, faPen, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"

function RatingItem() {
    return <div className="rate">
        <FontAwesomeIcon icon={faTrash} />
        <FontAwesomeIcon icon={faPen} />
        <img src="/logo.svg" alt="Logo" width="36" />
        <span>Hoasn</span>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStarHalf} />
        <FontAwesomeIcon icon={faClockRotateLeft} />
    </div>;
}

export default RatingItem;
