"use client";

import React, { useState } from "react";
import TextInput from "../FormInput/TextInput";
import ImageInput from "../FormInput/ImageInput";
import TextareaInput from "../FormInput/TextArea";
import ToggleInput from "../FormInput/ToggleInput";
import SubmitButton from "../FormInput/SubmitButton";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AddArrayItems from "../FormInput/AddArrayItems";
import { generateUserUniqueCode } from "@/lib/generateUserCode";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";

const NewFarmerForm = ({ user, updateData = {} }) => {
  const id = updateData?.id ?? "";
  const initialImageUrl = updateData?.profileImageUrl ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...user,
      ...updateData,
    },
  });

  const isActive = watch("isActive");
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/farmers");
  }
  async function onSubmit(data) {
    const { name } = data;
    const farmerUniqueCode = generateUserUniqueCode("MVS", name);
    data.farmerCode = farmerUniqueCode;
    data.profileImageUrl = imageUrl;
    data.products = products;
    data.isActive = isActive;
    data.userId = updateData.id || user.id;

    console.log("farmerProfile>>>", data);
    if (id) {
      makePutRequest(
        setLoading,
        `api/farmers/${id}`,
        data,
        "Farmer Profile",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/farmers",
        data,
        "Farmer Profile",
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
          label="Farmer's Full Name"
          name="name"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Phone"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Email"
          name="email"
          type="email"
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
          label="Farmer's Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Contact Person Phone"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="What is the main crop"
          name="mainCrop"
          type="text"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Land Size"
          name="landSize"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
        <AddArrayItems
          items={products}
          setItems={setProducts}
          itemTitle={"Product"}
        />

        <ImageInput
          label="Farmer Profile Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="farmerProfileImageUploader"
        />
        <TextareaInput
          label="Farmer's Payment Terms"
          name="paymentTerms"
          register={register}
          errors={errors}
          isRequired={false}
        />

        <TextareaInput
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          isRequired={false}
        />
        <ToggleInput
          label="Farmer Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        title={id ? "Update Farmer":"Create Farmer"}
        loadingButtonTitle={id ? "Updating Farmer...":"Creating Farmer..."}
      />
    </form>
  );
};

export default NewFarmerForm;
