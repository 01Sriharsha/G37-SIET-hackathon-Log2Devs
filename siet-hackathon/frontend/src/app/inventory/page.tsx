"use client";

import { useInventoryStore } from "@/state/inventory";
import AddCropForm from "./add-crop-form";

const InventoryPage: React.FC = () => {
  const { crops, removeCrop } = useInventoryStore();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Crop Inventory
      </h1>

      <AddCropForm />

      {/* Display Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Crops
        </h2>
        {crops.length === 0 ? (
          <p className="text-gray-500 text-center">No crops added yet.</p>
        ) : (
          <div className="grid gap-6">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="bg-white border border-gray-200 shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="flex-1 mb-4 md:mb-0">
                  <p className="text-lg font-medium text-gray-800 mb-1">
                    {crop.name}
                  </p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      Quantity:{" "}
                      <span className="font-semibold">{crop.quantity} kg</span>
                    </p>
                    <p>
                      Harvest Date:{" "}
                      <span className="font-semibold">{crop.harvestDate}</span>
                    </p>
                    <p>
                      Location:{" "}
                      <span className="font-semibold">{crop.location}</span>
                    </p>
                    <p>
                      Type: <span className="font-semibold">{crop.type}</span>
                    </p>
                    <p>
                      Condition:{" "}
                      <span className="font-semibold">{crop.condition}</span>
                    </p>
                    <p>Description: {crop.description}</p>
                    <p>
                      Price:{" "}
                      <span className="font-semibold">${crop.price}</span>{" "}
                      {crop.isNegotiable && "(Negotiable)"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeCrop(crop.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
