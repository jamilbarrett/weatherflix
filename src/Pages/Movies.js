import React, { useState, useEffect } from "react";
import axios from "axios";


function MovieGetter() {
  const [movieData, setMovieData] = useState('');
  const movieURL = `'https://api.themoviedb.org/3/authentication/guest_session/new'`;


  useEffect(() => {
    axios.get(movieURL)
      .then(response => {
        setMovieData(response.data);
      })
      .catch(error => {
        console.log('Error getting movie', error);
      });
  }, [movieURL]);

  return (
    <div>
      {movieData ? (
        <div>
          <h1>Movie Information</h1>
          <p>Title: {movieData.results[0].title}</p>
          <p>Release Date: {movieData.results[0].release_date}</p>
          <p>Genre: {movieData.results[0].genre}</p>
          <p>Rating: {movieData.results[0].vote_average}</p>
          <img src={`https://image.tmdb.org/t/p/w500/${movieData.results[0].poster_path}`} alt={movieData.results[0].title} />
        </div>
      ) : (
        <p>Loading movie data...</p>
      )}
    </div>
  );
}

export default MovieGetter;
