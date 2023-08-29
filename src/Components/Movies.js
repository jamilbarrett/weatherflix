import React, { useState, useEffect } from "react";
import axios from "axios";

function MovieGetter({weatherCode, genreIds }) {
  const [movieData, setMovieData] = useState([]);
  const apiKey = "3399b0a5f2c7b811aefbce412fc096dc";

  useEffect(() => {
    const fetchMovies = async () => {
      try {

        const genreIds = mapWeatherCodeToGenreIds(weatherCode)
        const genreIdsString = genreIds.join(",");

        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreIdsString}`
        );
        
        // Shuffle the fetched movie array
        const shuffledMovies = shuffleArray(response.data.results);
        setMovieData(shuffledMovies);
      } catch (error) {
        console.log("Error getting movies", error);
      }
    };

    fetchMovies();
  }, [genreIds, apiKey]);

  const mapWeatherCodeToGenreIds = (code) => {
    switch (weatherCode) {
      case 1000: // Sunny
      case 1003: // Partly Cloudy
      case 1006: // Cloudy
      case 1030: // Mist
        mapWeatherCodeToGenreIds([37]);
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
        mapWeatherCodeToGenreIds([18, 27, 53, 99, 9648, 878, 80, 36, 14]);
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
        mapWeatherCodeToGenreIds([12, 10751, 10402]);
        break;
      default:
        // Default to Comedy, Action
        mapWeatherCodeToGenreIds([37]);
    }
  };


  const shuffleArray = array => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray.slice(0,3);
  };

  return (
    <div>
      {movieData.length > 0 ? (
        <div>
          <h1>Recommended Movies</h1>
          {movieData.map(movie => (
            <div key={movie.id}>
              <p>Title: {movie.title}</p>
              <p>Release Date: {movie.release_date}</p>
              <p>Rating: {movie.vote_average}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading movie data...</p>
      )}

      <button className="moviebtn" onClick>New Movie</button>

    </div>
  );
}

export default MovieGetter;
