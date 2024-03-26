import React, { useState, useEffect } from 'react';
import { PreForm } from './PreForm';
import { v4 as uuidv4 } from 'uuid';
import { Pre } from './Pre';
import { EditPreForm } from './EditPreForm';


export const PreWrapper = () => {
  const [pres, setPres] = useState([]); 

  useEffect(() => {
    const savedPres = JSON.parse(localStorage.getItem('pres')) || []; 
    setPres(savedPres);
  }, []);

  const addPre = pre => { 
    const newPres = [...pres, { id: uuidv4(), task: pre, completed: false, isEditing: false }];
    setPres(newPres);
    localStorage.setItem('pres', JSON.stringify(newPres)); 
  }

  const toggleComplete = id => {
    const newPres = pres.map(pre => pre.id === id ? { ...pre, completed: !pre.completed } : pre);
    setPres(newPres);
    localStorage.setItem('pres', JSON.stringify(newPres)); 
  }

  const deletePre = id => {
    const newPres = pres.filter(pre => pre.id !== id);
    setPres(newPres);
    localStorage.setItem('pres', JSON.stringify(newPres)); 
  }

  const editPre = id => { 
    setPres(pres.map(pre => pre.id === id ? { ...pre, isEditing: !pre.isEditing } : pre))
  }

  const editTask = (task, id) => {
    const newPres = pres.map(pre => pre.id === id ? { ...pre, task, isEditing: !pre.isEditing } : pre);
    setPres(newPres);
    localStorage.setItem('pres', JSON.stringify(newPres)); 
  }

  const generateTravelList = () => {
    const travelList = [
      { id: uuidv4(), task: "護照", completed: false, isEditing: false },
      { id: uuidv4(), task: "機票", completed: false, isEditing: false },
      { id: uuidv4(), task: "旅遊保險", completed: false, isEditing: false },
      { id: uuidv4(), task: "備用現金", completed: false, isEditing: false },
      { id: uuidv4(), task: "換好外幣", completed: false, isEditing: false },
    ];
    setPres([...pres, ...travelList]);
  };

  const TravelButton = ({ generateTravelList, className }) => (
    <button onClick={generateTravelList} className={className}>生成出國所需清單</button>
  );

  return (
    <div className="PreWrapper">
      <h1>行前清單</h1>
      <PreForm addPre={addPre} /> 
      <TravelButton generateTravelList={generateTravelList} className="TravelButton" />
      {/* display pres */} 
      {pres.map((pre) => pre.isEditing ? (
        <EditPreForm editTodo={editTask} task={pre} />
      ) : (
        <Pre key={pre.id} task={pre} deletePre={deletePre} editPre={editPre} toggleComplete={toggleComplete} />
      ))}
    </div>
  );
};
