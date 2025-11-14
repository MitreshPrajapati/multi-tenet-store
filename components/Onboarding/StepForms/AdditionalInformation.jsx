"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateOnboardingFormData,
} from "@/redux/slices/onboardingSlice";
import ImageInput from "@/components/FormInput/ImageInput";
import TextareaInput from "@/components/FormInput/TextArea";

export default function AdditionalInformationForm() {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
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
  } = useForm({
    defaultValues: { ...existingFormData },
  });

  const processData = async () => {
    const data = {
      ...existingFormData,
      profileImageUrl: imageUrl,
    };
    // existingFormData.profileImageUrl = imageUrl;
    dispatch(updateOnboardingFormData(data));

    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-green-500">
        Addittional Information
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="farmerProfileImageUploader"
          label={"Farmer Profile Image"}
        />
        <TextareaInput
          label="Farmer's Payment Terms"
          name="terms"
          register={register}
          errors={errors}
        />
        <TextareaInput
          label="Notes"
          name="noters"
          register={register}
          errors={errors}
        />
      </div>

      <NavButtons currentStep={currentStep} />
    </form>
  );
}
