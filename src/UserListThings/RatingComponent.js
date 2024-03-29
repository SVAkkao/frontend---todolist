import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RatingComponent = () => {
  // 定義狀態來存儲用戶的評分
  const [rating, setRating] = useState(0);

  // 一個處理點擊事件的函數，更新評分狀態
  const handleRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <Row className="text-right">
      <Col sm={5} className="d-flex align-items-center">
        <Form.Label className="text-left">感想</Form.Label>
      </Col>
      <Col sm={7} className="d-flex justify-content-end">
        {[...Array(5)].map((_, index) => {
          // 判断当前心形图标是否应该被填充
          const fill =
            index < rating || (index + 1 === rating && rating % 1 !== 0);
          return (
            <span key={index} onClick={() => handleRating(index + 1)}>
              {fill ? (
                <FaHeart
                  style={{
                    color: "HotPink",
                    fontSize: "20px",
                    cursor: "pointer",
                    margin: "2px",
                  }}
                />
              ) : (
                <FaRegHeart
                  style={{
                    color: "HotPink",
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
