"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Crop, useInventoryStore } from "@/state/inventory";

import React, { useState } from "react";

export default function AddCropForm() {
  const { addCrop } = useInventoryStore();
  const [cropData, setCropData] = useState<Omit<Crop, "id">>({
    name: "",
    quantity: 0,
    harvestDate: "",
    location: "",
    type: "",
    description: "",
    condition: "",
    price: 0,
    isNegotiable: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setCropData({
      ...cropData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleAddCrop = () => {
    if (cropData.name && cropData.price && cropData.quantity) {
      addCrop({ id: Date.now(), ...cropData });
      setCropData({
        name: "",
        quantity: 0,
        harvestDate: "",
        location: "",
        type: "",
        description: "",
        condition: "",
        price: 0,
        isNegotiable: false,
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger>Add Crop</DialogTrigger>
      <DialogContent className="h-[90vh] overflow-auto">
        <DialogTitle className="text-xl font-semibold text-gray-700 mb-4">
          Add New Crop
        </DialogTitle>

        <label className="block font-medium text-gray-600 mb-1">
          Crop Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Crop Name"
          value={cropData.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block font-medium text-gray-600 mb-1">
          Quantity (kg)
        </label>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity (kg)"
          value={cropData.quantity}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block font-medium text-gray-600 mb-1">
          Harvest Date
        </label>
        <input
          type="date"
          name="harvestDate"
          placeholder="Harvest Date"
          value={cropData.harvestDate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block font-medium text-gray-600 mb-1">Location</label>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={cropData.location}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block font-medium text-gray-600 mb-1">
          Crop Type
        </label>
        <select
          name="type"
          value={cropData.type}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="">Select Crop Type</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Grain">Grain</option>
        </select>

        <label className="block font-medium text-gray-600 mb-1">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Description"
          value={cropData.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block font-medium text-gray-600 mb-1">
          Condition
        </label>
        <select
          name="condition"
          value={cropData.condition}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="">Select Condition</option>
          <option value="Fresh">Fresh</option>
          <option value="Dry">Dry</option>
          <option value="Frozen">Frozen</option>
        </select>

        <label className="block font-medium text-gray-600 mb-1">
          Price ($)
        </label>
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={cropData.price}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            name="isNegotiable"
            checked={cropData.isNegotiable}
            onChange={handleInputChange}
            className="h-4 w-4"
          />
          <span className="font-medium text-gray-600">Price Negotiable</span>
        </label>

        <button
          onClick={handleAddCrop}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Add Crop
        </button>
      </DialogContent>
    </Dialog>
  );
}
