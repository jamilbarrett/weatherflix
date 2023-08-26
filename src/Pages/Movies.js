import React, { useState, useEffect } from "react";
import axios from "axios";

function MovieGetter({ weatherCode, genreIds }) {
  const [movieData, setMovieData] = useState(null);
  const apiKey = "YOUR_TMDB_API_KEY"; // Replace with your actual TMDB API key

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreIdsString = genreIds.join(",");
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreIdsString}`
        );
        setMovieData(response.data.results);
      } catch (error) {
        console.log("Error getting movies", error);
      }
    };

    fetchMovies();
  }, [genreIds, apiKey]);

  return (
    <div>
      {movieData ? (
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
    </div>
  );
}

export default MovieGetter;
