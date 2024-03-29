import React, { useState, useEffect, useCallback } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useLoadScript, GoogleMap, Autocomplete } from '@react-google-maps/api';
import  OpenAI  from "openai";






const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [chatInputValue, setChatInputValue] = useState('');
  const [recommendations, setRecommendations] = useState([]);

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
        baseURL: 'https:///api.chatanywhere.cn/v1',
        dangerouslyAllowBrowser: true,
      });
  
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: '你是一個經驗豐富的旅遊顧問,請使用繁體中文。',
            },
            {
              role: 'user',
              content: `根據提供的地點以及天氣,提供一份表列的行前建議以及景點推薦:${userMessage}`,
            },
          ],
        });
          console.log(completion.choices[0]);
        
  
        // 检查 completion.data.choices 是否存在并且是一个数组
        if (completion && completion.data && Array.isArray(completion.data.choices)) {
          const response = completion.data.choices[0].message.content;
          setRecommendations(response.split("\n"));
        } else {
          setError('OpenAI返回的格式不符合預期');
        }
      } catch (error) {
        setError('向OpenAI發送消息時出錯');
        console.error('Error:', error);
      }
    }
  };


  return (
    <div>
      <h1>當地目前天氣</h1>
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
          {recommendations.length > 0 && (
            <div>
              <h3>建議和景點推薦：</h3>
              <ul>
                {recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;