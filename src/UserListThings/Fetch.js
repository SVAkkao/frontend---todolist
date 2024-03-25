// Fetch.js
// import React, { useEffect, useRef, useState } from 'react'
import React, { useState, useEffect } from "react";
// import Overlay from 'react-bootstrap/Overlay';
// import { useLocation } from "react-router-dom";
import LeftSide from "./LeftSide";

const API_HOST = process.env.REACT_APP_API_URL;

function Fetch({ onSelect2 }) {
  const [data2, setData2] = useState([]);
  const [listdata, FetchsetListData] = useState(null);

  if (onSelect2 && typeof onSelect2 === 'function') {
    onSelect2(listdata)
  }

  const onSelect1 = (tlid) => {
    FetchsetListData(tlid)
  }
  //傳id給List
  // const [iddata, setIdData] = useState(null);

  // if (giveUserid && typeof giveUserid === 'function') {
  //   giveUserid(iddata)
  // }
  //
  useEffect(() => {
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

    ajaxUserList()
      .then(data => {
        const userId = data.id;
        // 繼續使用userId來發送下一個HTTP請求
        const body = JSON.stringify({
          id: userId
        });
        getUserrelatedids(body).then(data => {
          const selectlistBodies = data.tlid.map(tlid => ({ tlid }));
          const getParams = (selectlistBody) => {
            if (selectlistBody == null) {
                return "";
            }
            return new URLSearchParams(selectlistBody)
          };
          const getSelectLists = Promise.all(selectlistBodies.map(selectlistBody => fetch(
            `${API_HOST}/api/POST/selectlist`, {
            method: 'POST',
            headers: getRequestHeaders(),
            body: JSON.stringify(selectlistBody),
          }).then(response => response.json())
          ));
          // const selectlistBody = JSON.stringify({tlid: tlid[0] })
          // setTestData(selectlistBodies)
          getSelectLists
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
