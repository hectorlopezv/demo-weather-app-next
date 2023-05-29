'use client';
import Head from 'next/head';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { weatherData } from '../utils';
import TemperatureSwitch from './TemperatureSwitch';
const Weather = () => {
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);
  const [cityName, setCityName] = useState('');
  const [temperatureUnits, setTemperatureUnits] = useState('C');
  const [debouncedValue] = useDebounce(cityName, 500);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${debouncedValue}&appid=${
            process.env.NEXT_PUBLIC_API_KEY
          }&units=${temperatureUnits === 'C' ? 'metric' : 'imperial'}`
        );
        const data = await response.json();
        console.log('data', data);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    if (debouncedValue != '') {
      fetchData();
    }
  }, [debouncedValue, temperatureUnits]);

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };
  const handleTemperatureUnitChange = (unit: 'C' | 'F') => {
    setTemperatureUnits(unit);
  };

  return (
    <div>
      <Head>
        <title>Weather App Demo</title>
      </Head>
      <h1>Weather App Demo</h1>
      <div>
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          value={cityName}
          onChange={handleCityChange}
          className="border border-gray-400 rounded-md p-2 m-2 w-60 text-center text-gray-600"
        />
      </div>
      <TemperatureSwitch onChange={handleTemperatureUnitChange} />
      {weatherData ? (
        <div>
          <h2>Date: {new Date().toLocaleDateString()}</h2>
          <h2>City: {weatherData.name}</h2>
          <p>
            Temperature: {weatherData.main.temp}°{temperatureUnits}
          </p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>select city</p>
      )}
    </div>
  );
};

export default Weather;
