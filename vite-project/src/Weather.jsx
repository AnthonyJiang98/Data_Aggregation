import React, { useState } from 'react';

const api = {
  key: "ddf8c16e6e76b5cd58b2a2c9db5087a9",
  geo_base: "http://api.openweathermap.org/geo/1.0/",
  weather_base: "https://api.openweathermap.org/data/2.5/",
  weather_meteo: "https://api.open-meteo.com/v1/"
};

function Weather() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  const searchPressed = () => {
    fetch(`${api.geo_base}direct?q=${search}&limit=1&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setLocation(result);
      })
      .catch((error) => {
        setError("Error occurred while fetching location data.");
      });
  };

  const fetchWeather = () => {
    fetch(`${api.weather_meteo}forecast?latitude=${location[0]?.lat}&longitude=${location[0]?.lon}&current_weather=true`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
      })
      .catch((error) => {
        setError("Error occurred while fetching weather data.");
      });
  };

  return (
    <div className='App'>
      <h1>Weather Checker</h1>

      {/* Search box */}
      <input
        type='text'
        placeholder='Enter City'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={searchPressed}>Search</button>
      <p> latitude: {location[0]?.lat}</p>
      <p> longitude: {location[0]?.lon}</p>
      <br />
      <button onClick={fetchWeather}>Check Weather</button>
      {error && <p>Error: {error}</p>}
      {!error && (
        <>
          <p>Current Time: {weather?.current_weather?.time}</p>
          <p>Current Weather: {weather?.current_weather?.temperature} Celcius</p>
          <p>Wind direction: {weather?.current_weather?.winddirection}</p>
          <p>Wind Speed: {weather?.current_weather?.windspeed}</p>
        </>
      )}
    </div>
  );
}

export default Weather;
