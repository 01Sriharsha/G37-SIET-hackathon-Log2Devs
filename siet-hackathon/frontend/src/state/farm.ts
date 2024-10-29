// src/store/useFarmStore.ts
import {create} from 'zustand';

export interface Crop {
  id: number;
  name: string;
  quantity: number;
  harvestDate: string;
  price: number;
  isNegotiable: boolean;
  irrigationDate: string;
  fertilizersUsed: string;
  duration: string; // e.g., "90 days"
}

export interface Farm {
  id: number;
  name: string;
  location: string;
  crops: Crop[];
  plantingDate: string;
  image : string
}

interface FarmStore {
  farms: Farm[];
  addFarm: (farm: Farm) => void;
  removeFarm: (id: number) => void;
  addCropToFarm: (farmId: number, crop: Crop) => void;
  removeCropFromFarm: (farmId: number, cropId: number) => void;
}

export const useFarmStore = create<FarmStore>((set) => ({
  farms: [],
  addFarm: (farm) => set((state) => ({ farms: [...state.farms, farm] })),
  removeFarm: (id) => set((state) => ({ farms: state.farms.filter(farm => farm.id !== id) })),
  addCropToFarm: (farmId, crop) => set((state) => ({
    farms: state.farms.map(farm => 
      farm.id === farmId 
        ? { ...farm, crops: [...farm.crops, crop] } 
        : farm
    )
  })),
  removeCropFromFarm: (farmId, cropId) => set((state) => ({
    farms: state.farms.map(farm => 
      farm.id === farmId 
        ? { ...farm, crops: farm.crops.filter(crop => crop.id !== cropId) } 
        : farm
    )
  })),
}));
