import React, { useState } from "react";
// import "/MemberCentre.css";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // 处理密码更改逻辑，确保实现适当的验证和安全措施
    console.log(password, newPassword);
  };

  return (
    <div className="form-group">
      <h3>修改密碼</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            當前密碼：
            <br></br>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            新密碼：
            <br></br>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            確認密碼：
            <br></br>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">修改密碼</button>
      </form>
    </div>
  );
}

export default ChangePassword;
