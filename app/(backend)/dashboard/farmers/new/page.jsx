"use client";

import FormHeader from "@/components/be/FormHeader";
import NewFarmerForm from "@/components/be/NewFarmerForm";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateUserUniqueCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NewFarmer = ({ updateData = {} }) => {
  const [imageUrl, setImageUrl] = useState("");
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
    router.push("/dashboard/farmers");
  }
  async function onSubmit(data) {
    const {
      name,
      phone,
      email,
      contactPerson,
      contactPersonPhone,
      physicalAddress,
      paymentTerms,
      notes,
    } = data;
    const farmerUniqueCode = generateUserUniqueCode("MVS", name);
    data.farmerCode = farmerUniqueCode;
    data.profileImageUrl = imageUrl;

    console.log(data);
    if (id) {
      makePutRequest();
    } else {
      makePostRequest(
        setLoading,
        "api/farmers",
        data,
        "Farmer",
        reset,
        redirect
      );
    }
    setImageUrl("");
  }

  return (
    <div>
      <FormHeader title={"New Farmer"} />
      <NewFarmerForm />
    </div>
  );
};

export default NewFarmer;
