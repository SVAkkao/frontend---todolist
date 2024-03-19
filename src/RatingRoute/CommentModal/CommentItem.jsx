// react-bootstrap
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"
// Local
import OprationPanel from "./OprationPanel";

/**
 * How many stars should we have?
 * @param {String} r Rate input
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
        result.push(faStar);
    }
    for (let j = 0; j < half_star_num; j++) {
        result.push(faStarHalf);
    }
    // Empty stars
    /*
    const empty_star_num = (10 / 2) - full_star_num - half_star_num;
    for (let j = 0; j < empty_star_num; j++) {
        result.push(faStar); // How to git an empty star, anyway?
    }
    */
    return result;
};

const DEFAULT_ITEM = { "cid": "", "avatar": "", "rate": "", "comment": "", "date": "", "pid": "", "uid": "" };

export default function CommentItem({ item = DEFAULT_ITEM, onEdit, onDelete }) {
    const imgsize = 48; 
    const stars = generate_rate(item.rate);
    const alt = `User ${item.uid}`;
    const src = item.photo || "avatar-template.svg";
    return <ListGroup.Item className="comment-panel">
        {/*  */}
        <OprationPanel cid={item.cid} onEdit={onEdit} onDelete={onDelete} preloadDatas={item} />
        <div className="item-panel">
            <Image width={imgsize} height={imgsize} src={src} roundedCircle alt={alt} />
            <p>{ item.comment }</p>
        </div>
        <div className="item-panel">
            <span>
                { stars.map( (c, i) => <FontAwesomeIcon key={i} icon={c} /> ) }
            </span>
        </div>
    </ListGroup.Item>;
}