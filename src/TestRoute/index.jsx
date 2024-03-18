// Local components
import RatingItem from "./RatingItem";
import ComponentEntry from "./ComponentEntry";
import AttractionAndProject from "./AttractionAndProject/index";

function TestRoute() {
    return <div id="test-route" className="m-2">
        <h1>Developer's console</h1>
        <ComponentEntry />
        <hr />
        <RatingItem />
        <hr />
        <AttractionAndProject />
    </div>;
}

export default TestRoute;
