"use client";
import { addToCart } from "@/redux/slices/cartSlice";
import { ShoppingCart } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  function handleAddToCart() {
    dispatch(addToCart(product));
    toast.success("Item added Successfully");
  }
  return (
    <div>
      <button
        onClick={() => handleAddToCart()}
        className="flex bg-green-500 space-x-2 rounded-md py-2 px-4 items-center hover:bg-green-600"
      >
        <ShoppingCart className="rounded-full w-6 h-6 text-white font-bold cursor-pointer" />
        <span className="text-white">ADD</span>
      </button>
    </div>
  );
}
