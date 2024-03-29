import React, { useState, useEffect } from 'react';
import { PreForm } from './PreForm';
import { v4 as uuidv4 } from 'uuid';
import { Pre } from './Pre';
import { EditPreForm } from './EditPreForm';
import  axios  from 'axios';
const API_HOST = process.env.REACT_APP_API_URL;


export const PreWrapper = () => {
  const [pres, setPres] = useState([]); 

  useEffect(() => {
   
    axios.get(API_HOST+'api/pres')
      .then(response => setPres(response.data))
      .catch(error => console.error(error));
  }, []);
  const addPre = (data) => {
    axios.post(API_HOST + 'api/pres', {
      pretitle: data,
      pretext: data.pretext || '',
      type: data.type || '',
      checked: data.checked || false,
    })
    .then(response => {
      setPres([...pres, response.data.data]);
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  };

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
        <EditPreForm editPre={editTask} task={pre} />
      ) : (
        <Pre key={pre.id} task={pre} deletePre={deletePre} editPre={editPre} toggleComplete={toggleComplete} />
      ))}
    </div>
  );
};
// import React, { useState, useEffect } from 'react';
// import { PreForm } from './PreForm';
// import { v4 as uuidv4 } from 'uuid';
// import { Pre } from './Pre';
// import { EditPreForm } from './EditPreForm';
// import axios from 'axios';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const API_HOST = process.env.REACT_APP_API_URL;

// export const PreWrapper = () => {
//   const [pres, setPres] = useState([]);

//   useEffect(() => {
//     axios.get(API_HOST + 'api/pres')
//       .then(response => setPres(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   const addPre = (data) => {
//     axios.post(API_HOST + 'api/pres', {
//       pretitle: data,
//       pretext: data.pretext || '',
//       type: data.type || '',
//       checked: data.checked || false,
//       order: pres.length, // 設置初始順序
//     })
//     .then(response => {
//       setPres([...pres, response.data.data]);
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   };

//   const toggleComplete = id => {
//     const newPres = pres.map(pre => pre.id === id ? { ...pre, completed: !pre.completed } : pre);
//     setPres(newPres);
//     updatePres(newPres);
//   }

//   const deletePre = id => {
//     const newPres = pres.filter(pre => pre.id !== id);
//     setPres(newPres);
//     updatePres(newPres);
//   }

//   const editPre = id => { 
//     setPres(pres.map(pre => pre.id === id ? { ...pre, isEditing: !pre.isEditing } : pre))
//   }

//   const editTask = (task, id) => {
//     const newPres = pres.map(pre => pre.id === id ? { ...pre, task, isEditing: !pre.isEditing } : pre);
//     setPres(newPres);
//     updatePres(newPres);
//   }

//   const generateTravelList = () => {
//     const travelList = [
//       { id: uuidv4(), task: "護照", completed: false, isEditing: false, order: pres.length },
//       { id: uuidv4(), task: "機票", completed: false, isEditing: false, order: pres.length + 1 },
//       { id: uuidv4(), task: "旅遊保險", completed: false, isEditing: false, order: pres.length + 2 },
//       { id: uuidv4(), task: "備用現金", completed: false, isEditing: false, order: pres.length + 3 },
//       { id: uuidv4(), task: "換好外幣", completed: false, isEditing: false, order: pres.length + 4 },
//     ];
//     setPres([...pres, ...travelList]);
//     updatePres([...pres, ...travelList]);
//   };

//   const TravelButton = ({ generateTravelList, className }) => (
//     <button onClick={generateTravelList} className={className}>生成出國所需清單</button>
//   );

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(pres);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setPres(items);
//     updatePres(items);
//   };

//   const updatePres = (