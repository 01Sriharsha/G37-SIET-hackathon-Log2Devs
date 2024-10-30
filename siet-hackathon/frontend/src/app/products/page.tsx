"use client";

import { useProductStore } from "@/state/products";
import Image from "next/image";
import ProductFormDialog from "./product-form-dialog";
import { Phone, Trash } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/state/auth";

const ProductForm: React.FC = () => {
  const { user } = useAuthStore();
  const { products, removeProduct } = useProductStore();

  return (
    <div className="h-screen grid place-items-center p-4 bg-gray-50">
      <div className="space-y-6 h-screen">
      <div className="w-full flex justify-between items-center gap-2">
        <h2 className="text-2xl text-green-700 font-bold">All Products</h2>
        {user && <ProductFormDialog />}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-full max-w-6xl">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <Image
              src={product.images[0]}
              alt={product.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center gap-2">
                <h3 className="text-xl font-semibold capitalize text-gray-900">
                  {product.title}
                </h3>
                <Link
                  href={`tel:${product.contactInfo}`}
                  className="border border-gray-700 rounded-full p-2"
                >
                  <Phone size={"1.1rem"} />
                </Link>
              </div>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold text-green-600">
                  ₹{product.price}
                </span>
                <span
                  className={`${
                    product.isNegotiable ? "text-blue-500" : "text-gray-500"
                  } text-sm font-medium`}
                >
                  {product.isNegotiable ? "Negotiable" : "Non-negotiable"}
                </span>
              </div>
              <div className="mt-3 flex justify-between items-center text-gray-500 text-xs">
                <p>
                  {product.quantity} {product.unit} available
                </p>
                <p>Location: {product.location}</p>
              </div>
            </div>
            {product.ownerId === user?._id && (
              <button
                className="bg-white text-red-500 p-2 rounded-full border border-gray-300 absolute right-1 top-1"
                onClick={() =>
                  confirm("Are you sure want to remove this product?") &&
                  removeProduct(product.id)
                }
              >
                <Trash size={"1.1rem"} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductForm;
