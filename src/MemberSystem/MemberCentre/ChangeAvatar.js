import React, { useState, useEffect } from "react";
import { useUserStore } from "../../stores/user";
// 
// import "./MemberCentre.css";

const API_HOST = process.env.REACT_APP_API_URL;
const API_IMAGE = process.env.REACT_APP_IMAGE_URL;

function ChangeAvatar() {
  // User modules
  const userStore = useUserStore();
  const [previewUrl, setPreviewUrl] = useState();
  const getUserAtStart = (token) => {
    fetch(`${API_HOST}/api/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // 使用Bearer token進行認證
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // setUsers(data); // 假設API響應中包含一個名為users的數組
        setPreviewUrl(`${API_IMAGE}${data.photo}`); // 设置初始图片预览URL
      })
      .catch((error) => console.error("Fetching data error: ", error));
  }
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      getUserAtStart(token);
    } else {
      console.log("Token not found");
    }
  }, []);

  // Avatar modules
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      URL.revokeObjectURL(previewUrl);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };


  const uploadAvatar = (token, formData) => {
    fetch(`${API_HOST}/api/update-avatar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("上傳成功！");
        userStore.getUser();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 獲取input type=file的DOM節點
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      const token = localStorage.getItem("userToken");
      if (token) {
        uploadAvatar(token, formData);
      } else {
        console.log("Token not found");
      }
    }

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
          src={previewUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Avatar preview"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <label>上傳檔案：限jpg、jpeg、png、gif、svg</label>
        <input type="file" onChange={handleFileChange} />
        <br></br>
        <br></br>
        <button type="submit">上傳</button>
      </form>
    </div>
  );
}

export default ChangeAvatar;
