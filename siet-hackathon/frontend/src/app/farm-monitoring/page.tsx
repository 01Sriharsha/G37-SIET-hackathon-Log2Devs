"use client";

// src/pages/FarmMonitoringPage.tsx
import React, { useState } from "react";
import { useFarmStore, Crop } from "@/state/farm";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const FarmMonitoringPage: React.FC = () => {
  const { farms, addFarm, addCropToFarm } = useFarmStore();

  const [farmName, setFarmName] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [farmImage, setFarmImage] = useState<File | null>(null);
  const [isCropFormVisible, setIsCropFormVisible] = useState(false);

  const [cropDetails, setCropDetails] = useState({
    name: "",
    quantity: 0,
    harvestDate: "",
    price: 0,
    irrigationDate: "",
    fertilizersUsed: "",
    duration: "",
    condition: "",
    isNegotiable: false,
  });

  const handleAddFarm = (e: React.FormEvent) => {
    e.preventDefault();
    addFarm({ name: farmName, location: farmLocation, image: farmImage! });
    // Reset fields after adding farm
    setFarmName("");
    setFarmLocation("");
    setFarmImage(null);
  };

  const handleAddCrop = (farmId: number) => {
    const newCrop: Crop = {
      id: uuidv4() as unknown as number, // Generate a unique ID for the crop
      ...cropDetails, // Spread the crop details state
    };

    addCropToFarm(farmId, newCrop);
    // Reset crop details after adding crop
    setCropDetails({
      name: "",
      quantity: 0,
      harvestDate: "",
      price: 0,
      irrigationDate: "",
      fertilizersUsed: "",
      duration: "",
      condition: "",
      isNegotiable: false,
    });
  };

  const handleCropDetailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setCropDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox for isNegotiable
    }));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">
        Farm Monitoring
        <p className="text-[5rem]">🌾</p>
      </h1>

      {/* Farm Form */}
      <form onSubmit={handleAddFarm} className="mb-6 border p-4 rounded">
        <h2 className="text-xl font-semibold">Add Farm</h2>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Farm Name</label>
          <input
            type="text"
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={farmLocation}
            onChange={(e) => setFarmLocation(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Farm Image</label>
          <input
            type="file"
            onChange={(e) => e.target.files && setFarmImage(e.target.files[0])}
            className="border rounded p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Add Farm
        </button>
      </form>

      {/* Display Farms */}
      <div>
        {farms.map((farm) => (
          <div key={farm.id} className="border mb-4 p-4 rounded">
            <h3 className="text-xl font-semibold">{farm.name}</h3>
            <p className="text-gray-700">Location: {farm.location}</p>
            {farm.image && (
              <Image
                src={URL.createObjectURL(farm.image)}
                alt="Farm"
                className="w-32 h-32 mb-2"
              />
            )}
            <button
              onClick={() => setIsCropFormVisible(!isCropFormVisible)}
              className="bg-blue-500 text-white p-2 rounded mb-2"
            >
              {isCropFormVisible ? "Hide Crop Form" : "Add Crop"}
            </button>

            {isCropFormVisible && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddCrop(farm.id);
                }}
                className="mb-4 border p-4 rounded"
              >
                <h4 className="text-lg font-semibold">Add Crop</h4>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Crop Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={cropDetails.name}
                    onChange={handleCropDetailChange}
                    className="border rounded p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={cropDetails.quantity}
                    onChange={handleCropDetailChange}
                    className="border rounded p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Harvest Date
                  </label>
                  <input
                    type="date"
                    name="harvestDate"
                    value={cropDetails.harvestDate}
                    onChange={handleCropDetailChange}
                    className="border rounded p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={cropDetails.price}
                    onChange={handleCropDetailChange}
                    className="border rounded p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Irrigation Date
                  </label>
                  <input
                    type="date"
                    name="irrigationDate"
                    value={cropDetails.irrigationDate}
                    onChange={handleCropDetailChange}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Fertilizers Used
                  </label>
                  <input
                    type="text"
                    name="fertilizersUsed"
                    value={cropDetails.fertilizersUsed}
                    onChange={handleCropDetailChange}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={cropDetails.duration}
                    onChange={handleCropDetailChange}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Condition
                  </label>
                  <input
                    type="text"
                    name="condition"
                    value={cropDetails.condition}
                    onChange={handleCropDetailChange}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Is Negotiable
                  </label>
                  <input
                    type="checkbox"
                    name="isNegotiable"
                    checked={cropDetails.isNegotiable}
                    onChange={handleCropDetailChange}
                    className="border rounded p-2 w-4 h-4"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Add Crop
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmMonitoringPage;
