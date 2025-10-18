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

const CustomerForm = ({ user }) => {
  console.log("Customer Form User", user);
  const initialImageUrl = user.profileImage ?? "";
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
      ...user,
    },
  });

  // const isActive = watch("isActive");
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/customers");
  }

  async function onSubmit(data) {
    data.userId = user.id;
    data.profileImage = imageUrl;

    console.log("CustomerProfile>>>", data);
    // if (id) {
    makePutRequest(
      setLoading,
      `api/customers/${id}`,
      data,
      "Customer Profile",
      redirect,
      reset
    );
    // }

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
          label="Full Name"
          name="name"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Username"
          name="username"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
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
        title={"Update Customer"}
        loadingButtonTitle={"Updating Customer..."}
      />
    </form>
  );
};

export default CustomerForm;
