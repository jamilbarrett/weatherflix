import React, { useState } from 'react';
import Weather from './Components/Weather';
import MovieGetter from './Components/Movies'; 
import Header from './Components/Header';

function App() {
  const [weatherData, setWeatherData] = useState('');
  const [genreIds, setGenreIds] = useState([]);

  return (
    <div>
      <Header />

      {/* Pass the weather data and genre IDs as props */}
      <Weather setWeatherData={setWeatherData} />
      <MovieGetter weatherData={weatherData} genreIds={genreIds} />
    </div>
  );
}

export default App;
