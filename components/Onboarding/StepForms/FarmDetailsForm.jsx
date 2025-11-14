"use client";

import TextInput from "@/components/FormInput/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";

import AddArrayItems from "@/components/FormInput/AddArrayItems";
import {
  setCurrentStep,
  updateOnboardingFormData,
} from "@/redux/slices/onboardingSlice";

export default function FarmDetailsForm() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store?.onboarding?.currentStep);
  const existingFormData = useSelector(
    (store) => store?.onboarding?.onboardingFormData
  );

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...existingFormData } });

  // console.log(paymentMethod);
  const processData = async () => {
    const data = {
      ...existingFormData,
    };
    data.products = products;
    // console.log(data);
    dispatch(updateOnboardingFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-green-500">
        Farm Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label={"What is the Size of Your Land in Acres"}
          name={"landSize"}
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"What is your main Crop that you Cultivate"}
          name={"mainCrop"}
          type="text"
          register={register}
          errors={errors}
          className="w-full"
        />
        <AddArrayItems
          setItems={setProducts}
          items={products}
          itemTitle={"Product"}
        />
      </div>

      <NavButtons currentStep={currentStep} />
    </form>
  );
}
