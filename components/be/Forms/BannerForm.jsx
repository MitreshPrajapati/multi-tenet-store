"use client";

import ImageInput from "@/components/FormInput/ImageInput";
import SubmitButton from "@/components/FormInput/SubmitButton";
import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const BannerForm = ({ updateData = {} }) => {
  const id = updateData?.id ?? "";
  const initialImageUrl = updateData?.imageUrl ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
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

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/banners");
  }

  async function onSubmit(data) {
    data.imageUrl = imageUrl;
    data.isActive = isActive;

    if (id) {
      makePutRequest(setLoading, `api/banners/${id}`, data, "Banner", redirect);
    } else {
      makePostRequest(
        setLoading,
        "api/banners",
        data,
        "Banner",
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
          label="Banner Title"
          name="title"
          register={register}
          errors={errors}
          //   className="w-full"
        />

        <TextInput
          label={"Banner Link"}
          name={"bannerLink"}
          type="url"
          register={register}
          errors={errors}
          //   className="w-full"
        />

        <ImageInput
          label="Banner Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="bannerImageUploader"
        />
        <ToggleInput
          label="Publish your Banner"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        title={id ? "Update Banner" : "Create Banner"}
        loadingButtonTitle={id ? "Updating Banner..." : "Creating Banner..."}
      />
    </form>
  );
};

export default BannerForm;
