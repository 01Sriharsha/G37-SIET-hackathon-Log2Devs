"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sun, Cloud, CloudRain, CloudLightning } from 'lucide-react';

interface Weather {
  text: string; // Condition text (e.g., "Sunny", "Rain")
  icon: string; // URL for the weather icon
}

interface DailyWeather {
  date: string; // Date in 'YYYY-MM-DD' format
  day: {
    maxtemp_c: number; // Max temperature in Celsius
    mintemp_c: number; // Min temperature in Celsius
    condition: Weather; // Weather condition
  };
}

interface WeatherData {
  forecast: {
    forecastday: DailyWeather[];
  };
}

const API_KEY = '55d462eb10954a8c8ef104834242910'; // Replace with your actual API key
const API_URL = 'https://api.weatherapi.com/v1/forecast.json';

const districts = [
  { name: 'Bengaluru Urban', lat: 12.9716, lon: 77.5946 },
  { name: 'Bengaluru Rural', lat: 13.0287, lon: 77.6343 },
  { name: 'Mysuru', lat: 12.2958, lon: 76.6394 },
  { name: 'Mangalore', lat: 12.9141, lon: 74.8560 },
  { name: 'Belagavi', lat: 15.8480, lon: 74.5010 },
  { name: 'Tumakuru', lat: 13.3392, lon: 77.1010 },
  { name: 'Kalaburagi', lat: 17.3275, lon: 76.1328 },
  { name: 'Davanagere', lat: 14.4692, lon: 75.9212 },
  { name: 'Ballari', lat: 15.1394, lon: 75.0033 },
  { name: 'Raichur', lat: 16.2062, lon: 77.3460 },
  { name: 'Chitradurga', lat: 14.2356, lon: 76.4032 },
  { name: 'Hassan', lat: 13.0000, lon: 76.1922 },
  { name: 'Kodagu', lat: 12.3373, lon: 75.7260 },
  { name: 'Dakshina Kannada', lat: 12.8394, lon: 74.8462 },
  { name: 'Udupi', lat: 13.3394, lon: 74.7482 },
  { name: 'Kolar', lat: 13.1339, lon: 78.1732 },
  { name: 'Chikballapur', lat: 13.3707, lon: 77.7335 },
  { name: 'Chamarajanagar', lat: 12.1818, lon: 76.9674 },
  { name: 'Hampi', lat: 15.3352, lon: 76.4609 }, // Historical site in Ballari district
  { name: 'Haveri', lat: 14.8045, lon: 75.3577 },
  { name: 'Bagalkote', lat: 16.1810, lon: 75.6112 },
  { name: 'Bijapur', lat: 16.8309, lon: 75.7111 },
  { name: 'Gadag', lat: 15.4442, lon: 75.6446 },
  { name: 'Yadgir', lat: 16.1998, lon: 77.1248 },
  { name: 'Shivamogga', lat: 13.9302, lon: 75.5580 },
  { name: 'Karwar', lat: 14.8006, lon: 74.1214 },
  { name: 'Dharwad', lat: 15.4669, lon: 75.0184 },
  { name: 'Koppal', lat: 15.3528, lon: 76.1394 },
  { name: 'Mandya', lat: 12.5232, lon: 76.4074 },
  { name: 'Ramanagara', lat: 12.6451, lon: 77.1450 },
  { name: 'Chikmagalur', lat: 13.3300, lon: 75.7788 },
  { name: 'Uttara Kannada', lat: 14.8910, lon: 74.3633 },
];

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case 'Sunny':
      return <span className="text-yellow-400">☀️</span>;
    case 'Partly cloudy':
    case 'Cloudy':
      return <span className="text-gray-400">☁️</span>;
    case 'Rain':
      return <span className="text-blue-400">🌧️</span>;
    case 'Thunderstorm':
      return <span className="text-purple-400">⛈️</span>;
    default:
      return <span className="text-gray-400">🌫️</span>; // Default icon for undefined conditions
  }
};

export default function WeatherCard() {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchTriggered, setFetchTriggered] = useState(false); // New state to control fetch

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    setFetchTriggered(false); // Reset on fetch
    try {
      const response = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          q: `${selectedDistrict.lat},${selectedDistrict.lon}`, // Query format: latitude,longitude
          days: 7, // Get 7 days of forecast
          aqi: 'no', // Exclude air quality
          alerts: 'no', // Exclude alerts
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`🚨 Error: ${err.response?.data?.error?.message || 'Failed to fetch weather data.'}`);
      } else {
        setError('🚨 Failed to fetch weather data. Please try again.');
      }
    }
    setLoading(false);
  };

  const handleFetchWeatherData = () => {
    setFetchTriggered(true); // Mark fetch as triggered
    fetchWeatherData(); // Fetch data
  };

  useEffect(() => {
    if (fetchTriggered) { // Only fetch when triggered
      fetchWeatherData();
    }
  }, [fetchTriggered]); // Dependency array now only includes fetchTriggered

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border border-gray-300 rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-gray-800">🌤️ 7-Day Weather Forecast 🌦️</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <Select
            value={selectedDistrict.name}
            onValueChange={(value) => setSelectedDistrict(districts.find(d => d.name === value) || districts[0])}
          >
            <label className='text-xl font-bold'>🌍 Select A District</label>
            <SelectTrigger className="w-[150px] border-2 border-gray-400 rounded-md"> {/* Smaller width */}
              <SelectValue placeholder="Select a district" />
            </SelectTrigger>
            <SelectContent className='text-xl'>
              {districts.map((district) => (
                <SelectItem className='text-xl' key={district.name} value={district.name}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleFetchWeatherData} disabled={loading} className="bg-blue-500 text-white hover:bg-blue-600">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : ' Go'}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}

        {weatherData && (
          <div className="grid grid-cols-2 gap-4"> {/* Increased gap for better spacing */}
            {weatherData.forecast.forecastday.map((day) => (
              <div key={day.date} className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-center">{new Date(day.date).toLocaleDateString('en-IN', { weekday: 'long' })}</h3>
                <p className="text-center">{getWeatherIcon(day.day.condition.text)} {day.day.condition.text}</p>
                <p className="text-center">
                  Max: <span className="font-bold">{day.day.maxtemp_c}°C</span> | Min: <span className="font-bold">{day.day.mintemp_c}°C</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
