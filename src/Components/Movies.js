import React, { useState, useEffect } from "react";
import axios from "axios";

function MovieGetter({genreIds }) {
  const [movieData, setMovieData] = useState([]);
  const apiKey = "3399b0a5f2c7b811aefbce412fc096dc";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
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
