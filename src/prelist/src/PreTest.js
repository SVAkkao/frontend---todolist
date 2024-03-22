import React from 'react'
import './App.css';
import WeatherApp from './components/WeatherApp';
import { TodoWrapper } from './components/TodoWrapper';


export default function PreTest() {
  return (
    
    <div className="App">
      <TodoWrapper  />
      <WeatherApp/>
    </div>

  );
}

