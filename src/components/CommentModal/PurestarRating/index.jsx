import "./style.css";

/**
 * @see <https://codepen.io/jamesbarnett/pen/najzYK>
 * @returns number
 */
function PurestarRating({ onrate }) {
    return (<div style={{ overflowY: "auto" }}>
        <div>
            <p>評分</p>
        </div>
        <fieldset className="the-rating" onChange={onrate}>
            <input type="radio" id="form-rating-star5" name="rate" value="10" />
            <label className="full" htmlFor="form-rating-star5" title="Awesome - 5 stars"></label>
            <input type="radio" id="form-rating-star4half" name="rate" value="9" />
            <label className="half" htmlFor="form-rating-star4half" title="Pretty good - 4.5 stars"></label>
            <input type="radio" id="form-rating-star4" name="rate" value="8" />
            <label className="full" htmlFor="form-rating-star4" title="Pretty good - 4 stars"></label>
            <input type="radio" id="form-rating-star3half" name="rate" value="7" />
            <label className="half" htmlFor="form-rating-star3half" title="Meh - 3.5 stars"></label>
            <input type="radio" id="form-rating-star3" name="rate" value="6" />
            <label className="full" htmlFor="form-rating-star3" title="Meh - 3 stars"></label>
            <input type="radio" id="form-rating-star2half" name="rate" value="5" />
            <label className="half" htmlFor="form-rating-star2half" title="Kinda bad - 2.5 stars"></label>
            <input type="radio" id="form-rating-star2" name="rate" value="4" />
            <label className="full" htmlFor="form-rating-star2" title="Kinda bad - 2 stars"></label>
            <input type="radio" id="form-rating-star1half" name="rate" value="3" />
            <label className="half" htmlFor="form-rating-star1half" title="Meh - 1.5 stars"></label>
            <input type="radio" id="form-rating-star1" name="rate" value="2" />
            <label className="full" htmlFor="form-rating-star1" title="Sucks big time - 1 star"></label>
            <input type="radio" id="form-rating-starhalf" name="rate" value="1" defaultChecked />
            <label className="half" htmlFor="form-rating-starhalf" title="Sucks big time - 0.5 stars"></label>
        </fieldset>
    </div>);
}

export default PurestarRating;
