import React from 'react';
import axios from 'axios';


export const PreWrapperLocalStorage = () => {
  const [pres, setPres] = useState([]);
  const API_HOST = process.env.REACT_APP_API_URL;

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
