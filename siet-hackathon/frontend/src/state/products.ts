import { create } from "zustand";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  isNegotiable: boolean;
  ownerId: string;
  category: "Vegetables" | "Fruits" | "Grains";
  quantity: number; // Quantity available
  unit: string; // Unit of measurement (e.g., kg, lb, bunch)
  location: string; // Location of the product
  harvestDate: Date; // Date of harvest
  images: string[]; // Array of image URLs
  contactInfo: string; // Contact information (could be phone number or email)
  createdAt: Date; // Date when the product was listed
};

type ProductStore = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
};

const products =
  (typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("products")!)) ||
  [];

export const useProductStore = create<ProductStore>((set, get) => ({
  products,
  addProduct: (product: Product) => {
    set((prev) => {
      const products = [...prev.products, product];
      localStorage.setItem("products", JSON.stringify(products));
      return {
        products,
      };
    });
  },

  getProduct: (id: string) => {
    const state = get();
    return state.products.find((product) => product.id === id);
  },

  removeProduct: (id: string) => {
    set((prev) => {
      const products = prev.products.filter((product) => product.id !== id);
      localStorage.setItem("products", JSON.stringify(products));
      return {
        products,
      };
    });
  },
}));
