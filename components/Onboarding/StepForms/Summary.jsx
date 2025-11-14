"use client";

import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateUserUniqueCode } from "@/lib/generateUserCode";
import { setCurrentStep } from "@/redux/slices/onboardingSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Summary({ farmerId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const onboardingFormData = useSelector(
    (store) => store?.onboarding?.onboardingFormData
  );
  const currentStep = useSelector((store) => store?.onboarding?.currentStep);

  console.log(onboardingFormData);
  async function submit() {
    const { firstName, lastName } = onboardingFormData;
    const fullname = `${firstName} ${lastName}`;
    const data ={
      ...onboardingFormData,
    }
    const farmerUniqueCode = generateUserUniqueCode("MVS", fullname);
    data.farmerCode = farmerUniqueCode;
    // data.products = products;
    // data.isActive = isActive;
    data.userId = farmerId;

    console.log("farmerProfile>>>", onboardingFormData);
    // if (id) {
    //   makePutRequest(
    //     setLoading,
    //     `api/farmers/${id}`,
    //     data,
    //     "Farmer Profile",
    //     redirect
    //   );
    // } else {
      makePostRequest(
        setLoading,
        "api/farmers",
        data,
        "Farmer Profile",
        reset,
        redirect
      );
    // }

    // setImageUrl("");
  }

  async function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }

  return (
    <div className=" my-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-green-500">
        Order Summary
      </h2>
      <div className="flex">
        <h2>Here are your submitted data.</h2>
      </div>
      <div className=" flex items-center justify-between mt-4">
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-slate-800 dark:bg-green-600 dark:hover:bg-green-700 "
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>

        {loading ? (
          <button
            type="button"
            disabled
            className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-slate-800 dark:bg-green-600 dark:hover:bg-green-700 "
          >
            Processing please wait...
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-slate-800 dark:bg-green-600 dark:hover:bg-green-700 "
          >
            <span>Submit Data</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
