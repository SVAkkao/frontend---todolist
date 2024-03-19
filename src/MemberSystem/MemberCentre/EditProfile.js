import React, { useState } from "react";
// import "./MemberCentre.css";

function EditProfile() {
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // 在这里处理表单提交逻辑，比如更新数据库
    console.log(nickname, phone);
  };

  return (
    <div className="form-group">
      <h4>修改會員資料</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            暱稱：
            <br></br>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            手機號碼：
            <br></br>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">保存</button>
      </form>
    </div>
  );
}

export default EditProfile;
