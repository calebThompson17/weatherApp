import './App.css';
import { useEffect, useState } from 'react';
import Select from './components/Select';

function App() {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [tempType, setTempType] = useState('celsius'); // This is kelvin, celsius, or fahrenheit
  const tempTypeOptions = ['kelvin', 'celsius', 'fahrenheit'];

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
    if (data?.main) {
      const kelvin = {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
      };

      const newTemperature = kelvin;
      console.log('newTemperature:', newTemperature);
      setTemperature(newTemperature);
      setWeatherIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    }
  }, [data]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position.coords);
    });
  }

  const getWeather = (lat, lon) => {
    const weatherApiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
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

  const toggleTempType = () => {
    setTempType(currentTempType => currentTempType === 'celsius'
      ? 'fahrenheit'
      : 'celsius');
  }

  const getCurrentTemp = (tempAttr) => {
    if (temperature) {
      const tempAttrValue = temperature[tempAttr];
      switch (tempType) {
        case 'kelvin':
          return `${tempAttrValue.toFixed(2)} K`;
        case 'fahrenheit':
          return `${kelvinToFahrenheit(tempAttrValue).toFixed(2)} °F`;
        case 'celsius':
        default:
          return `${kelvinToCelsius(tempAttrValue).toFixed(2)} °C`;
      }
    }
    return 'Loading...';
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={weatherIcon} className="App-logo" alt=''/>
        <h2>Current Weather:</h2>
        <p>
          Temperature: {getCurrentTemp('temp')}
        </p>
        <button onClick={toggleTempType}>Toggle Temperature Unit</button>
        <Select
          id={'tempTypeDropDown'}
          options={tempTypeOptions}
          value={tempType}
          onChange={(event) => setTempType(event.target.value)}
        />
      </header>
    </div>
  );
}

export default App;
