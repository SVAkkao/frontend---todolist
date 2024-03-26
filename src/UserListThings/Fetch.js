// Fetch.js
import React, { useState, useEffect } from "react";
import LeftSide from "./LeftSide/LeftSide";
import { useUserStore } from "../stores/user";

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
  return fetch(`${API_HOST}/api/POST/userrelatedids`, {
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
  return ajaxInstance([]);
  // return Promise.all( selectlistBodies.map( ajaxInstance ) );
}

function Fetch({ onSelect2 }) {
  const {user} = useUserStore();
  const [data2, setData2] = useState([]);
  const [listdata, FetchsetListData] = useState(null);

  // Unknown
  if (onSelect2 && typeof onSelect2 === 'function') {
    onSelect2(listdata)
  }

  // AJAX
  function ajaxAction(userId, setData2) {
      // 繼續使用userId來發送下一個HTTP請求
      const body = JSON.stringify({
        id: userId
      });
      getUserrelatedids(body).then(data => {
        const selectlistBodies = data.tlid.map(tlid => ({ tlid }));
        const getSelectLists = getSelectIds(selectlistBodies);
        getSelectLists.then( (data = []) => {
          setData2(data);
        }).catch(error => console.error(error));
      }).catch(error => console.error(error));
  }
  useEffect(() => {
    if(user.id) {
      ajaxAction(user.id, setData2);
    }
  }, [user]);

  // Actions
  if(!data2) {
    return <p>Loading...</p>;
  }
  return <LeftSide
    data={data2}
    onSelect={(tlid) => FetchsetListData(tlid)}
    update_info={() => ajaxAction(user.id, setData2)}
  />;
}

export default Fetch;
