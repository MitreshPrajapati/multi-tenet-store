"use client";

import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";
import React from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "@/redux/slices/checkoutSlice";
import { useSession } from "next-auth/react";

export default function PersonalDetailsForm() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store?.checkout?.currentStep);
  const existingFormData = useSelector(
    (store) => store?.checkout?.checkoutFormData
  );

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...existingFormData } });

  const processData = async (data) => {
    // console.log(data);
    data.userId = userId;
    dispatch(updateCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
    console.log(data, currentStep);
  };
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-green-500">
        Personal Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Email Address"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Phone Number"
          name="phone"
          register={register}
          errors={errors}
          className="w-full"
        />
      </div>
      <NavButtons currentStep={currentStep} />
    </form>
  );
}
