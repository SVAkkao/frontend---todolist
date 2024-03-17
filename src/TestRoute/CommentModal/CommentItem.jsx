import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import OprationPanel from "./OprationPanel";

/**
 * How many stars should we have?
 * @param {String} r 
 * @returns 
 */
const generate_rate = (r = "0") => {
    // Stars
    const rate = Number(r);
    const half = 2;
    const full_star_num = Math.floor(rate / half);
    const half_star_num = rate % half;
    // Array
    const result = [];
    for (let i = 0; i < full_star_num; i++) {
        result.push("fa-solid fa-star");
    }
    for (let j = 0; j < half_star_num; j++) {
        result.push("fa-solid fa-star-half");
    }
    // Empty stars
    /*
    const empty_star_num = (10 / 2) - full_star_num - half_star_num;
    for (let j = 0; j < empty_star_num; j++) {
        result.push("fa-regular fa-star");
    }
    */
    return result;
};

export default function CommentItem({ item }) {
    const imgsize = 48; 
    const stars = generate_rate(item.rate);
    return <ListGroup.Item className="comment-panel">
        <OprationPanel />
        <div className="item-panel">
            <Image width={imgsize} height={imgsize} src={item.avatar} roundedCircle />
            <p>{ item.comment }</p>
        </div>
        <div className="item-panel">
            <span>
                { stars.map( (c, i) => <i key={i} className={c} /> ) }
            </span>
        </div>
    </ListGroup.Item>;
}