// Local components
import TheModal from "./Modal";
import RatingItem from "./RatingItem";
import ComponentEntry from "./ComponentEntry";

function TestRoute() {
    return <div id="test-route" className="m-2">
        <h1>Developer's console</h1>
        <ComponentEntry />
        <RatingItem />
        <TheModal />
    </div>;
}

export default TestRoute;
