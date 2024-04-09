import React from 'react';
import { FaPenSquare, FaTrash } from 'react-icons/fa';

export const Pre = ({ task, deletePre, editPre, toggleComplete }) => {
  return (
    <div className="Pre">
      <p
        className={`${task.checked ? 'completed' : 'incompleted'}`}
        onClick={() => toggleComplete(task.preid)}
      >
        {task.pretitle}
      </p>
      <div>
        <FaPenSquare className="edit-icon" onClick={() => editPre(task.preid)} />
        <FaTrash className="delete-icon" onClick={() => deletePre(task.preid)} />
      </div>
    </div>
  );
};