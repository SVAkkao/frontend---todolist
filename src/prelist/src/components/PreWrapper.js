import React, { useState, useEffect } from 'react';
import { PreForm } from './PreForm';
import { v4 as uuidv4 } from 'uuid';
import { Pre } from './Pre';
import { EditPreForm } from './EditPreForm';
import axios from 'axios';
import { useDrag, useDrop } from 'react-dnd';

const API_HOST = process.env.REACT_APP_API_URL;

export const PreWrapper = ({fatherPres}) => {
  const [pres, setPres] = useState([]);
  const [selectedParentItems, setSelectedParentItems] = useState([]);

  useEffect(() => {
    setPres(fatherPres)
  }, [fatherPres]);

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
      const response = await axios.post(`${API_HOST}/api/pres`, data);
      setPres(prevPres => [...prevPres, response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };
  
  const updatePre = async (id, data) => {
    try {
      const response = await axios.put(`${API_HOST}/api/pres/${id}`, data);
      setPres(pres.map((pre) => (pre.preid === id ? response.data : pre)));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const preToUpdate = pres.find((pre) => pre.preid === id);
      const updatedPre = { ...preToUpdate, checked: !preToUpdate.checked };
      await updatePre(id, updatedPre);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePre = async (id) => {
    try {
      await axios.delete(`${API_HOST}/api/pres/${id}`);
      setPres(pres.filter((pre) => pre.preid !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editPre = (id) => {
    setPres(
      pres.map((pre) => (pre.preid === id ? { ...pre, isEditing: !pre.isEditing } : pre))
    );
  };

  const editTask = async (task, id) => {
    try {
      await updatePre(id, task);
      setPres(
        pres.map((pre) =>
          pre.preid === id ? { ...pre, ...task, isEditing: !pre.isEditing } : pre
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const generateTravelList = async () => {
    if (selectedParentItems.length > 0) {
      try {
        const promises = selectedParentItems.map(async parentItem => {
          const childItems = getChildItems(parentItem);
          const responses = await Promise.all(
            childItems.map(async childItem => {
              const response = await axios.post(`${API_HOST}/api/pres`, childItem);
              return response.data.data;
            })
          );
          return responses;
        });

        const newPres = await Promise.all(promises);
        const flattenedPres = newPres.flat();
        setPres(prevPres => [...prevPres, ...flattenedPres]);
        setSelectedParentItems([]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getChildItems = parentItem => {
    switch (parentItem) {
      case '3C用品':
        return [
          { pretitle: '手機', checked:false },
          { pretitle: '充電器', checked: false },
          { pretitle: '電池', checked: false },
        ];
      case '出國清單':
        return [
          { pretitle: '護照', checked: false },
          { pretitle: '機票', checked: false },
          { pretitle: '旅遊保險', checked: false },
          { pretitle: '備用現金', checked: false },
          { pretitle: '換好外幣', checked: false },
        ];
      default:
        return [];
    }
  };

  const handleParentItemChange = event => {
    const selectedItem = event.target.value;
    if (event.target.checked) {
      setSelectedParentItems(prevItems => [...prevItems, selectedItem]);
    } else {
      setSelectedParentItems(prevItems => prevItems.filter(item => item !== selectedItem));
    }
  };

  const TravelButton = ({ generateTravelList, className }) => (
    <button onClick={generateTravelList} className={className}>
      生成所選項目
    </button>
  );

  const [, drop] = useDrop(() => ({
    accept: 'PRE',
    drop: (item, monitor) => {
      const draggedPreId = item.id;
      const targetPreId = monitor.getItem().id;
  
      if (draggedPreId !== targetPreId) {
        const draggedPreIndex = pres.findIndex(pre => pre.preid === draggedPreId);
        const targetPreIndex = pres.findIndex(pre => pre.preid === targetPreId);
        const draggedPre = pres[draggedPreIndex];
  
        const newPres = [
          ...pres.slice(0, targetPreIndex),
          draggedPre,
          ...pres.slice(targetPreIndex, draggedPreIndex),
          ...pres.slice(draggedPreIndex + 1),
        ];
  
        setPres(newPres); // 更新 pres 狀態
      }
    },
  }));

  return (
    <div className="PreWrapper" ref={drop}>
      <h1>行前清單</h1>
      <PreForm addPre={addPre} />
      <div>
        <label>
          <input
            className='checkbox'
            type="checkbox"
            value="3C用品"
            onChange={handleParentItemChange}
          />
          3C用品
        </label>
        <label>
          <input
            className='checkbox'
            type="checkbox"
            value="出國清單"
            onChange={handleParentItemChange}
          />
          出國清單
        </label>
      </div>
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

const DragPre= ({ task, deletePre, editPre, toggleComplete }) => {
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