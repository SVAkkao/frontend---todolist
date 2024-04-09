import React, { useState } from 'react';

export const EditPreForm = ({ editPre, task }) => {
  const [value, setValue] = useState(task.pretitle); // 將 value 設置為 task.pretitle，這樣在編輯時能夠顯示任務的原始內容

  const handleSubmit = (e) => {
    e.preventDefault(); // 防止表單預設提交行為

    // 呼叫 editPre 函數，將更新後的任務內容和任務 ID 傳遞過去
    editPre({ pretitle: value }, task.preid);
  };

  return (
    <form onSubmit={handleSubmit} className="PreForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pre-input"
        placeholder="Update task"
      />
      <button type="submit" className="pre-btn">修改</button>
    </form>
  );
};
