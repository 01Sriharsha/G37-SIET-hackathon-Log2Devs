// src/store/useInventoryStore.ts
import { create } from 'zustand';

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

export const useInventoryStore = create<InventoryState>((set) => ({
  crops: [],
  addCrop: (crop) =>
    set((state) => ({ crops: [...state.crops, crop] })),
  removeCrop: (id) =>
    set((state) => ({ crops: state.crops.filter((crop) => crop.id !== id) })),
}));
