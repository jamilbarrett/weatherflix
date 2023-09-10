import { useEffect, useState } from "react";
import axios from "axios";



function WeatherApp() {
  const [weatherData, setWeatherData] = useState('');
  const API_KEY = "e75fa3366c2144d28bb213247232308";

  useEffect(() => {
    // Get user's geolocation and fetch weather data
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`;

          axios.get(apiUrl)
            .then(response => {
              setWeatherData(response.data);
            })
            .catch(error => {
              console.error("Error fetching weather data:", error);
            });
        },
        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not available.");
    }
  }, [API_KEY]);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  const { current } = weatherData;

  return (
    <div className="bg-zinc-700">
      <h1>Current Weather at Your Location</h1>
      <p>Temperature: {current.temp_f} °F</p>
      <p>Weather: {current.condition.text}</p>
      <p>Icon: <img src={current.condition.icon} alt="Weather Icon" /></p>
      
    </div>
  );
}

export default WeatherApp