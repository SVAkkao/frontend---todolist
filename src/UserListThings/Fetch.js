// Fetch.js
// import React, { useEffect, useRef, useState } from 'react'
import React, { useState, useEffect } from "react";
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

  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);

  const token = localStorage.getItem('userToken');
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  useEffect(() => {

    fetch(API_HOST + '/api/user', {
      method: 'GET',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        const userId = data.id;
        // 繼續使用userId來發送下一個HTTP請求
        const body = JSON.stringify({
          id: userId
        });

        fetch(API_HOST + '/api/POST/userrelatedids', {
          method: 'POST',
          headers: headers,
          body: body
        })
          .then(response => response.json())
          .then(data => {
            
            setData1(data)

            const tlid = data.tlid
            const jid = data.jid
            const jpid = data.jpid

            fetch(API_HOST + '/api/POST/selectlist', {
              method: 'POST',
              headers: headers,
              body: data.tlid[0]
            })
            .then(response => response.json())
            .then(data => {
              setData2(data)
            })
            .catch(error => console.error(error));


          })
          .catch(error => console.error(error));

      })
      .catch(error => console.error(error));

  }, []);

  useEffect(() => {
    console.log(data1)
    // 在這裡處理返回的資料
  }, [data1]); // 添加data1為依賴項，以在data1更新時執行此回調函數

  useEffect(() => {
    console.log(data2)
    // 在這裡處理返回的資料
  }, [data2]); 
  return (
    <>
      <LogoutBar></LogoutBar>
      <div className="m-2">

        <Button className="m-2" >
          新增資料
        </Button>
        <br />
        <Table className="m-2" striped bordered hover>
          <thead>
            <tr>
              <th>各ID名</th>
              <th>id 號碼</th>
              <th>{JSON.stringify(data2)}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data1).map(([key, value]) => (
              <React.Fragment key={key}>
                <tr>
                  <td>{key}</td>
                  <td>{value.join(', ')}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Fetch;
