import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const apiKey = 'beb1478e094bd8bf3d03026212ece3bf';

  useEffect(() => {
    getWeather(38.889363, -77.036045);
  }, []);

  useEffect(() => {
    console.log('data:', data);
  }, [data]);

  const getWeather = (lat, lon) => {
    const weatherApiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(weatherApiRequest)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
