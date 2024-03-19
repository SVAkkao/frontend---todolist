import React, { useState, useEffect } from "react";
// import "./MemberCentre.css";

const API_IMAGE = process.env.REACT_APP_IMAGE_URL;

function ChangeAvatar() {
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://via.placeholder.com/150"
  );

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
    // 模拟从后端获取用户头像URL的异步操作
    const fetchUserAvatarUrl = async () => {
      // 从后端获取用户头像URL的逻辑
      // 假设这里我们直接返回一个示例URL，实际中你可能需要发起HTTP请求
      return "http://localhost/---todolist-backend/storage/app/public/avatars/IolOnEkMC8r6VOwLerMhpDYccRxk3qLyaxt7aU1y.jpg";
    };

    fetchUserAvatarUrl().then((url) => {
      setPreviewUrl(url || "https://via.placeholder.com/150");
    });
  }, []); // 空依赖数组意味着这个effect只在组件首次渲染时执行

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
          src={previewUrl}
          alt="Avatar preview"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
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
