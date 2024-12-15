import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const API_KEY = "9a61f229741aa856d43699768e4fe3da"; 

  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      )
      .then((response) => {
        const forecasts = response.data.list.filter((forecast) =>
          forecast.dt_txt.includes("12:00:00")
        );
        setData(forecasts.slice(0, 4)); 
      })
  
  };

  return (
    <div className="weather-container">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Введите город"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-button" onClick={getWeather}>
          Получить прогноз
        </button>
      </div>

      {data.length > 0 && (
        <div className="forecast-container">
          <h1 className="city">{city}</h1>
          {data.map((forecast, index) => (
            <div className="forecast" key={index}>
              <div className="date">
                {new Date(forecast.dt_txt).toLocaleDateString()}
              </div>
              <div className="temperature">{forecast.main.temp}°C</div>
              <div className="description">
                {forecast.weather[0].description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;