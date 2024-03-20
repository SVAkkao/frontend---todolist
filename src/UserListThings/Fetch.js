// Fetch.js
// import React, { useEffect, useRef, useState } from 'react'
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
// import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
// import Overlay from 'react-bootstrap/Overlay';
import { useLocation } from "react-router-dom";
import LogoutBar from "../MemberSystem/LogoutBar";

const API_HOST = process.env.REACT_APP_API_URL;
// `${API_HOST}/api/

function Fetch() {
  const location = useLocation();
  const { id } = location.state;
  const [data, setData] = useState([]);


  const handleButtonClick = () => {
    
  }
  // const [show, setShow] = useState("invisible");
  // const [data1, setData1] = useState([]);
  // const handleButtonClick1 = () => {
  //   let querydata1 = localStorage.getItem("querydata1");
  //   setShow("visible");
  //   if (querydata1 != null) {
  //     console.log("from localstorage");
  //     let jsonObj = JSON.parse(querydata1);
  //     setData1(jsonObj);
  //     getComments(jsonObj[0].id);
  //   } else {
  //     console.log("from WEBAPI");
  //     let formData = new FormData();
  //     formData.append("email", email);
  //     fetch(`${API_HOST}/api/showlist`, {
  //       method: "post",
  //       body: formData,
  //       headers: {
  //         Accept: "application/json",
  //       },
  //     })
  //       .then((response) => response.text())
  //       .then((text) => {
  //         localStorage.setItem("querydata1", text);
  //         let jsonObj = JSON.parse(text);
  //         setData1(jsonObj);
  //         console.log(jsonObj);
  //         getComments(jsonObj[0].id);
  //       })
  //       .catch((error) => console.error("Error:", error));
  //   }
  // };

  // const [comments, setComments] = useState([]);
  // const getComments = (id) => {
  //   const api = `${API_HOST}/api/comment/${id}`;
  //   const headers = {
  //     Accept: "application/json",
  //   };
  //   fetch(api, { method: "get", headers })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setComments(response.result);
  //     })
  //     .catch((error) => console.error("Error:", error));
  // };


  return (
    <>
      <LogoutBar></LogoutBar>
      <div className="m-2">
        {/* <Form.Label className='m-2'>email</Form.Label>
            <Form.Control
                className='m-2'
                required
                type="text"
                placeholder="輸入email"
                ref={emailRef} id="email"
            /> */}

        <Button className="m-2" onClick={handleButtonClick}>
          顯示所有行程
        </Button>
        <br />
        <Table className="m-2" striped bordered hover>
          <thead>
            <tr>
              <th id="userName">name</th>
              <th id="userEmail">email</th>
              <th id="userId">title</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.title}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* <Button className="m-2" onClick={handleButtonClick1}>
          顯示
        </Button> */}
        <br />
        {/* <Table className={show} striped bordered hover>
          <thead>
            <tr>
              <th id="userName">name</th>
              <th id="userBudget">budget</th>
              <th id="userId">title</th>
            </tr>
          </thead>
          <tbody>
            {data1.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.cost}</td>
                  <td>{item.title}</td>
                </tr>
              );
            })}
          </tbody>
        </Table> */}
        {/* <p className="m-2">Comments</p> */}
        {/* {<CommentList comments={comments} />} */}
      </div>
    </>
  );
}

export default Fetch;
