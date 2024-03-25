import axios from "axios";

const API_HOST = process.env.REACT_APP_API_URL;

export const getUserScore = () => {
  const userToken = localStorage.getItem("userToken");
  return fetch(`${API_HOST}/api/user-score`, {
    method: "GET", // 或者是POST，取決於你的API
    headers: {
      Authorization: `Bearer ${userToken}`, // 根據你的API設計調整這裡,
      Accept: "application/json",
    },
  }).then((response) => response.json());
}

export const getUserCommentApi = () => {
  const token = localStorage.getItem("userToken");
  return axios.get(`${API_HOST}/api/user-comment`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getUserListTitle = () => {
  const token = localStorage.getItem("userToken");
  return axios.get(`${API_HOST}/api/user-tourlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getPhotos = () => {
  const token = localStorage.getItem("userToken");
  return axios.get(`${API_HOST}/api/uploaded-images`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
