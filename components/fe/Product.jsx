"use client";
import { addToCart } from "@/redux/slices/cartSlice";
import { BaggageClaim, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  function handleAddToCart() {
    // Logic to add the product to the cart
    console.log(`Adding ${product.title} to cart`);
    dispatch(addToCart(product));
    toast.success(`Item added to cart!`);
  }
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-800 transition-all delay-100">
      <Link
        key={product.slug}
        href={`/products/${product.slug}`}
        className="block cursor-pointer"
      >
        <Image
          src={product.imageUrl || "/vegetables.png"}
          alt={product.title}
          width={556}
          height={556}
          className="w-full h-32 object-contain"
        />
      </Link>

      <div className="flex flex-col p-4 ">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-slate-800 dark:text-slate-50  text-left font-semibold text-lg">
            {product.title}
          </h2>
        </Link>

        <div className="flex justify-between  items-center gap-2  mt-4">
          <span className="text-slate-800 dark:text-slate-50">
            INR: {product.salePrice}
          </span>
          <button
            onClick={() => handleAddToCart()}
            className="flex bg-green-500 space-x-2 rounded-md py-2 px-4 items-center hover:bg-green-600"
          >
            {/* <BaggageClaim className="rounded-full w-6 h-6 text-white font-bold cursor-pointer" /> */}
            <ShoppingCart className="rounded-full w-6 h-6 text-white font-bold cursor-pointer" />
            <span className="text-white">ADD</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
