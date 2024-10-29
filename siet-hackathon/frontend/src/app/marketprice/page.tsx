"use client";

import React, { useCallback, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AllMarketPrices } from "@/data/mandi";

// Define the MarketPrice type for TypeScript
// interface MarketPrice {
//   city: string;
//   district: string;
//   crop: string;
//   icon: string;
//   min_price: number;
//   max_price: number;
//   modal_price: number;
//   market: string;
//   commodity: string;
// }

// List of districts in Karnataka
const karnatakaDistricts: string[] = [
  "Bagalkote",
  "Ballari",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Bhadravathi",
  "Belagavi",
  "Bellary",
  "Chamarajanagar",
  "Chikkamagaluru",
  "Chitradurga",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru",
  "Raichur",
  "Ramanagara",
  "Shivamogga",
  "Tumakuru",
  "Udupi",
  "Uttara Kannada",
  "Vijayapura",
  "Yadgir",
];

const MarketPriceTracker: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [marketPrices, setMarketPrices] =
    useState<Partial<typeof AllMarketPrices>>();
  const [isLoading, setIsLoading] = useState(false);

  // Handle district selection change
  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
  };

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    // const { data } = await axios<MarketPrice[]>({
    //   method: "get",
    //   endpoint: `/market?district=${selectedDistrict}`,
    const arr = AllMarketPrices.filter(
      (market) =>
        market.district?.toLowerCase() === selectedDistrict?.toLowerCase()
    );
    setIsLoading(false);
    setMarketPrices(arr);
  }, [selectedDistrict]);

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
                {Array.from(
                  new Set(AllMarketPrices.map((entry) => entry.district))
                ).map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleClick}>Go</Button>
        </div>

        {/* Crop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-12 grid place-items-center">
              <Loader size={"1.5rem"} className="animate-spin" />
            </div>
          ) : marketPrices?.length === 0 ? (
            <p className="text-center col-span-full text-lg">
              No crops available. Please select a district and click Go.
            </p>
          ) : (
            marketPrices?.map((price, index) => (
              <div
                key={index}
                className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col items-center border border-gray-300"
              >
                <div className="text-6xl mb-2">{price?.icon}</div>
                <h3 className="text-xl font-semibold text-green-600">
                  {price?.commodity}
                </h3>
                <p className="text-black font-bold text-md">
                  District: {price?.district}
                </p>
                <p className="text-black font-bold text-lg">
                  Market: {price?.market}
                </p>
                <div className="mt-4 w-full text-center">
                  <p className="text-green-800 font-bold">
                    Min Price: ₹{price?.min_price}
                  </p>
                  <p className="text-red-600 font-bold">
                    Max Price: ₹{price?.max_price}
                  </p>
                  <p className="text-blue-600 font-bold">
                    Modal Price: ₹{price?.modal_price}
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
