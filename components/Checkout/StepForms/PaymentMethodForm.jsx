"use client";

import TextInput from "@/components/FormInput/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { Circle, CreditCard, Truck, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "@/redux/slices/checkoutSlice";

export default function PaymentMethodForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store?.checkout?.currentStep);
  const existingFormData = useSelector(
    (store) => store?.checkout?.checkoutFormData
  );

  const initialPaymentMethod = existingFormData?.paymentMethod || "";
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...existingFormData } });

  // console.log(paymentMethod);
  const processData = async (data) => {
    data.paymentMethod = paymentMethod;
    console.log("data", data);
    dispatch(updateCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-green-500">
        Payment Method
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* PAyment Method */}
        <div className="col-span-full">
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Which Payment Method do you prefer?
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                {...register("paymentMethod", { required: true })}
                type="radio"
                id="cheap"
                name="payment-method"
                className="hidden peer"
                value="Cash On Delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              <label
                htmlFor="cheap"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700   "
              >
                <div className="flex gap-2 items-center">
                  <Wallet className="w-8 h-8 ms-3 flex-shrink-0" />
                  <p>Cash On Delivery</p>
                </div>
                <Circle className="size-5 ms-3 flex-shrink-0 " />
              </label>
            </li>
            <li>
              <input
                {...register("paymentMethod", { required: true })}
                type="radio"
                id="expensive"
                name="payment-method"
                className="hidden peer"
                value="Credit Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              <label
                htmlFor="expensive"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700   "
              >
                <div className="flex gap-2 items-center">
                  <CreditCard className="w-8 h-8 ms-3 flex-shrink-0" />
                  <p>Credit Card</p>
                </div>
                <Circle className="size-5 ms-3 flex-shrink-0 " />
              </label>
            </li>
          </ul>
        </div>
      </div>

      <NavButtons currentStep={currentStep} />
    </form>
  );
}
