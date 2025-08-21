import Link from "next/link";
import React from "react";
import CartProduct from "./CartProduct";

const CartItems = ({cartItems}) => {
  return (
    <div className="sm:col-span-8 col-span-full">
      <h2 className="py-2 text-2xl font-semibold mb-6">Your Cart</h2>

      <div className="flex border-b items-center justify-between border-slate-400 text-slate-400 pb-4 font-semibold text-sm">
        <h2 className="uppercase">Product</h2>
        <h2 className="uppercase">Quantity</h2>
        <h2 className="uppercase">Price</h2>
      </div>

      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => (
          <CartProduct key={cartItem.id} cartItem={cartItem} />
        ))
      ) : (
        <div className="text-center py-6">
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <Link
            href="/"
            className="text-lg text-green-500 hover:underline mt-2 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      )}
      {/* <CartProduct /> */}

      <form className="flex items-center py-6 ">
        <label for="simple-search" className="sr-only">
          Search
        </label>
        <div className="w-1/2">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Coupon..."
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5  ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Apply Coupon
        </button>
      </form>
    </div>
  );
};

export default CartItems;
