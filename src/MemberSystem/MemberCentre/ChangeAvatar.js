import React, { useState } from "react";
// import "./MemberCentre.css";

function ChangeAvatar() {
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://via.placeholder.com/150"
  ); // 使用占位图作为默认头像

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file)); // 创建并更新预览URL
    } else {
      setAvatar(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 这里处理头像上传逻辑，可能需要将图片发送到服务器
    console.log(avatar);
    // 清理创建的URL对象
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
