import "./style.css";
// import { useTranslation } from "react-i18next";

/**
 * @see <https://codepen.io/jamesbarnett/pen/najzYK>
 * @returns number
 */
function PurestarRating({ onrate, rateControlId }) {
    return (<div style={{ overflowY: "auto" }} data-cid={rateControlId}>
        <div>
            {/* <label>{useTranslation().t("comment-form-rate")}</label> */}
            <label htmlFor="">comment-form-rate</label>
        </div>
        <fieldset className="the-rating" onChange={onrate}>
            <input type="radio" id="form-rating-star5" name="rating" value="10" />
            <label className="full" htmlFor="form-rating-star5" title="Awesome - 5 stars"></label>
            <input type="radio" id="form-rating-star4half" name="rating" value="9" />
            <label className="half" htmlFor="form-rating-star4half" title="Pretty good - 4.5 stars"></label>
            <input type="radio" id="form-rating-star4" name="rating" value="8" />
            <label className="full" htmlFor="form-rating-star4" title="Pretty good - 4 stars"></label>
            <input type="radio" id="form-rating-star3half" name="rating" value="7" />
            <label className="half" htmlFor="form-rating-star3half" title="Meh - 3.5 stars"></label>
            <input type="radio" id="form-rating-star3" name="rating" value="6" />
            <label className="full" htmlFor="form-rating-star3" title="Meh - 3 stars"></label>
            <input type="radio" id="form-rating-star2half" name="rating" value="5" />
            <label className="half" htmlFor="form-rating-star2half" title="Kinda bad - 2.5 stars"></label>
            <input type="radio" id="form-rating-star2" name="rating" value="4" />
            <label className="full" htmlFor="form-rating-star2" title="Kinda bad - 2 stars"></label>
            <input type="radio" id="form-rating-star1half" name="rating" value="3" />
            <label className="half" htmlFor="form-rating-star1half" title="Meh - 1.5 stars"></label>
            <input type="radio" id="form-rating-star1" name="rating" value="2" />
            <label className="full" htmlFor="form-rating-star1" title="Sucks big time - 1 star"></label>
            <input type="radio" id="form-rating-starhalf" name="rating" value="1" />
            <label className="half" htmlFor="form-rating-starhalf" title="Sucks big time - 0.5 stars"></label>
        </fieldset>
    </div>);
}

export default PurestarRating;
