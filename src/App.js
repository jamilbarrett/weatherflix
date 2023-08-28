import React, { useState, useEffect } from 'react';
import MovieGetter from './Components/Movies'; 
import Weather from './Components/Weather'; 
import Header from './Components/Header';


function App() {
  const [weatherCode, setWeatherCode] = useState(1000);
  const [genreIds, setGenreIds] = useState([28, 35]);


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

 
  // };

  return (
    <div>
      <Header/>
      <Weather weatherCode={weatherCode} />
      <MovieGetter weatherCode={weatherCode} genreIds={genreIds} />
    </div>
  );
}

export default App;
