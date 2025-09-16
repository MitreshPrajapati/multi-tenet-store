"use client";

import TextInput from "@/components/FormInput/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { Circle, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "@/redux/slices/checkoutSlice";

export default function ShippingDetailsForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);

  const existingFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );

  const initialShippingCost = existingFormData?.shippingCost || "";
  const [shippingCost, setShippingCost] = useState(initialShippingCost);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...existingFormData },
  });

  const processData = async (data) => {
    data.shippingCost = shippingCost;
    console.log(data);
    dispatch(updateCheckoutFormData(data));

    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-green-500">
        Shipping Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Street Address"
          name="streetAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="City"
          name="city"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Country"
          name="country"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Zip Code"
          name="zipcode"
          register={register}
          errors={errors}
          className="w-full"
        />
        {/* shipping cost */}
        <div className="col-span-full">
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Shipping Cost?
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                {...register("shippingCost", { required: true })}
                type="radio"
                id="cheap"
                name="shipping-cost"
                className="hidden peer"
                value={8}
                onChange={(e) => setShippingCost(e.target.value)}
                required
              />
              <label
                htmlFor="cheap"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700   "
              >
                <div className="flex gap-2 items-center">
                  <Truck className="w-8 h-8 ms-3 flex-shrink-0" />
                  <div>
                    <p>UPS</p>
                    <p>Delivery Cost: $8</p>
                  </div>
                </div>
                <Circle className="size-5 ms-3 flex-shrink-0 " />
              </label>
            </li>
            <li>
              <input
                {...register("shippingCost", { required: true })}
                type="radio"
                id="expensive"
                name="shipping-cost"
                className="hidden peer"
                value={20}
                onChange={(e) => setShippingCost(e.target.value)}
                required
              />
              <label
                htmlFor="expensive"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700   "
              >
                <div className="flex gap-2 items-center">
                  <Truck className="w-8 h-8 ms-3 flex-shrink-0" />
                  <div>
                    <p>UPS</p>
                    <p>Delivery Cost: $20</p>
                  </div>
                </div>
                <Circle className="size-5 ms-3 flex-shrink-0 " />
              </label>
            </li>
          </ul>
        </div>
      </div>

      {/* <button type="submit">sumit</button> */}
      <NavButtons currentStep={currentStep} />
    </form>
  );
}
