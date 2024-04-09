import React, { useState } from 'react';

export const EditPreForm = ({ editPre, task }) => {
  const [value, setValue] = useState(task.pretitle);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <button type="submit" className="pre-btn">
        修改
      </button>
    </form>
  );
};