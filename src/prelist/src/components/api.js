import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const PreWrapper = () => {
  const [pres, setPres] = useState([]);
  const API_HOST = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchPres();
  }, []);

  const fetchPres = async () => {
    try {
      const response = await axios.get(`${API_HOST}/pres`);
      setPres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPre = async (data) => {
    try {
      const response = await axios.post(`${API_HOST}/pres`, data);
      setPres([...pres, response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePre = async (id) => {
    try {
      await axios.delete(`${API_HOST}/pres/${id}`);
      setPres(pres.filter((pre) => pre.preid !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editPre = async (id, data) => {
    try {
      const response = await axios.put(`${API_HOST}/pres/${id}`, data);
      setPres(pres.map((pre) => (pre.preid === id ? response.data : pre)));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const preToUpdate = pres.find((pre) => pre.preid === id);
      const updatedPre = { ...preToUpdate, checked: !preToUpdate.checked };
      await editPre(id, updatedPre);
    } catch (error) {
      console.error(error);
    }
  };

  const renderPreList = () => {
    return (
      <div>
        {pres.map((pre) => (
          <Pre
            key={pre.preid}
            task={pre}
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