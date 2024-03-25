// Fetch.js
// import React, { useEffect, useRef, useState } from 'react'
import React, { useState, useEffect } from "react";

// import Overlay from 'react-bootstrap/Overlay';
import { useLocation } from "react-router-dom";
import RightSide from "./RightSide";


const API_HOST = process.env.REACT_APP_API_URL;
// `${API_HOST}/api/





function Fetch() {

  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  const [testdata, setTestData] = useState([]);

  const token = localStorage.getItem('userToken');
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
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

            const selectlistBodies = data.tlid.map(tlid => ({ tlid }));

            // const selectlistBody = JSON.stringify({tlid: tlid[0] })
            setTestData(selectlistBodies);
            const getParams = (selectlistBody) => {
              if (selectlistBody == null) {
                  return "";
              }
              return new URLSearchParams(selectlistBody)
            };
            console.log({selectlistBodies});
            Promise.all(selectlistBodies.map(selectlistBody =>
              fetch(`${API_HOST}/api/POST/selectlist`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(selectlistBody)
              })
              .then(response => response.json())
            ))
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
    console.log(testdata)
    // 在這裡處理返回的資料
  }, [testdata]); // 添加data1為依賴項，以在data1更新時執行此回調函數

  useEffect(() => {
    console.log(data2)
    // 在這裡處理返回的資料
  }, [data2]); 

  
  return <RightSide data={data2} />;
}

export default Fetch;
 


