import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserStore } from "../../stores/user";

const API_HOST = process.env.REACT_APP_API_URL;

function EditProfile() {
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState("");
  const { user } = useUserStore();
  useEffect(() => {
    setName(user.name);
    setCellphone(user.cellphone);
  }, [user]); 

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCellphoneChange = (e) => {
    setCellphone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken"); 

    if (!token) {
      alert("請先登入！");
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
        alert("上傳成功！");
      } else {
        alert("上傳失敗！");
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
            <br />
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            手機號碼：
            <br />
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
