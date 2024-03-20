import React, { useState, useEffect } from "react";
import axios from "axios";

const API_HOST = process.env.REACT_APP_API_URL;

function EditProfile() {
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("userToken"); // 从localStorage中获取token

      if (!token) {
        alert("No token found. Please login first.");
        return;
      }

      try {
        // 假设这是获取用户信息的API URL
        const response = await axios.get(
          `${API_HOST}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data) {
          setName(response.data.name); // 设置用户当前的name到状态
          setCellphone(response.data.cellphone); // 设置用户当前的cellphone到状态
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        alert("Error fetching user info. See console for details.");
      }
    };

    fetchUserInfo();
  }, []); // 空数组意味着这个effect只在组件加载时运行一次

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
        `${API_HOST}/api/update`,
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
