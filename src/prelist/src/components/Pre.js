import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Pre = ({ task, deletePre, editPre, toggleComplete }) => {
  return (
    <div className="Pre">
      <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
      <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editPre(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deletePre(task.id)} />
      </div>
    </div>
  )
}