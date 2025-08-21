"use client";

import Breadcrumb from "@/components/fe/Breadcrumb";
import CartItems from "@/components/fe/CartItems";
import CartProduct from "@/components/fe/CartProduct";
import CartSubtotal from "@/components/fe/CartSubtotal";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart);
  const subtotal = cartItems
    .reduce((total, item) => total + item.salePrice * item.quantity, 0)
    .toFixed(2);
  // console.log("Cart Items:", subtotal);
  return (
    <>
      <Breadcrumb />

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-12 gap-8">
          <CartItems cartItems={cartItems} />
          <CartSubtotal subtotal={subtotal} />
        </div>
      ) : (
        <div className="flex justify-center min-h-screen items-center">
          <h2 className="text-2xl font-semibold">
            {`Your cart is empty `}
            <Link
              href="/"
              className=" text-green-500  hover:underline inline-block"
            >
              {" " + `Continue Shopping`}
            </Link>
          </h2>
        </div>
      )}
    </>
  );
};

export default Cart;
