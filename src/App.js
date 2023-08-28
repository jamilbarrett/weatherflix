import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieGetter from './Pages/Movies'; 
import Weather from './Pages/Weather'; 

function App() {
  const [weatherCode, setWeatherCode] = useState(1000);
  const [genreIds, setGenreIds] = useState([28, 35]);
  const [movieData, setMovieData] = useState([]);

  const apiKey = "3399b0a5f2c7b811aefbce412fc096dc";

  const updatedGenreIds = (weatherCode) => {
    switch (weatherCode) {
      case 1000: // Sunny
      case 1003: // Partly Cloudy
      case 1006: // Cloudy
      case 1030: // Mist
        setGenreIds([28, 12, 16, 35, 10751, 10749, 14]);
        break;
      // All instances of rain below
      case 1063:
      case 1072:
      case 1087:
      case 1150:
      case 1153:
      case 1168:
      case 1178:
      case 1171:
      case 1180:
      case 1183:
      case 1186:
      case 1189:
      case 1192:
      case 1195:
      case 1198:
      case 1201:
      case 1240:
      case 1243:
      case 1246:
      case 1276:
        setGenreIds([18, 27, 53, 99, 9648, 878, 80, 36, 14]);
        break;
      // All instances of snow
      case 1066:
      case 1114:
      case 1117:
      case 1147:
      case 1204:
      case 1207:
      case 1210:
      case 1213:
      case 1216:
      case 1219:
      case 1222:
      case 1225:
      case 1237:
      case 1252:
      case 1258:
      case 1261:
      case 1264:
      case 1279:
      case 1282:
        setGenreIds([12, 10751, 10402]);
        break;
      default:
        // Default to Comedy, Action
        setGenreIds([28, 35]);
    }
  };

  const fetchMovies = () => {
    try {
      const genreIdsString = genreIds.join(",");
      const response = axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreIdsString}`
      );
      const shuffledMovies = shuffleArray(response.data.results);
      setMovieData(shuffledMovies);
    } catch (error) {
      console.log("Error getting movies", error);
    }
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    updatedGenreIds(weatherCode);
  }, [weatherCode]);

  useEffect(() => {
    fetchMovies();
  }, [genreIds, apiKey]);

  const generateMovie = () => {
    fetchMovies();
  };

  return (
    <div>
      <Weather weatherCode={weatherCode} />
      <MovieGetter weatherCode={weatherCode} genreIds={genreIds} />
      <button className="moviebtn" onClick={generateMovie}>New Movie</button>
    </div>
  );
}

export default App;
