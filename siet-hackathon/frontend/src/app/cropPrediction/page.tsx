"use client";
import React, { useState } from 'react';
import axios from "@/lib/axios";

const CropRecommendation: React.FC = () => {
  const [nitrogen, setNitrogen] = useState<number>(0);
  const [phosphorus, setPhosphorus] = useState<number>(0);
  const [potassium, setPotassium] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [ph, setPh] = useState<number>(0);
  const [rainfall, setRainfall] = useState<number>(0);
  const [result, setResult] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const inputData = {
      "N":nitrogen,
      "P":phosphorus,
      "K":potassium,
      "temperature":temperature,
      "humidity":humidity,
      "ph":ph,
      "rainfall":rainfall,
    };

    try {
      const response = await axios({
        method: "post",
        endpoint: "/auth/login",
        body: inputData,
        showErrorToast: true,
      });
      console.log(response);
    //   const crops = response.data.predicted_crop; // Adjust based on your API response structure
    //   setResult(`🌾 Recommended Crops: ${crops.join(', ')} 🌱`);
    } catch (error) {
      console.error('Error fetching crop recommendations:', error);
      setResult('❌ Error fetching recommendations. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">🌿 Crop Recommendation Tool</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Nitrogen (kg/ha):</label>
            <input
              type="number"
              value={nitrogen}
              onChange={(e) => setNitrogen(Number(e.target.value))}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Nitrogen (e.g., 50)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Phosphorus (kg/ha):</label>
            <input
              type="number"
              value={phosphorus}
              onChange={(e) => setPhosphorus(Number(e.target.value))}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Phosphorus (e.g., 30)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Potassium (kg/ha):</label>
            <input
              type="number"
              value={potassium}
              onChange={(e) => setPotassium(Number(e.target.value))}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Potassium (e.g., 20)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Temperature (°C):</label>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Temperature (e.g., 25)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Humidity (%):</label>
            <input
              type="number"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Humidity (e.g., 60)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">pH Level:</label>
            <input
              type="number"
              value={ph}
              onChange={(e) => setPh(Number(e.target.value))}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter pH Level (e.g., 6.5)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Rainfall (mm):</label>
            <input
              type="number"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Rainfall (e.g., 100)"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600">Get Recommendation</button>
        </form>
        {result && <div className="mt-4 p-2 text-center text-lg text-gray-800">{result}</div>}
      </div>
    </div>
  );
};

export default CropRecommendation;
