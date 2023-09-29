import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const apiKey = 'beb1478e094bd8bf3d03026212ece3bf';

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      console.log("Latitude is :", location.latitude);
      console.log("Longitude is :", location.longitude);
      getWeather(location.latitude, location.longitude);
    }
  }, [location]);

  useEffect(() => {
    console.log('data:', data);
    if (data) {
      const kelvin = {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
      };

      const newTemperature = kelvin;
      console.log('newTemperature:', newTemperature);
      setTemperature(newTemperature);
    }
  }, [data]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position.coords);
    });
  }

  const getWeather = (lat, lon) => {
    const weatherApiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(weatherApiRequest)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  }

  const kelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9/5) + 32;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Current Weather:</h2>
        <p>
          Temperature: {kelvinToCelsius(temperature?.temp).toFixed(2)} °C
        </p>
      </header>
    </div>
  );
}

export default App;
