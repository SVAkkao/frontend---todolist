// Fetch.js
// import React, { useEffect, useRef, useState } from 'react'
import React, { useState, useEffect } from "react";
// import Overlay from 'react-bootstrap/Overlay';
// import { useLocation } from "react-router-dom";
import LeftSide from "./LeftSide/LeftSide";

const API_HOST = process.env.REACT_APP_API_URL;
const getRequestHeaders = () => {
  const token = localStorage.getItem('userToken');
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  return headers;
};

const ajaxUserList = async () => {
  return fetch(`${API_HOST}/api/user`, {
    method: 'GET',
    headers: getRequestHeaders(),
  })
    .then(response => response.json());
};

const getUserrelatedids = (body = {}) => {
  return fetch(API_HOST + '/api/POST/userrelatedids', {
    method: 'POST',
    headers: getRequestHeaders(),
    body: body
  })
    .then(response => response.json());
};

const getSelectIds = (selectlistBodies = []) => {
  const getParams = (input) => {
    if (input == null) {
      return "";
    }
    return JSON.stringify(input);
    // return new URLSearchParams(selectlistBody)
  };
  const ajaxInstance = (selectlistBody) => fetch(
    `${API_HOST}/api/POST/selectlist`, {
    method: 'POST',
    headers: getRequestHeaders(),
    body: getParams(selectlistBody),
  }).then(response => response.json());
  return Promise.all( selectlistBodies.map( ajaxInstance ) );
}

function Fetch({ onSelect2 }) {
  const [data2, setData2] = useState([]);
  const [listdata, FetchsetListData] = useState(null);

  if (onSelect2 && typeof onSelect2 === 'function') {
    onSelect2(listdata)
  }

  const onSelect1 = (tlid) => {
    FetchsetListData(tlid)
  };

  function ajaxAction(setData2) {
    ajaxUserList().then(data => {
      // 繼續使用userId來發送下一個HTTP請求
      const body = JSON.stringify({
        id: data.id
      });
      getUserrelatedids(body).then(data => {
        const selectlistBodies = data.tlid.map(tlid => ({ tlid }));
        const getSelectLists = getSelectIds(selectlistBodies);
        // const selectlistBody = JSON.stringify({tlid: tlid[0] })
        // setTestData(selectlistBodies)
        getSelectLists.then(data => {
          setData2(data);
        }).catch(error => console.error(error));
      }).catch(error => console.error(error));
    }).catch(error => console.error(error));
  }
  useEffect(() => {
    ajaxAction(setData2);
  }, []);

  // useEffect(() => {
  // console.log(testdata)
  // 在這裡處理返回的資料
  // }, [testdata]); // 添加data1為依賴項，以在data1更新時執行此回調函數

  // useEffect(() => {
  // console.log(data2)
  // 在這裡處理返回的資料
  // }, [data2]); 

  return <LeftSide data={data2} onSelect={onSelect1} update_info={() => ajaxAction(setData2)} />;
}

export default Fetch;
