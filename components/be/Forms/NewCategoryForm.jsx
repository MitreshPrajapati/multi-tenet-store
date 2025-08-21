"use client";

import ImageInput from "@/components/FormInput/ImageInput";
import SelectInput from "@/components/FormInput/SelectInput";
import SubmitButton from "@/components/FormInput/SubmitButton";
import TextareaInput from "@/components/FormInput/TextArea";
import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NewCategoryForm = ({ updateData } = {}) => {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const categoryId = updateData?.id ?? "";
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
      ...updateData,
    },
  });
  
  const isActive = watch("isActive");
  // const markets = [];

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/categories");
  }

  async function onSubmit(data) {
    const slug = await generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.isActive = isActive;

    if (categoryId) {
      data.id = categoryId;
      console.log(data);
      makePutRequest(
        setLoading,
        `api/categories/${categoryId}`,
        data,
        "Category",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/categories",
        data,
        "Category",
        reset,
        redirect
      );
    }
    setImageUrl("");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-600 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Category Title"
          name="title"
          register={register}
          errors={errors}
        />
        {/* <SelectInput
          label="Select Market"
          name="marketsIds"
          options={markets}
          multiple={true}
          register={register}
          errors={errors}
          className="w-full"
        /> */}

        <TextareaInput
          label={"Category Description"}
          name={"description"}
          register={register}
          errors={errors}
        />
        <ToggleInput
          label="Publish your Category"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
        <ImageInput
          label="Category Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="categoryImageUploader"
        />
      </div>

      <SubmitButton
        isLoading={loading}
        title={categoryId ? "Update Category" : "Create Category"}
        loadingButtonTitle={
          categoryId ? "Updating Category..." : "Creating Category..."
        }
      />
    </form>
  );
};

export default NewCategoryForm;
