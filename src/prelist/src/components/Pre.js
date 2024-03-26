import React from "react";
import { FaPenSquare, FaTrash } from "react-icons/fa";

export const Pre = ({ task, deletePre, editPre, toggleComplete }) => {
  return (
    <div className="Pre">
      <p
        className={`${task.completed ? "completed" : "incompleted"}`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.task}
      </p>
      <div>
        <FaPenSquare className="edit-icon" onClick={() => editPre(task.id)} />
        <FaTrash className="delete-icon" onClick={() => deletePre(task.id)} />
      </div>
    </div>
  );
};
