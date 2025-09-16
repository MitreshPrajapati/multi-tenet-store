import Link from "next/link";
import React from "react";

const CartSubtotal = ({ subtotal, totalPrice }) => {
  return (
    <div className="sm:col-span-4 col-span-full rounded-lg bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:text-slate-100 overflow-hidden px-4 py-4 mb-4">
      <h2 className="text-2xl py-3 font-semibold">Cart Total</h2>
      <div className="flex justify-between items-center border-b pb-6 border-slate-400">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>

      <div className="flex justify-between items-center pt-6  pb-3">
        <span>Tax</span>
        <span>$0</span>
      </div>
      <div className="flex justify-between items-center  pb-3">
        <span>Shipping in US</span>
        <span>$50</span>
      </div>

      <p className="text-gray-400 text-sm pb-6 border-b border-gray-400">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui, incidunt!
      </p>
      <div className="flex justify-between items-center py-6">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>

      <div className="mt-4">
        <Link
          href="/checkout"
          className="bg-green-500 text-white font-normal rounded-lg w-full py-2 px-6 my-6"
        >
          Continue to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSubtotal;
