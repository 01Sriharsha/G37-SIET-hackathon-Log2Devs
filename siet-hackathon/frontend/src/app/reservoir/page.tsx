"use client";
import React, { useEffect, useState } from 'react';

interface ReservoirData {
  Date: string;
  Reservoir: string;
  Water_Level_TMC: number;
  Inflow_cusecs: number;
  Outflow_cusecs: number;
}

const Reservoir: React.FC = () => {
  const [data, setData] = useState<ReservoirData[]>([]);
  const [reservoirs, setReservoirs] = useState<string[]>([]);
  const [selectedReservoir, setSelectedReservoir] = useState<string>('');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    fetch('/karnataka_water_data_sorted.json')
      .then((response) => response.json())
      .then((jsonData: ReservoirData[]) => {
        setData(jsonData);
        const uniqueReservoirs = Array.from(new Set(jsonData.map((item) => item.Reservoir)));
        setReservoirs(uniqueReservoirs);
      });
  }, []);

  const checkIrrigation = (reservoirName: string) => {
    const reservoirData = data.filter((item) => item.Reservoir === reservoirName);
    
    if (reservoirData.length > 0) {
      const latestData = reservoirData[reservoirData.length - 1];
      const irrigationStatus =
        latestData.Inflow_cusecs >= latestData.Outflow_cusecs
          ? '💧 Yes, water is available for irrigation.'
          : '⚠️ No, water is not sufficient for irrigation.';
      setResult(
        `🌊 Reservoir: ${latestData.Reservoir}\n📅 Date: ${latestData.Date}\n🚰 Water Level: ${latestData.Water_Level_TMC} TMC\n⬆️ Inflow: ${latestData.Inflow_cusecs} cusecs\n⬇️ Outflow: ${latestData.Outflow_cusecs} cusecs\n📈 Irrigation Status: ${irrigationStatus}`
      );
    } else {
      setResult('⚠️ No data available for this reservoir.');
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const reservoirName = event.target.value;
    setSelectedReservoir(reservoirName);
    checkIrrigation(reservoirName);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center"> {/* Outer background */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"> {/* Card background set to white */}
        <h2 className="text-2xl font-semibold text-center mb-4">🚜 Water Irrigation Checker</h2>
        <div className="mb-4">
          <label htmlFor="reservoirSelect" className="block text-gray-700 mb-2">🌍 Select a Reservoir:</label>
          <select
            id="reservoirSelect"
            className="block w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={selectedReservoir}
            onChange={handleSelectChange}
          >
            <option value="">Select Reservoir</option>
            {reservoirs.map((reservoir, index) => (
              <option key={index} value={reservoir}>
                {reservoir}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
          <pre className="text-gray-800 whitespace-pre-wrap">{result}</pre>
        </div>
      </div>
    </div>
  );
};

export default Reservoir;
