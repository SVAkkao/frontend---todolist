import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import TheModal from "./Modal";
import RatingItem from "./RatingItem";

function TestRoute() {
    // const RatingItem = newFunction();
    return <div id="test-route" className="m-2">
        <h1>Developer's console</h1>
        <p>
            <cite>Hello Dolly</cite>:
            <FontAwesomeIcon icon={faCoffee} />
        </p>
        <RatingItem />
        <RatingItem />
        <RatingItem />
        <TheModal />
    </div>
}

export default TestRoute;
