import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RatingComponent = ({ handleUpdateClick, handleJrateChange, jRateData }) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);

useEffect(
()=>{
console.log(jRateData)
}
,[jRateData]
)

  // 一個處理點擊事件的函數，更新評分狀態
  const handleRating = (newRating) => {
    console.log(newRating)
    handleJrateChange(newRating * 2)
    setShouldUpdate(true);
  };

  useEffect(() => {
    if (shouldUpdate) {
      handleUpdateClick();
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);

  return (
    <Row className="text-right">
      <Col sm={5} className="d-flex align-items-center">

      </Col>
      <Col sm={7} className="d-flex justify-content-end">
        {[...Array(5)].map((_, index) => {
          // 判断当前心形图标是否应该被填充
          const fill =
            index < jRateData / 2 || (index + 1 === jRateData / 2 && jRateData / 2 % 1 !== 0);
          return (
            <span key={index} onClick={() => handleRating(index + 1)}>
              {fill ? (
                <FaHeart
                  style={{
                    color: "red",
                    fontSize: "20px",
                    cursor: "pointer",
                    margin: "2px",
                  }}
                />
              ) : (
                <FaRegHeart
                  style={{
                    color: "red",
                    fontSize: "20px",
                    cursor: "pointer",
                    margin: "2px",
                  }}
                />
              )}
            </span>
          );
        })}
      </Col>
    </Row>
  );
};

export default RatingComponent;
