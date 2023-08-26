import { useEffect, useState } from "react";
import axios from "axios";
import MovieGetter from "./Movies.js"



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

  // Define genre IDs based on weather codes
  let genreIDs = [];

  if (current.condition.code === 1000 || current.condition.code === 1003) {
    // Sunny or Partly cloudy
    genreIDs = [28, 12, 16, 35, 10751, 10749, 14]; // Action, Adventure, Animation, Comedy, Family, Romance, Fantasy

  } else if (current.condition.code === 1063 || current.condition.code === 1066 || current.condition.code === 1069 || current.condition.code === 1072 || current.condition.code === 1087 || current.condition.code === 1114 || current.condition.code === 1117 || current.condition.code === 1135 || current.condition.code === 1147 || current.condition.code === 1150 || current.condition.code === 1153 || current.condition.code === 1168 || current.condition.code === 1171 || (current.condition.code >= 1240 && current.condition.code <= 1249) || (current.condition.code >= 1273 && current.condition.code <= 1282)) {
    // Rainy, Snowy, Sleet, Freezing drizzle, Thundery outbreaks, Blowing snow, Blizzard, Fog, Freezing fog, Light drizzle, Light freezing drizzle, Moderate or heavy freezing rain, Light rain shower, Moderate or heavy rain shower, Light sleet showers, Moderate or heavy sleet showers, Light snow showers, Moderate or heavy snow showers, Light showers of ice pellets, Moderate or heavy showers of ice pellets, Rain with thunder, Snow with thunder
    genreIDs = [80, 99, 18, 27, 53, 878, 10752]; // Crime, Documentary, Drama, Horror, Thriller, Science Fiction, War
  } else if (current.condition.code === 1006 || current.condition.code === 1009 || current.condition.code === 1030 || current.condition.code === 1060 || current.condition.code === 1216 || current.condition.code === 1222) {
    // Cloudy, Overcast, Mist, Patchy rain possible, Patchy moderate snow
    genreIDs = [36, 37, 9648]; // History, Western, Mystery
  } else {
    // Default to Comedy for other conditions
    genreIDs = [35]; // Comedy
  }




  return (
    <div>
      <h1>Current Weather at Your Location</h1>
      <p>Temperature: {current.temp_f} °F</p>
      <p>Weather: {current.condition.text}</p>
      <p>Icon: <img src={current.condition.icon} alt="Weather Icon" /></p>
      <main>
        <h2>Recommended Movies</h2>
        <MovieGetter weatherCode={current.condition.code} genreIDs={genreIDs} />
      </main>
    </div>
  );
}

export default WeatherApp