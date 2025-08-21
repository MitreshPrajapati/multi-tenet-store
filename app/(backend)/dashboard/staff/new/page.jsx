"use client";

import SubmitButton from "@/components/FormInput/SubmitButton";
import TextareaInput from "@/components/FormInput/TextArea";
import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";
import FormHeader from "@/components/be/FormHeader";
import { makePostRequest } from "@/lib/apiRequest";
import { generateUserUniqueCode } from "@/lib/generateUserCode";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NewStaff = () => {
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
  async function onSubmit(data) {
    const { name } = data;

    const StaffUniqueCode =  generateUserUniqueCode("MVSSM", name);
    data.staffCode = StaffUniqueCode;
    data.isActive = isActive;

    console.log(data);
    makePostRequest(setLoading, "api/staffs", data, "Staff", reset);
    setImageUrl("");

  }

  return (
    <div>
      <FormHeader title={"New Staff"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-600 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Staff Full Name"
            name="name"
            register={register}
            errors={errors}
            // className="w-full"
          />
          <TextInput
            label="NIN (ID)"
            name="nin"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Staff's Email"
            name="email"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Staff's Phone"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Staff's Physical Address"
            name="physicalAddress"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextareaInput
            label="Notes"
            name="notes"
            register={register}
            errors={errors}
            isRequired={false}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          title={"Create Staff"}
          loadingButtonTitle={"Creating Staff..."}
        />
      </form>
    </div>
  );
};

export default NewStaff;
