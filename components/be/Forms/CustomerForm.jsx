"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { generateUserUniqueCode } from "@/lib/generateUserCode";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";

import TextInput from "@/components/FormInput/TextInput";
import ImageInput from "@/components/FormInput/ImageInput";
import TextareaInput from "@/components/FormInput/TextArea";
import SubmitButton from "@/components/FormInput/SubmitButton";
import ToggleInput from "@/components/FormInput/ToggleInput";
import AddArrayItems from "@/components/FormInput/AddArrayItems";

const CustomerForm = ({ user, updateData = {} }) => {
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
    router.push("/login");
  }

  async function onSubmit(data) {
    const { name } = data;
    const CustomerUniqueCode = generateUserUniqueCode("MVS", name);
    data.CustomerCode = CustomerUniqueCode;
    data.profileImageUrl = imageUrl;
    data.products = products;
    data.isActive = isActive;
    data.userId = updateData.id || user.id;

    console.log("CustomerProfile>>>", data);
    if (id) {
      makePutRequest(
        setLoading,
        `api/Customers/${id}`,
        data,
        "Customer Profile",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/Customers",
        data,
        "Customer Profile",
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
      <h2 className="text-xl font-semibold mb-4 text-green-500">
        Personal Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 border-b-2 pb-10">
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
        <ImageInput
          label="Profile Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="customerProfileUploader"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4 text-green-500 mt-10">
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
      </div>

      <SubmitButton
        isLoading={loading}
        title={id ? "Update Customer" : "Create Customer"}
        loadingButtonTitle={
          id ? "Updating Customer..." : "Creating Customer..."
        }
      />
    </form>
  );
};

export default CustomerForm;
