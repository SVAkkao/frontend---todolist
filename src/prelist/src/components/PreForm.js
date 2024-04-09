import React, { useState } from 'react';

export const PreForm = ({ addPre }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      const newPre = { pretitle: value, checked: false };
      addPre(newPre);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="PreForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pre-input"
        placeholder="新增行前清單"
      />
      <button type="submit" className="pre-btn">
        新增
      </button>
    </form>
  );
};