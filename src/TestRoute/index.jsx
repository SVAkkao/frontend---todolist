import ComponentEntry from "./ComponentEntry";
import AttractionAndProject from "./AttractionAndProject";
import CreateComment from "./CreateComment";

function TestRoute() {
    return <div id="test-route" className="m-2">
        <h1>Developer's console</h1>
        <ComponentEntry />
        <hr />
        <AttractionAndProject />
        <CreateComment />
    </div>;
}

export default TestRoute;
