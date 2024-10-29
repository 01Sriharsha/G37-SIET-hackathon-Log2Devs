"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { useProductStore } from "@/state/products"; // Adjust path as needed
import { v4 as uuid } from "uuid";
import { useAuthStore } from "@/state/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProductFormDialog() {
  const { user } = useAuthStore();
  const addProduct = useProductStore((state) => state.addProduct);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [category, setCategory] = useState<"Vegetables" | "Fruits" | "Grains">(
    "Vegetables"
  );
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState("kg");
  const [location, setLocation] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [contactInfo, setContactInfo] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const img = e.target?.result?.toString();
          setImages((prev) => [...prev, img!]);
        };
        fileReader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      id: uuid(),
      title,
      description,
      price,
      isNegotiable,
      ownerId: user?._id || "",
      category,
      quantity,
      unit,
      location,
      harvestDate: new Date(harvestDate),
      images,
      contactInfo,
      createdAt: new Date(),
    };

    addProduct(newProduct);
    // Reset form
    setTitle("");
    setDescription("");
    setPrice("");
    setIsNegotiable(false);
    setCategory("Vegetables");
    setQuantity(0);
    setUnit("kg");
    setLocation("");
    setHarvestDate("");
    setImages([]);
    setContactInfo("");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] overflow-auto p-0">
        <DialogTitle className="text-2xl text-center mt-4 text-green-600">
          Add New Product
        </DialogTitle>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex items-center">
            <label className="text-gray-700 font-bold mr-2">Negotiable</label>
            <input
              type="checkbox"
              checked={isNegotiable}
              onChange={() => setIsNegotiable(!isNegotiable)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Category</label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value as "Vegetables" | "Fruits" | "Grains"
                )
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Unit</label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">
              Harvest Date
            </label>
            <input
              type="date"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              accept="image/*"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {images &&
              images.map((image, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() =>
                    setImages((prev) => prev.filter((img) => img !== image))
                  }
                >
                  <Image
                    src={image}
                    alt="image"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </button>
              ))}
          </div>

          <div>
            <label className="block text-gray-700 font-bold">
              Contact Info
            </label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Add Product
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
