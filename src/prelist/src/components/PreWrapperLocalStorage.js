import React from 'react';
import uuidv4 from 'uuid/v4';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
export const PreWrapperLocalStorage = () => {
  const [pres, setPres] = useState([]);

  // ...

  const addPre = pre => {
    const newPres = [...pres, {id: uuidv4(), task: pre, completed: false, isEditing: false}];
    setPres(newPres);
    localStorage.setItem('pres', JSON.stringify(newPres));
  };

  // ...

  const renderPreList = () => {
    return (
      <div>
        {pres.map((pre) => (
          <Pre
            key={pre.id}
            task={pre.task}
            deletePre={deletePre}
            editPre={editPre}
            toggleComplete={toggleComplete}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="PreWrapper">
      <h1>待辦事項</h1>
      <PreForm addPre={addPre} />
      {renderPreList()}
    </div>
  );
};
