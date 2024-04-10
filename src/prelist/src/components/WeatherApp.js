import React, { useState, useCallback } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useLoadScript } from '@react-google-maps/api';
import OpenAI from "openai";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [recommendations, setRecommendations] = useState({});
  const [choices, setChoices] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBM_EnYgXOayxugwu67DpS9gYprEoFV8fg',
    libraries: ['places'],
  });

  const fetchWeatherData = useCallback(async (latitude, longitude) => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = 'f613db4343d272dbfd4ae7b839d88df6';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=zh_tw`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('Weather data:', data);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('獲取天氣數據時出現錯誤');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectCity = (value) => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ 'placeId': value.value.place_id }, (results, status) => {
        if (status === 'OK') {
          const { lat, lng } = results[0].geometry.location;
          fetchWeatherData(lat(), lng());
        } else {
          setError('無法獲取位置坐標');
        }
      });
    }
    setSelectedCity(value);
  };

  const handleSubmitToChat = async () => {
    
    if (weatherData && selectedCity) {
      const { name, sys, main, weather, pop, visibility, sys: { sunrise, sunset } } = weatherData;
      const { value: { description: selectedCityName } } = selectedCity;
  
      const userMessage = `
  地點: ${name}, ${sys.country}
  城市: ${selectedCityName}
  溫度: ${main.temp}°C
  濕度: ${main.humidity}%
  體感溫度: ${main.feels_like}°C
  最低溫度: ${main.temp_min}°C
  最高溫度: ${main.temp_max}°C
  天氣: ${weather[0].description}
  降雨機率: ${(pop * 100) || 0}%
      `;
  
      const openai = new OpenAI({
        apiKey: 'sk-ql9dO6EwBd4N3o2IDQyOp7qdmMtvkIt8yAJKPmzQAQB82kco',
        baseURL: 'http://localhost:3040/v1',
        dangerouslyAllowBrowser: true,
      });
  
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          response_format: { type: "json_object" },
          messages: [
            {
              role: 'system',
              content: '你是一個經驗豐富的旅遊顧問,請使用繁體中文。',
            },
            {
              role: 'user',
              content: `根據提供的地點以及天氣,提供一份表列的行前建議以及景點推薦:${userMessage},請用純JSON字串回答不要有多餘符號`
            },
          ],
        });
        console.log(completion);
        const responseString = completion.choices[0].message.content;
        const cleanedString = responseString.split('```json').join('').split('```').join('');
        const recommendations = JSON.parse(cleanedString);
        setRecommendations(recommendations);
      } catch (error) {
        setError('向OpenAI發送消息時出錯');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <h1>當地目前天氣</h1>
      {isLoaded ? (
        <GooglePlacesAutocomplete
          selectProps={{
            value: selectedCity,
            onChange: handleSelectCity,
          }}
          apiKey="AIzaSyBM_EnYgXOayxugwu67DpS9gYprEoFV8fg"
          autocompletionRequest={{
            types: ['(regions)'],
          }}
          language="zh-TW"
        />
      ) : (
        <p>正在載入 Google Maps API...</p>
      )}
      {loading && <p>正在獲取天氣數據...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>溫度：{weatherData.main.temp}°C</p>
          <p>濕度：{weatherData.main.humidity}%</p>
          <p>體感溫度：{weatherData.main.feels_like}°C</p>
          <p>最低溫度：{weatherData.main.temp_min}°C</p>
          <p>最高溫度：{weatherData.main.temp_max}°C</p>
          <p>天氣：{weatherData.weather[0].description}</p>
          <p>降雨機率：{weatherData.pop * 100 || 0}%</p>
          <p>能見度：{weatherData.visibility / 1000} km</p>
          <p>當地日出時間：{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>當地日落時間：{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
          <button onClick={handleSubmitToChat}>發送到 OpenAI</button>
        </div>
      )}
      <div>
        <h3>行前建議</h3>
        <ul>
          {recommendations['行前建議']?.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          )) || <p>暫無行前建議</p>}
        </ul>
        <h3>景點推薦</h3>
        {recommendations['景點推薦']?.map((item, index) => (
          <div key={index}>
            <h4>{item.名稱}</h4>
            <p>{item.描述}</p>
          </div>
        )) || <p>暫無景點推薦</p>}
      </div>
    </div>
  );
};

export default WeatherApp;