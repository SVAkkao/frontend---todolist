// Fetch.js
// import React, { useEffect, useRef, useState } from 'react'
import React, { useState, useEffect } from "react";

// import Overlay from 'react-bootstrap/Overlay';
import { useLocation } from "react-router-dom";
import LeftSide from "./LeftSide";


const API_HOST = process.env.REACT_APP_API_URL;
// `${API_HOST}/api/





function Fetch({onSelect2}) {

  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  // const [testdata, setTestData] = useState([]);
  const [listdata, FetchsetListData] = useState(null);

  if (onSelect2 && typeof onSelect2 === 'function') {
  onSelect2(listdata)
  // console.log("listdata")
}
  const onSelect1 = (tlid)=>{
    FetchsetListData(tlid)
    // console.log(listdata)
  }

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

            const selectlistBodies = data.tlid.map(tlid => ({ tlid }));

            // const selectlistBody = JSON.stringify({tlid: tlid[0] })
            // setTestData(selectlistBodies)
            Promise.all(selectlistBodies.map(selectlistBody =>
              fetch(API_HOST + '/api/POST/selectlist', {
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

  // useEffect(() => {
    // console.log(testdata)
    // 在這裡處理返回的資料
  // }, [testdata]); // 添加data1為依賴項，以在data1更新時執行此回調函數

  // useEffect(() => {
    // console.log(data2)
    // 在這裡處理返回的資料
  // }, [data2]); 

  
  return <LeftSide data={data2} onSelect={onSelect1} />;
}

export default Fetch;
 


