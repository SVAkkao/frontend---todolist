import React, { useState } from "react";
import axios from "axios";

const API_HOST = process.env.REACT_APP_API_URL;

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNewPasswordConfirmationChange = (e) => {
    setNewPasswordConfirmation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    if (!token) {
      alert("請先登入！");
      return;
    }

    if (newPassword !== newPasswordConfirmation) {
      alert("新密碼跟確認密碼不吻合！");
      return;
    }

    try {
      const response = await axios.put(
        `${API_HOST}/api/update-password`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("更新成功！");
        // 清除输入字段
        setCurrentPassword("");
        setNewPassword("");
        setNewPasswordConfirmation("");
      } else {
        alert("更新失敗:(");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password. See console for details.");
    }
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
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
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
              onChange={handleNewPasswordChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            確認密碼：
            <br></br>
            <input
              type="password"
              value={newPasswordConfirmation}
              onChange={handleNewPasswordConfirmationChange}
            />
          </label>
        </div>
        <button type="submit">修改密碼</button>
      </form>
    </div>
  );
}

export default ChangePassword;
