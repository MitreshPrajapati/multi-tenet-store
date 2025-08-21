"use client";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const CartProduct = ({ cartItem }) => {
  const dispatch = useDispatch();
  function handleDeleteCartItem(id) {
    dispatch(removeFromCart(id));
    console.log(`Removing item with id: ${id} from cart`);
    toast.success(`Item removed from cart!`); // Show success message
  }
  function handleIncrementQty(id) {
    dispatch(incrementQty(id));
    console.log(`Incrementing quantity for item with id: ${id}`);
  }
  function handleDecrementQty(id) {
    dispatch(decrementQty(id));
    console.log(`Decrementing quantity for item with id: ${id}`);
  }

  return (
    <div className="flex border-b items-center justify-between border-slate-400 py-4 font-semibold text-sm">
      <div className="flex gap-4 items-center">
        <Image
          src={cartItem.imageUrl || "/vegetables.png"}
          width={249}
          height={249}
          className="w-20 h-20 object-cover rounded-lg "
          alt={cartItem.title}
        />
        <div className="flex flex-col ">
          <h2 className="text-lg">{cartItem.title}</h2>
          {/* <p className="text-sm text-slate-400">Category</p> */}
        </div>
      </div>

      <div className="">
        <div className="flex items-center h-fit">
          <button
            disabled={cartItem.quantity === 1}
            onClick={() => handleDecrementQty(cartItem.id)}
            className="border py-2 px-4 rounded-tl-lg rounded-bl-lg"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="border border-l-0 border-r-0 py-2 h-auto px-8  ">
            {cartItem.quantity}
          </span>
          <button
            onClick={() => handleIncrementQty(cartItem.id)}
            className="border py-2 px-4 rounded-tr-lg rounded-br-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <h4>{cartItem.salePrice}</h4>
        <button
          onClick={() => handleDeleteCartItem(cartItem.id)}
          className="p-2 bg-red-500 rounded-lg"
        >
          <Trash2 className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
