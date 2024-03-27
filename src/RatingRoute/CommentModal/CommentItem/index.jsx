import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
// Local
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { ModalOprationPanel, UserOprationPanel } from "./OprationPanel";

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
    result.push(FaStar);
  }
  for (let j = 0; j < half_star_num; j++) {
    result.push(FaStarHalf);
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

const RatingItem = ({ rate = "0" }) => {
  const stars = generate_rate(rate);
  return (
    <span style={{ color: "#FFD700" }}>
      {stars.map((Icon, i) => (
        <Icon key={i} />
      ))}
    </span>
  );
};

const DEFAULT_ITEM = {
  cid: "",
  username: "",
  projectname: "",
  photo: "",
  comment: "",
  rate: 5,
  created_at: "",
};

const UserAvatar = ({ username, photo, imgsize }) => {
  const alt = `The profile picture of user ${username}`;
  const src = photo || "avatar-template.svg";
  return <Image
    roundedCircle
    width={imgsize}
    height={imgsize}
    src={src}
    alt={alt}
  />;
};

/**
 * Used by the 各景點活動的意見 modal
 * @param {*} param
 * @returns
 */
export function ModalCommentItem({ item = DEFAULT_ITEM, onEdit, onDelete }) {
  return (
    <ListGroup.Item className="comment-panel">
      <ModalOprationPanel
        cid={item.cid}
        onEdit={onEdit}
        onDelete={onDelete}
        preloadDatas={item}
      />
      <div className="item-panel">
        <UserAvatar imgsize={48} {...item} />
        <p>{item.comment}</p>
      </div>
      <div className="item-panel">
        <RatingItem rate={item.rate} />
      </div>
    </ListGroup.Item>
  );
}

/**
 * Used by the 用戶發表的意見 list
 * @param {*} param
 * @returns
 */
export function UsersCommentItem({ item = DEFAULT_ITEM, onEdit, onDelete }) {
  return (
    <Card className="user-comment-panel mb-4">
      <Card.Body>
        <Card.Title>
          <div className="user-comment-header">
            <div className="item -avatar p-1">
              <UserAvatar imgsize={64} {...item} />
            </div>
            <div
              className="item -info"
              style={{ fontSize: "22px", marginLeft: "10px", marginTop: "6px" }}
            >
              <div>
                <p className="title usertitle">
                  <span className="allcaps">{item.username}</span> @{" "}
                  <span>{item.projectname}</span>
                </p>
                <span>
                  <time dateTime={item.created_at}>
                    {new Date(item.created_at).toUTCString()}
                  </time>
                </span>
              </div>
            </div>

            <div className="item -opration">
              <UserOprationPanel
                cid={item.cid}
                onEdit={onEdit}
                onDelete={onDelete}
                preloadDatas={item}
              />
            </div>
          </div>
          <div style={{ padding: "3px" }}>
            <RatingItem rate={item.rate} />
          </div>
        </Card.Title>
        <Card.Text style={{ marginLeft: "5px", fontSize: "16px" }}>
          <span>{item.comment}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
