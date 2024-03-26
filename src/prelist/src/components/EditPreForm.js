import React, { useState } from 'react'




export const EditPreForm = ({ editPre, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // edit pre
    editPre(value, task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="PreForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pre-input"
        placeholder='Update task'
      />
      <button type="submit" className='pre-btn'>修改</button>
    </form>
  )
}