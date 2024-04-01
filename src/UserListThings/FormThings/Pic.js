import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap';

const API_HOST = process.env.REACT_APP_API_URL;
function Pic({ journeyDataJid }) {

  const [images, setImages] = useState([]);


  const handleImageChange = (event) => {
    const selectedImages = event.target.files;
    const imageArray = Array.from(selectedImages);
    setImages([...images, ...imageArray]);

    setInputs(prevInputs => {
      const newInput = (
        <Col className="text-center" sm={12}>
          <input
            key={prevInputs.length}
            type="file"
            accept="image/jpeg"
            multiple
            onChange={handleImageChange}
          />
        </Col>
      );
      return [...prevInputs, newInput];
    });

  };

  const [inputs, setInputs] = useState([
    <Col className="text-center" sm={12}>
      <input
        key={0}
        type="file"
        accept="image/jpeg"
        multiple
        onChange={handleImageChange}
      />
    </Col>
  ]);


  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(journeyDataJid);

    const formData = new FormData();
    formData.append("jid", journeyDataJid);
    images.forEach((image) => {
      formData.append("jimg[]", image);
    });

    fetch(API_HOST + "/api/images/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
      .finally(() => {
        setImages([]);
        setInputs([
          <Col className="text-center" sm={12}>
            <input
              key={0}
              type="file"
              accept="image/jpeg"
              multiple
              onChange={handleImageChange}
            />
          </Col>
        ]);
      });
  };



  return (
    <>
      <Row className="m-4" style={{ alignItems: "center" }}>
        <Col sm={1}></Col>
        <Col sm={10}>
          <Form.Label className="text-left ">圖片</Form.Label>
        </Col>
        <Col sm={1}></Col>
        <Col sm={1}></Col>
        {inputs.map((input, index) => (
          <React.Fragment key={index}>
            {input}
          </React.Fragment>
        ))}
        <Col sm={1}></Col>
      </Row>

      <form onSubmit={handleSubmit}>
        <button type="submit">上傳</button>
      </form>
    </>
  )
}

export default Pic