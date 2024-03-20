import React, { useState } from "react";
import axios from "axios";

function EditProfile() {
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCellphoneChange = (e) => {
    setCellphone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken"); // 从localStorage中获取token

    if (!token) {
      alert("No token found. Please login first.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost/---todolist-backend/public/api/update",
        {
          name,
          cellphone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("User info updated successfully!");
      } else {
        alert("Failed to update user info.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      alert("Error updating user info. See console for details.");
    }
  };

  return (
    <div className="form-group">
      <h3>修改會員資料</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            暱稱：
            <br></br>
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            手機號碼：
            <br></br>
            <input
              type="text"
              value={cellphone}
              onChange={handleCellphoneChange}
            />
          </label>
        </div>
        <button type="submit">保存</button>
      </form>
    </div>
  );
}

export default EditProfile;
