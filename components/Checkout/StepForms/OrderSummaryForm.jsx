"use client";

import { makePostRequest } from "@/lib/apiRequest";
import { setCurrentStep } from "@/redux/slices/checkoutSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function OrderSummaryForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const checkoutFormData = useSelector(
    (store) => store?.checkout?.checkoutFormData
  );
  const currentStep = useSelector((store) => store?.checkout?.currentStep);
  const cartItems = useSelector((store) => store.cart);
  const subtotal = cartItems
    .reduce((total, item) => total + item.salePrice * item.quantity, 0)
    .toFixed(2);

  async function submit() {
    const data = {
      cartItems,
      checkoutFormData,
    };

    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setLoading(false);
        console.log("order>>>>", responseData);
        toast.success(`Order Created Successfully`);

        router.push("/order-confirmation");
      } else {
        setLoading(false);
        toast.error("Something Went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    // makePostRequest(setLoading, "api/orders", data, "Order", reset,  );
    // console.log(combinedData);
  }

  async function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }

  return (
    <div className=" my-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-green-500">
        Order Summary
      </h2>
      {cartItems?.map((cartItem, idx) => (
        <div
          className="flex border-b items-center justify-between border-slate-400 py-4 font-semibold text-sm"
          key={idx}
        >
          <div className="w-1/3 flex gap-4 items-center">
            <Image
              src={cartItem?.imageUrl || "/vegetables.png"}
              width={249}
              height={249}
              className="size-14 object-cover rounded-lg "
              alt={cartItem?.title}
            />
            <div className="flex flex-col ">
              <h2 className="text-lg">{cartItem?.title}</h2>
              {/* <p className="text-sm text-slate-400">Category</p> */}
            </div>
          </div>

          <div className="w-fit flex items-center h-fit">
            <span className="border px-4 py-2 h-auto rounded-md  ">
              {cartItem?.quantity}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <h4>{cartItem?.salePrice}</h4>
          </div>
        </div>
      ))}

      <div className=" flex items-center justify-between mt-4">
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-slate-800 dark:bg-green-600 dark:hover:bg-green-700 "
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>

        {loading ? (
          <button
            type="button"
            disabled
            className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-slate-800 dark:bg-green-600 dark:hover:bg-green-700 "
          >
            Processing please wait...
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-slate-800 dark:bg-green-600 dark:hover:bg-green-700 "
          >
            <span>Proceed to Payment</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
