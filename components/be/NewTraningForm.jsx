"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

import ImageInput from "@/components/FormInput/ImageInput";
import SelectInput from "@/components/FormInput/SelectInput";
import SubmitButton from "@/components/FormInput/SubmitButton";
import TextareaInput from "@/components/FormInput/TextArea";
import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";

import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";

const QuillEditor = dynamic(
  () => import("@/components/FormInput/QuillEditor"),
  { ssr: false }
);

const NewTraningForm = ({ updateData = {}, categories }) => {
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

  // Quill Editor
  const [content, setContent] = useState(updateData.content || "");

  const isActive = watch("isActive");
  // Redirect function
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/community");
  }

  async function onSubmit(data) {
    const slug = await generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.content = content;
    data.isActive = isActive;
    console.log(data);

    if (id) {
      makePutRequest(
        setLoading,
        `api/trainings/${id}`,
        data,
        "Training",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/trainings",
        data,
        "Training",
        reset,
        redirect
      );
    }

    setImageUrl("");
    setContent("");
  }

  return (
    <div>
      {/* <FormHeader title={"New Training"} /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-600 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Training Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Select Category"
            name="categoryId"
            options={categories}
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextareaInput
            label={"Training Description"}
            name={"description"}
            register={register}
            errors={errors}
          />

          {/* Quill Editor */}
          <QuillEditor
            label={"Training Content"}
            value={content}
            onChange={setContent}
            
            className="sm:col-span-2 text-gray-600 dark:text-white"
          />

          <ToggleInput
            label="Publish your Training"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
          <ImageInput
            label="Training Thumbnail"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="trainingImageUploader"
          />
        </div>

        <SubmitButton
          isLoading={loading}
          title={id ? "Update Training" : "Create Training"}
          loadingButtonTitle={
            id ? "Updating Training..." : "Creating Training..."
          }
        />
      </form>
    </div>
  );
};

export default NewTraningForm;
