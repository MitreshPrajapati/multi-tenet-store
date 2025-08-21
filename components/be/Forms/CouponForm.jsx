"use client";

import SubmitButton from "@/components/FormInput/SubmitButton";
import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { convertIsoDateToNormal } from "@/lib/convertIsoDateToNormal";
import { generateCouponCode } from "@/lib/generateCouponCode";
import { generateISOFormatedDate } from "@/lib/generateISOFormatedDate";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CouponForm = ({ updatedData = {} }) => {
  const expiryDateNormal = convertIsoDateToNormal(updatedData.expiryDate);
  updatedData.expiryDate = expiryDateNormal;
  const id = updatedData?.id ?? "";
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
      ...updatedData,
    },
  });

  const isActive = watch("isActive");
  const router = useRouter();

  function redirect() {
    router.push("/dashboard/coupons");
  }

  async function onSubmit(data) {
    const slug = await generateSlug(data.title);
    data.slug = slug;

    const { title, expiryDate } = data;
    const isoFormatedDate = generateISOFormatedDate(expiryDate);
    const coupon = generateCouponCode(title, expiryDate);

    data.isActive = isActive;
    data.couponCode = coupon;
    data.expiryDate = isoFormatedDate;

    console.log(data);
    if (id) {
      makePutRequest(setLoading, `api/coupons/${id}`, data, "Coupon", redirect);
    } else {
      makePostRequest(
        setLoading,
        "api/coupons",
        data,
        "Coupon",
        reset,
        redirect
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-600 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Coupon Title"
          name="title"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Coupon Expiry Date"
          name="expiryDate"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Coupon Percent"
          name="percent"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ToggleInput
          label="Publish your Coupon"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        title={id ? "Update Coupon" : "Create Coupon"}
        loadingButtonTitle={id ? "Updating Coupon..." : "Creating Coupon..."}
      />
    </form>
  );
};

export default CouponForm;
