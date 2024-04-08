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
  const [travelListGenerated, setTravelListGenerated] = useState(false);

  useEffect(() => {
    fetchPres();
  }, []);

  const fetchPres = async () => {
    try {
      const response = await axios.get(`${API_HOST}/api/pres`);
      setPres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPre = async (data) => {
    try {
      // 確保資料包含 "pretitle" 字段
      const response = await axios.post(`${API_HOST}/api/pres`, { pretitle: data, checked: false });
      setPres([...pres, response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };
  

  const updatePre = async (id, data) => {
    try {
      const response = await axios.put(`${API_HOST}/api/pres/${id}`, data);
      setPres(pres.map(pre => pre.preid === id ? response.data : pre));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const preToUpdate = pres.find(pre => pre.preid === id);
      const updatedPre = { ...preToUpdate, checked: !preToUpdate.checked };
      await updatePre(id, updatedPre);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePre = async (id) => {
    try {
      await axios.delete(`${API_HOST}/api/pres/${id}`);
      setPres(pres.filter(pre => pre.preid !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editPre = (id) => {
    setPres(
      pres.map(pre => pre.preid === id ? { ...pre, isEditing: !pre.isEditing } : pre)
    );
  };

  const editTask = async (task, id) => {
    try {
      await updatePre(id, task);
      setPres(
        pres.map(pre => pre.preid === id ? { ...pre, ...task, isEditing: !pre.isEditing } : pre)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const generateTravelList = async () => {
    if (!travelListGenerated) {
      const travelList = [
        { pretitle: '護照', checked: false },
        { pretitle: '機票', checked: false },
        { pretitle: '旅遊保險', checked: false },
        { pretitle: '備用現金', checked: false },
        { pretitle: '換好外幣', checked: false },
      ];

      try {
        const promises = travelList.map(async task => {
          const response = await axios.post(`${API_HOST}/api/pres`, task);
          return response.data.data;
        });

        const newPres = await Promise.all(promises);
        setPres(prevPres => [...prevPres, ...newPres]);
        setTravelListGenerated(true);
      } catch (error) {
        console.error(error);
      }
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
      // 实现拖放功能
    },
  }));

  return (
    <div className="PreWrapper" ref={drop}>
      <h1>行前清單</h1>
      <PreForm addPre={addPre} />
      <TravelButton generateTravelList={generateTravelList} className="TravelButton" />
      {pres.map(pre =>
  pre.isEditing ? (
    <EditPreForm editPre={editTask} task={pre} key={pre.preid} />
  ) : (
    <DragPre key={pre.preid} task={pre} deletePre={deletePre} editPre={editPre} toggleComplete={toggleComplete} />
  )
)}

    </div>
  );
};

const DragPre = ({ task, deletePre, editPre, toggleComplete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PRE',
    item: { id: task.preid },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Pre task={task} deletePre={deletePre} editPre={editPre} toggleComplete={toggleComplete} />
    </div>
  );
};
