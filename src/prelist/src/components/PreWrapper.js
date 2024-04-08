import React, { useState, useEffect } from 'react';
import { PreForm } from './PreForm';
import { v4 as uuidv4 } from 'uuid';
import { Pre } from './Pre';
import { EditPreForm } from './EditPreForm';
import axios from 'axios';
import { useDrag, useDrop } from 'react-dnd';

const API_HOST = process.env.REACT_APP_API_URL;

export const PreWrapper = () => {
  const [pres, setPres] = useState([]);
  const [travelListGenerated, setTravelListGenerated] = useState(false)
  useEffect(() => {
    axios
      .get(API_HOST + 'api/pres')
      .then((response) => setPres(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addPre = (data) => {
    axios
      .post(API_HOST + 'api/pres', {
        pretitle: data,
        pretext: data.pretext || '',
        type: data.type || '',
        checked: data.checked || false,
      })
      .then((response) => {
        setPres([...pres, response.data.data]);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleComplete = (id) => {
    const newPres = pres.map((pre) =>
      pre.id === id ? { ...pre, completed: !pre.completed } : pre
    );
    setPres(newPres);
    localStorage.setItem('pres', JSON.stringify(newPres));
  };

  const deletePre = (id) => {
    const newPres = pres.filter((pre) => pre.id !== id);
    setPres(newPres);
    localStorage.setItem('pres', JSON.stringify(newPres));
  };

  const editPre = (id) => {
    setPres(
      pres.map((pre) =>
        pre.id === id ? { ...pre, isEditing: !pre.isEditing } : pre
      )
    );
  };

  const editTask = (task, id) => {
    const newPres = pres.map((pre) =>
      pre.id === id ? { ...pre, task, isEditing: !pre.isEditing } : pre
    );
    setPres(newPres);
    localStorage.setItem('pres', JSON.stringify(newPres));
  };

  const generateTravelList = () => {
    if (!travelListGenerated) {
      const travelList = [
        { id: uuidv4(), task: '護照', completed: false, isEditing: false },
        { id: uuidv4(), task: '機票', completed: false, isEditing: false },
        { id: uuidv4(), task: '旅遊保險', completed: false, isEditing: false },
        { id: uuidv4(), task: '備用現金', completed: false, isEditing: false },
        { id: uuidv4(), task: '換好外幣', completed: false, isEditing: false },
      ];
      setPres([...pres, ...travelList]);
      setTravelListGenerated(true);
    }
  };

  const TravelButton = ({ generateTravelList, className }) => (
    <button onClick={generateTravelList} className={className}>
      生成出國所需清單
    </button>
  );

  const [, drop] = useDrop(() => ({
    accept: 'PRE',
    drop: (item, monitor) => {
      // 處理拖放事件
    },
  }));

  return (
    <div className="PreWrapper" ref={drop}>
      <h1>行前清單</h1>
      <PreForm addPre={addPre} />
      <TravelButton generateTravelList={generateTravelList} className="TravelButton" />
      {/* display pres */}
      {pres.map((pre) =>
        pre.isEditing ? (
          <EditPreForm editPre={editTask} task={pre} key={pre.id} />
        ) : (
          <DragPre key={pre.id} task={pre} deletePre={deletePre} editPre={editPre} toggleComplete={toggleComplete} />
        )
      )}
    </div>
  );
};

const DragPre = ({ task, deletePre, editPre, toggleComplete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PRE',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Pre task={task} deletePre={deletePre} editPre={editPre} toggleComplete={toggleComplete} />
    </div>
  );
};