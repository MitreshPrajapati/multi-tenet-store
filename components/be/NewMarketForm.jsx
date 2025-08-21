"use client";

import ImageInput from "@/components/FormInput/ImageInput";
import SelectInput from "@/components/FormInput/SelectInput";
import SubmitButton from "@/components/FormInput/SubmitButton";
import TextareaInput from "@/components/FormInput/TextArea";
import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";
import FormHeader from "@/components/be/FormHeader";
import { makePostRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NewMarketForm = ({categories}) => {
  const [logoUrl, setLogoUrl] = useState("");
  const [loading, setLoading] = useState(false);

const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  // Redirect function
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/markets");
  }

  async function onSubmit(data) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.logoUrl = logoUrl;
    data.isActive = isActive;

    console.log(data);
    makePostRequest(setLoading, "api/markets", data, "Market", reset, redirect);
    // setLogoUrl("");
  }

  return (
    <div>
      <FormHeader title={"New Market"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-600 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Market Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Select Categories"
            name="categoryIds"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            multiple={true}
          />

          <ImageInput
            label="Market Logo"
            imageUrl={logoUrl}
            setImageUrl={setLogoUrl}
            endpoint="marketLogoUploader"
          />
          <TextareaInput
            label="Market Description"
            name="description"
            register={register}
            errors={errors}
          />
          <ToggleInput
            label="Market Status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          title={"Create Market"}
          loadingButtonTitle={"Creating Market..."}
        />
      </form>
    </div>
  );
};

export default NewMarketForm;
