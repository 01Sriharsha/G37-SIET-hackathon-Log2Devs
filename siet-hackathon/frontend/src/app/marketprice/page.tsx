"use client";

import React, { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Define the MarketPrice type for TypeScript
interface MarketPrice {
  city: string;
  district: string;
  crop: {
    name: string;
    icon: string;
  };
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  market: string;
}

// Sample data to display in the tracker
const marketPrices: MarketPrice[] = [
  {
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    crop: { name: 'Rice', icon: '🌾' },
    minPrice: 100,
    maxPrice: 200,
    modalPrice: 150,
    market: 'Krishna Market',
  },
  {
    city: 'Mysuru',
    district: 'Mysuru',
    crop: { name: 'Wheat', icon: '🌾' },
    minPrice: 120,
    maxPrice: 250,
    modalPrice: 180,
    market: 'Mysuru Market',
  },
  {
    city: 'Hubballi',
    district: 'Dharwad',
    crop: { name: 'Maize', icon: '🌽' },
    minPrice: 90,
    maxPrice: 170,
    modalPrice: 130,
    market: 'Hubballi Market',
  },
];

// List of districts in Karnataka
const karnatakaDistricts: string[] = [
  'Bagalkote',
  'Ballari',
  'Bengaluru Rural',
  'Bengaluru Urban',
  'Bhadravathi',
  'Belagavi',
  'Bellary',
  'Chamarajanagar',
  'Chikkamagaluru',
  'Chitradurga',
  'Davanagere',
  'Dharwad',
  'Gadag',
  'Hassan',
  'Haveri',
  'Kodagu',
  'Kolar',
  'Koppal',
  'Mandya',
  'Mysuru',
  'Raichur',
  'Ramanagara',
  'Shivamogga',
  'Tumakuru',
  'Udupi',
  'Uttara Kannada',
  'Vijayapura',
  'Yadgir',
];

const MarketPriceTracker: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [filteredPrices, setFilteredPrices] = useState<MarketPrice[]>([]);

  // Handle district selection change
  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
  };

  // Filter crops based on selected district
  const handleGoClick = () => {
    const filtered = marketPrices.filter(
      (price) => price.district === selectedDistrict
    );
    console.log('Selected District:', selectedDistrict); // Debugging output
    console.log('Filtered Prices:', filtered); // Debugging output
    setFilteredPrices(filtered);
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-green-600">
          Market Price Tracker
        </h2>

        {/* District Selection */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            <Select
              value={selectedDistrict}
              onValueChange={handleDistrictChange} // Corrected here
            >
              <SelectTrigger className="p-2">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {karnatakaDistricts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGoClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Go
          </Button>
        </div>

        {/* Crop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrices.length === 0 ? (
            <p className="text-center col-span-full text-lg">
              No crops available. Please select a district and click Go.
            </p>
          ) : (
            filteredPrices.map((price, index) => (
              <div
                key={index}
                className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col items-center"
              >
                <div className="text-6xl mb-2">{price.crop.icon}</div>
                <h3 className="text-3xl font-semibold text-green-600">{price.crop.name}</h3>
                <p className="text-black font-bold mt-2 text-md">City: {price.city}</p>
                <p className="text-black font-bold text-md">District: {price.district}</p>
                <p className="text-black font-bold text-lg">Market: {price.market}</p>
                <div className="mt-4 w-full text-center">
                  <p className="text-green-800 font-bold">
                    Min Price: ₹{price.minPrice}
                  </p>
                  <p className="text-red-600 font-bold">
                    Max Price: ₹{price.maxPrice}
                  </p>
                  <p className="text-blue-600 font-bold">
                    Modal Price: ₹{price.modalPrice}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketPriceTracker;
