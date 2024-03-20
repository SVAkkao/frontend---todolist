import React, { useState, useEffect } from "react";
// import "./MemberCentre.css";

const API_IMAGE = process.env.REACT_APP_IMAGE_URL;

function ChangeAvatar() {
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://via.placeholder.com/150"
  );
  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setAvatar(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      fetch("http://localhost/---todolist-backend/public/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // 使用Bearer token進行認證
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.users); // 假設API響應中包含一個名為users的數組
        })
        .catch((error) => console.error("Fetching data error: ", error));
    } else {
      console.log("Token not found");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(avatar);

    URL.revokeObjectURL(previewUrl);
  };

  return (
    <div className="form-group">
      <h3>更改頭像</h3>
      <div
        className="avatar-preview"
        style={{
          marginBottom: "15px",
          borderRadius: "50%",
          width: "150px",
          height: "150px",
          overflow: "hidden",
        }}
      >
        <img
          src={`${API_IMAGE}${users.photo}`}
          alt={`User ${users.id}`}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        {/* <img
          src={previewUrl}
          alt="Avatar preview"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        /> */}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <br></br>
        <br></br>
        <button type="submit">上傳</button>
      </form>
    </div>
  );
}

export default ChangeAvatar;
