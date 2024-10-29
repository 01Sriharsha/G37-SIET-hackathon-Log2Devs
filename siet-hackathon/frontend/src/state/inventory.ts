// src/store/useInventoryStore.ts
import { create } from "zustand";

export type Crop = {
  id: number;
  name: string;
  quantity: number;
  harvestDate: string;
  type: string;
  description: string;
  condition: string;
  price: number;
  isNegotiable: boolean;
};

type InventoryState = {
  crops: Crop[];
  addCrop: (crop: Crop) => void;
  removeCrop: (id: number) => void;
};

const crops =
  (typeof window !== undefined && JSON.parse(localStorage.getItem("crops")!)) ||
  [];

export const useInventoryStore = create<InventoryState>((set) => ({
  crops,
  addCrop: (crop) =>
    set((state) => {
      const crops = [...state.crops, crop];
      localStorage.setItem("crops", JSON.stringify(crops));
      return { crops };
    }),
  removeCrop: (id) =>
    set((state) => {
      const crops = state.crops.filter((crop) => crop.id !== id);
      localStorage.setItem("crops", JSON.stringify(crops));
      return { crops };
    }),
}));
