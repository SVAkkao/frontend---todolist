import React, { useState, useEffect, useCallback } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useLoadScript, GoogleMap, Autocomplete } from '@react-google-maps/api';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

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
          <p>濕度：{weatherData.main.humidity}°C</p>
          <p>體感溫度：{weatherData.main.feels_like}°C</p>
          <p>最低溫度：{weatherData.main.temp_min}°C</p>
          <p>最高溫度：{weatherData.main.temp_max}°C</p>
          <p>天氣：{weatherData.weather[0].description}</p>
          <p>降雨機率：{weatherData.pop * 100|| 0}%</p>
          <p>能見度：{weatherData.visibility / 1000} km</p>
          <p>當地日出時間：{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>當地日落時間：{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
         </div>
      )}
    </div>
  );
};

export default WeatherApp;