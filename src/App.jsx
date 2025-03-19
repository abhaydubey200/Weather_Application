import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import axios from "axios";
import "./App.css";  // ✅ Import Classical CSS

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cityName, setCityName] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

  const API_KEY = "453026bef15548008c8164614251903";  // ✅ Replace with your actual API key

  const fetchWeather = async () => {
    if (!search) return;
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${search}&aqi=no`
      );

      console.log(data);
      setCityName(data.location.name);
      setTemperature(data.current.temp_c);
      setHumidity(data.current.humidity);
      setWindSpeed(data.current.wind_kph);
      setWeatherIcon(data.current.condition.icon);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setCityName("City not found");
      setTemperature(null);
      setHumidity(null);
      setWindSpeed(null);
      setWeatherIcon("");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>

      {/* 🔍 Search Bar */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <FaSearch onClick={fetchWeather} className="search-icon" />
      </div>

      {/* 🌤️ Weather Icon */}
      {weatherIcon && <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />}

      {/* 🌡️ Temperature & City Name */}
      <h1 className="temperature">
        {loading ? "Loading..." : temperature !== null ? `${temperature}°C` : "--"}
      </h1>
      <h2 className="city-name">{cityName || "Type a city name"}</h2>

      {/* 💧 Humidity & 🌬️ Wind Speed */}
      <div className="weather-details">
        <div className="detail-box">
          <WiHumidity className="detail-icon" />
          <span className="detail-value">{humidity !== null ? `${humidity}%` : "--"}</span>
          <p className="detail-label">Humidity</p>
        </div>
        <div className="detail-box">
          <WiStrongWind className="detail-icon" />
          <span className="detail-value">{windSpeed !== null ? `${windSpeed} km/h` : "--"}</span>
          <p className="detail-label">Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default App;
