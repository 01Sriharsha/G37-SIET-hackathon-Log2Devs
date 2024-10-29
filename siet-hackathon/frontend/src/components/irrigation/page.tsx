"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IrrigationDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = '55d462eb10954a8c8ef104834242910'; // Replace with your WeatherAPI key

  useEffect(() => {
    const fetchWeatherData = async (lat: number, lon: number) => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
        setError('Could not fetch weather data. Please try again later.');
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              setError('Location access denied. Please enable location services in your settings.');
            } else {
              setError('Unable to retrieve your location. Please try again.');
            }
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return (
    <div className="p-6"> {/* Increased padding */}
      {loading && <p className="text-lg text-gray-600">🌧️ Loading weather data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto border border-green-200"> {/* Added border */}
          <h1 className="text-3xl font-bold mb-4 text-center text-green-700">🌱 Irrigation Management System</h1> {/* Increased title size */}
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">☀️ Weather Forecast for {weatherData.location.name}</h2> {/* Increased subtitle size */}
          <ul className="mt-4">
            {weatherData.forecast.forecastday.map((day: any) => (
              <li key={day.date} className="mb-4 border-b pb-4 last:border-0"> {/* Added border for separation */}
                <div className="flex justify-between">
                  <strong className="text-lg">{new Date(day.date).toLocaleDateString()}</strong>
                  <span className="text-lg">{day.day.condition.text} {day.day.condition.icon && <img src={day.day.condition.icon} alt={day.day.condition.text} className="inline h-6 w-6" />}</span> {/* Emoji or Icon */}
                </div>
                <div className="text-gray-600">💧 Rain: {day.day.totalprecip_mm} mm</div>
                <div className="mt-2">
                  <strong>🌼 Recommended Action:</strong> {day.day.totalprecip_mm > 0 ? '🚫 No watering today.' : '💧 Water your crops.'}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IrrigationDashboard;
