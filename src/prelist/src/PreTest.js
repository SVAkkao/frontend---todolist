import React from 'react'
import './Pre.css';
import WeatherApp from './components/WeatherApp';
import { PreWrapper } from './components/PreWrapper';


export default function PreTest() {
  return (
    
    <div className="App">
      <PreWrapper  />
      <WeatherApp/>
    </div>

  );
}

