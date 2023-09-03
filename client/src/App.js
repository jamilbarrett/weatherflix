import React, { useState } from 'react';
import Weather from './Components/Weather';
import MovieGetter from './Components/Movies';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  const [weatherData, setWeatherData] = useState('');
  const [genreIds] = useState([]);

  return (
    <div>
      <Header />

      {/* Pass the weather data and genre IDs as props */}
      <Weather setWeatherData={setWeatherData} />
      <MovieGetter weatherData={weatherData} genreIds={genreIds} />
      <Footer />
    </div>
  );
}

export default App;
