import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function MovieGetter({ weatherCode }) {
  const [movieData, setMovieData] = useState([]);
  const apiKey = "3399b0a5f2c7b811aefbce412fc096dc";

  const mapWeatherCodeToGenreIds = useCallback(code => {
    switch (code) {
      case 1000: // Sunny
      case 1003: // Partly Cloudy
      case 1006: // Cloudy
      case 1030: // Mist
        return [28, 12, 16, 35];
        // All instances of Rain
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
        return [9648, 18, 99, 80, 99];
        // All instances of Snow
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
        return [10752];
      default:
        return [80];
    }
  }, []);

  const fetchMovies = async () => {
    try {
      const genreIds = mapWeatherCodeToGenreIds(weatherCode);
      const genreIdsString = genreIds.join(",");

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreIdsString}`
      );

      const shuffledMovies = shuffleArray(response.data.results);
      setMovieData(shuffledMovies);
    } catch (error) {
      console.log("Error getting movies", error);
    }
  };

  useEffect(() => {
    fetchMovies(); 
  }, [weatherCode, mapWeatherCodeToGenreIds]);



  const shuffleArray = array => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray.slice(0, 3);
  };

  const handleNewMovieClick = async e => {
    e.preventDefault(); // Prevent the default behavior
    await fetchMovies(); // Call the fetchMovies function to get new movie data
  };


  return (
    <div className="bg-zinc-700">
      {movieData.length > 0 ? (
        <div>
          <h1 className="text-white text-2xl p-5">Recommended Movies</h1>
          <div className="movie-container grid grid-cols-3 divide-x">
            {movieData.map(movie => (
              <div className="movie-card" key={movie.id}>
                <img className="flex justify-center rounded-lg w-96 h-48 p-4 ml-0 border-none"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading movie data...</p>
      )}

      <button className="bg-white hover:bg-stone-200  font-semibold py-2 px-4 rounded-full outline focus:outline-none" onClick={handleNewMovieClick}>
        New Movie
      </button>
    </div>
  );
}

export default MovieGetter;