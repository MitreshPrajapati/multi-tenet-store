"use client";

import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";
import React from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateOnboardingFormData,
} from "@/redux/slices/onboardingSlice";
import { useSession } from "next-auth/react";

export default function BasicInformationForm() {
  // const { data: session, status } = useSession();
  // const userId = session?.user?.id;

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

  const processData = async (data) => {
    // console.log(data);
    // data.userId = userId;
    dispatch(updateOnboardingFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
    console.log(data, currentStep);
  };
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-green-500">
        Basic Information
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
          label="Phone Number"
          name="phone"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Physical Address"
          name="physicalAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Contact Person Address"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Contact Person Phone"
          name="contactPersonPhone"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ToggleInput
          label="Farmer Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>
      <NavButtons currentStep={currentStep} />
    </form>
  );
}
