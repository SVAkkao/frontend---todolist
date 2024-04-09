import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

const API_HOST = process.env.REACT_APP_API_URL;
function Pic({ journeyDataJid,update_info }) {

  const [images, setImages] = useState([]);
  // 用于展示的图片预览（Base64编码）
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (event) => {
    const selectedImages = event.target.files;
    const imageArray = Array.from(selectedImages);
    setImages([...images, ...imageArray]);

    // 为每个选中的图片创建FileReader进行读取
    imageArray.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        // 读取完成后，将图片数据添加到状态中
        setImagePreviews((prevPreviews) => [...prevPreviews, e.target.result]);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("jid", journeyDataJid);

    images.forEach((image) => {
      formData.append("jimg[]", image);
    });

    console.log(formData);

    fetch(API_HOST + "/api/images/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .then(()=>{
        update_info();
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <Row className="m-4" style={{ alignItems: "center" }}>
        <Col sm={1} xs={0}></Col>
        <Col sm={10} xs={12}>
          <Form.Label className="text-left ">圖片</Form.Label>
        </Col>
        <Col sm={1} xs={0}></Col>
        <Col sm={1} xs={0}></Col>
        <React.Fragment>
          <Col className="text-left" sm={10} xs={11}>
            <Form.Control
              key={0}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </Col>
          <Col sm={1} xs={1}>
            <Form onSubmit={handleSubmit} className="d-inline" title="submit">
              <button
                type="submit"
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <img
                  src="/UserListSource/send.png"
                  style={{
                    width: "20px",
                    height: "20px",
                    paddingBottom: "0",
                  }}
                  alt="submit button"
                />
              </button>
            </Form>
          </Col>
          <Col>
            {imagePreviews.map((imageSrc, index) => (
              <img
                key={index}
                src={imageSrc}
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  margin: "10px",
                }}
              />
            ))}
          </Col>
        </React.Fragment>
      </Row>
    </>
  );
}

export default Pic;
