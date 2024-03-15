import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee, faStar, faStarHalf, faTrash, faPen, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"

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

function TestRoute() {
    // const RatingItem = newFunction();
    return <div id="test-route" className="m-2">
        <p>
            <cite>Hello Dolly</cite>:
            <FontAwesomeIcon icon={faCoffee} />
        </p>
        <RatingItem />
        <RatingItem />
        <RatingItem />
    </div>

    
}

export default TestRoute;
